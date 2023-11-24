import {Button, CheckBox, ListItem} from "@rneui/themed";
import {FlatList, RefreshControl, StyleSheet, Text, View} from "react-native";
import {useDeleteUserMutation, useGetUsersQuery} from "../../store/api/usersApi";
import {useDeletePostMutation, useGetPostsQuery} from "../../store/api/postsApi";
import {useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../../store/slices/authSlice";

const UsersList = ({navigation}) => {
    const {data: users, isLoading, refetch} = useGetUsersQuery({});
    const [deleteUser] = useDeleteUserMutation()

    const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);

    const dispatch = useDispatch();

    const {data: posts, refetch: refetchPosts} = useGetPostsQuery({});
    const [deletePost] = useDeletePostMutation();

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isMultiSelectMode, setMultiSelectMode] = useState(false);

    const sortedUsers = useMemo(() => {
        if (!users) {
            return [];
        }
        return [...users].sort((a, b) => a.firstName.localeCompare(b.firstName));
    }, [users]);

    const handleLongPress = (user) => {
        setMultiSelectMode(true);
        setSelectedUsers([user.id]);
    };

    const handlePress = (user) => {
        if (isMultiSelectMode) {
            setSelectedUsers(prev => {
                const newSelectedUsers = prev.includes(user.id) ? prev.filter(id => id !== user.id) : [...prev, user.id];
                if (newSelectedUsers.length === 0) {
                    setMultiSelectMode(false);
                }
                return newSelectedUsers;
            });
        } else {
            navigation.navigate("UserInfo", {user});
        }
    };

    const handleBulkDelete = () => {
        selectedUsers.forEach(id => {

            deleteUser(id).then(() => {

                // logout if deleting self
                if (loggedInAs && id === loggedInAs.id) {
                    dispatch(logOut());
                }
                refetchPosts().then(() => {

                    posts.forEach((post) => {
                        if (post.createdBy === id) {
                            deletePost(post.id);
                        }
                    });
                });
            });
        });
        setSelectedUsers([]);
        setMultiSelectMode(false);
    };

    return (
        <View style={styles.container}>
            {!isLoading &&
                <View style={{alignSelf: 'center', width: '50%'}}>
                    <Button title="Add User" onPress={() => {
                        navigation.navigate("AddUserForm")
                    }} style={{padding: 10}}/>
                </View>
            }

            {isMultiSelectMode ? (
                <Button
                    color="red"
                    titleStyle={styles.buttonTitle}
                    title="Bulk Delete"
                    onPress={handleBulkDelete}
                />
            ) : (
                sortedUsers.length > 0 && <View style={styles.instructionsContainer}>
                    <Text style={styles.instructionsText}>Single press for user info</Text>
                    <Text style={styles.instructionsText}>Long press for bulk delete</Text>
                </View>
            )}
            {isLoading ? (
                <Text>Loading...</Text>
            ) : (
                sortedUsers.length > 0 ? (<FlatList
                    data={sortedUsers}
                    refreshControl={
                        <RefreshControl refreshing={isLoading} onRefresh={refetch}/>
                    }
                    renderItem={({item: user}) => (
                        <ListItem
                            key={user.id}
                            onLongPress={() => handleLongPress(user)}
                            onPress={() => handlePress(user)}
                        >
                            <ListItem.Content style={{flexDirection: 'row', alignItems: 'center'}}>
                                {isMultiSelectMode && <CheckBox checked={selectedUsers.includes(user.id)}/>}
                                <ListItem.Title>{`${user.firstName} ${user.lastName}`}</ListItem.Title>
                                <View style={{flexDirection: 'row', marginLeft: 'auto'}}>
                                    <Button
                                        color="orange"
                                        titleStyle={{color: 'black'}}
                                        onPress={() => {
                                            navigation.navigate("EditUserForm", {user});
                                        }}
                                        title="Edit"
                                    />
                                    <Button
                                        color="red"
                                        titleStyle={{color: 'white'}}
                                        onPress={() => {

                                            deleteUser(user.id).then(() => {

                                                // logout if deleting self
                                                if (loggedInAs && user.id === loggedInAs.id) {
                                                    dispatch(logOut());
                                                }

                                                refetchPosts().then(() => {

                                                    posts.forEach((post) => {
                                                        if (post.createdBy === user.id) {
                                                            deletePost(post.id);
                                                        }
                                                    });
                                                });

                                            })
                                        }}
                                        title="X"
                                    />
                                </View>
                            </ListItem.Content>
                        </ListItem>
                    )}
                />) : (
                    <Text style={{textAlign: 'center', marginTop: 20}}>No users available...</Text>
                )
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    instructionsContainer: {
        alignItems: 'center',
    },
    instructionsText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 10,
    },
    buttonTitle: {
        color: 'white',
    },
});

export default UsersList;