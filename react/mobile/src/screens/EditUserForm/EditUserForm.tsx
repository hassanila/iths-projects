import {Button, Input} from "@rneui/themed";
import {useRef, useState} from "react";
import {Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View,} from "react-native";
import {useToast} from "react-native-toast-notifications";

import {useUpdateUserMutation} from "../../store/api/usersApi";
import {useDispatch, useSelector} from "react-redux";
import {logIn} from "../../store/slices/authSlice";

export const EditUserForm = (props) => {
    const {route, navigation} = props;
    const lastNameRef = useRef(null);

    const [firstName, setFirstName] = useState(route?.params?.user?.firstName || '')
    const [lastName, setLastName] = useState(route?.params?.user?.lastName || '')
    const [updateUser] = useUpdateUserMutation();
    const toast = useToast();
    const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);
    const dispatch = useDispatch();

    const oldFirstName = route?.params?.user?.firstName || '';
    const oldLastName = route?.params?.user?.lastName || '';

    const handleSubmit = () => {
        console.log("firstName: ", firstName);
        console.log("lastName: ", lastName);

        if (firstName === "" || lastName === "") {
            // show toast, must fill all inputs
            console.log("Invalid form!");
            toast.show("Please fill out all inputs", {
                type: "warning",
                placement: "top",
                duration: 4000,
                animationType: "slide-in",
            });
            return;
        }

        updateUser({user: {id: route.params.user.id, firstName: firstName, lastName: lastName}})
            .then(() => {

                if (loggedInAs.id === route.params.user.id) {
                    dispatch(logIn({id: route.params.user.id, firstName: firstName, lastName: lastName}));
                }

                navigation.navigate("UsersList");
                toast.show(`User: ${oldFirstName} ${oldLastName} har ändrats!`, {
                    type: "success",
                    placement: "top",
                    duration: 4000,
                    animationType: "slide-in",
                });
                setFirstName("");
                setLastName("");
            })
            .catch((error) => {
                toast.show(error, {type: "danger"});
            });
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.parentContainer}>
                <View style={styles.container}>
                    <Text>Edit user: {oldFirstName} {oldLastName}</Text>
                    <Input
                        returnKeyType="next"
                        onSubmitEditing={() => lastNameRef.current.focus()}
                        blurOnSubmit={false}
                        value={firstName}
                        onChangeText={(text) => setFirstName(text)}
                        placeholder="First name"
                    />
                    <Input
                        ref={lastNameRef}
                        value={lastName}
                        returnKeyType="send"
                        onSubmitEditing={() => handleSubmit()}
                        onChangeText={(text) => setLastName(text)}
                        placeholder="Last name"
                    />
                    <Button
                        title="Save"
                        onPress={() => handleSubmit()}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        backgroundColor: "white",
        margin: 15,
        borderColor: "#eee",
        borderWidth: 1,
        borderRadius: 16,
    },
    container: {
        flex: 1,
        padding: 16,
        alignItems: "center",
    },
});
