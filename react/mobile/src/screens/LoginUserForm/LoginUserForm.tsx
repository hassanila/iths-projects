import {Button, Text} from "@rneui/themed";
import {Keyboard, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Picker} from "@react-native-picker/picker";

import {logIn, logOut} from "../../store/slices/authSlice";
import {useGetUsersQuery} from "../../store/api/usersApi";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 24,
        backgroundColor: "white",
        borderRadius: 12,
        padding: 36,
        alignItems: "center"
    },
    infoContainer: {
        marginBottom: 24,
    },
    actionsContainer: {
        marginBottom: 24,
    },
    parentContainer: {
        flex: 1,
        backgroundColor: "white",
        // margin: 36,
        // marginTop: 84,
        // border: 1px solid black
        borderColor: "#eee",
        borderWidth: 1,
        borderRadius: 16,
    }
});


export const LoginUserForm = (props) => {
    const {route, navigation} = props;

    const {data, isLoading, refetch} = useGetUsersQuery({});
    const [selectedUserId, setSelectedUserId] = useState(null);

    const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);
    const dispatch = useDispatch();


    return loggedInAs ? (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text h4>{`Logged in as:`}</Text>
                <Text h4>{`${loggedInAs.firstName} ${loggedInAs.lastName}`}</Text>
            </View>
            <View style={styles.actionsContainer}>
                <Button
                    onPress={() => dispatch(logOut())}
                    title="Logga ut"
                    color="error"
                />
            </View>
        </View>
    ) : (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.parentContainer}>
                <View style={styles.container}>
                    <Text>Login (select user)</Text>
                    {isLoading ? (
                        <Text>Loading...</Text>
                    ) : (
                        <View style={{alignSelf: 'center', width: '50%'}}>
                            {data.length === 0 ? (
                                <Text>No users...</Text>
                            ) : (
                                <Picker
                                    selectedValue={selectedUserId}
                                    onValueChange={(itemValue) => {
                                        setSelectedUserId(itemValue);
                                    }}
                                >
                                    {data.map((user) => (
                                        <Picker.Item key={user.id} label={`${user.firstName} ${user.lastName}`}
                                                     value={user.id}/>
                                    ))}
                                </Picker>
                            )}

                            <Button
                                title="Logga in"
                                disabled={isLoading || data.length === 0}
                                loading={isLoading}
                                onPress={() => {
                                    const user = data.find((user) => user.id === selectedUserId);
                                    dispatch(logIn(user));
                                }}
                            />
                        </View>
                    )}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}