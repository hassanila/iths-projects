import {Button, ListItem} from "@rneui/themed";
import {FlatList, RefreshControl, Text, View} from "react-native";

import {useDeletePostMutation, useGetPostsQuery} from "../../store/api/postsApi";
import {useSelector} from "react-redux";
import {useToast} from "react-native-toast-notifications";

const PostsList = ({navigation}) => {

    const toast = useToast();
    const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);

    const {data, isLoading, refetch} = useGetPostsQuery({});
    const [deletePost] = useDeletePostMutation()
    return (
        <View style={{flex: 1}}>
            {!isLoading &&
                <View style={{alignSelf: 'center', width: '50%'}}>
                    <Button
                        title={loggedInAs ? "Add Post" : "Login to add post"}
                        onPress={() => {
                            if (loggedInAs) {
                                navigation.navigate("AddPostForm")
                            } else {
                                navigation.navigate("LoginUserForm")
                            }
                        }}
                        style={{padding: 10}}
                    />
                </View>
            }
            {isLoading ? (
                <Text>Loading...</Text>
            ) : (
                data.filter((post) => !post.private || (loggedInAs && post.createdBy === loggedInAs.id)).length === 0 ? (
                    <Text style={{textAlign: 'center', marginTop: 20}}>No posts available...</Text>
                ) : (
                    <FlatList
                        data={data.filter((post) => !post.private || (loggedInAs && post.createdBy === loggedInAs.id))}
                        refreshControl={
                            <RefreshControl refreshing={isLoading} onRefresh={refetch}/>
                        }
                        renderItem={({item: post}) => (
                            <ListItem
                                key={post.id}
                                onPress={() => {
                                    navigation.navigate("PostInfo", {post});
                                }}
                            >
                                <ListItem.Content style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <ListItem.Title>{post.text}</ListItem.Title>
                                    <View style={{flexDirection: 'row', marginLeft: 'auto'}}>
                                        <Button
                                            color="orange"
                                            titleStyle={{color: 'black'}}
                                            onPress={() => {

                                                if (loggedInAs && post.createdBy === loggedInAs.id) {
                                                    navigation.navigate("EditPostForm", {post});
                                                } else {
                                                    toast.show("Only the creator can edit this post", {
                                                        type: "warning",
                                                        placement: "center",
                                                        duration: 4000
                                                    });
                                                }

                                            }}
                                            title="Edit"
                                        />
                                        <Button
                                            color="red"
                                            titleStyle={{color: 'white'}}
                                            onPress={() => {
                                                if (loggedInAs && post.createdBy === loggedInAs.id) {

                                                    deletePost(post.id)

                                                } else {
                                                    toast.show("Only the creator can delete this post", {
                                                        type: "warning",
                                                        placement: "center",
                                                        duration: 4000
                                                    });
                                                }
                                            }}
                                            title="X"
                                        />
                                    </View>
                                </ListItem.Content>
                            </ListItem>
                        )}
                    />
                )
            )}
        </View>
    );
};

export default PostsList;