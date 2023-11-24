import {Button, Input} from "@rneui/themed";
import {useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View,} from "react-native";
import {useToast} from "react-native-toast-notifications";

import {useCreateUserMutation} from "../../store/api/usersApi";

export const AddUserForm = (props) => {
    const {navigation} = props;
    const lastNameRef = useRef(null);

    const {t} = useTranslation();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [createUser, {isLoading}] = useCreateUserMutation();
    const toast = useToast();

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

        createUser({
            user: {
                firstName,
                lastName,
            },
        })
            .then(() => {
                navigation.navigate("UsersList");
                toast.show(`Användaren ${firstName} ${lastName} har skapats!`, {
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
                    <Text>Create your user</Text>
                    <Input
                        returnKeyType="next"
                        onSubmitEditing={() => lastNameRef.current.focus()}
                        blurOnSubmit={false}
                        value={firstName}
                        disabled={isLoading}
                        onChangeText={(text) => setFirstName(text)}
                        placeholder="First name"
                    />
                    <Input
                        ref={lastNameRef}
                        value={lastName}
                        disabled={isLoading}
                        returnKeyType="send"
                        onSubmitEditing={() => handleSubmit()}
                        onChangeText={(text) => setLastName(text)}
                        placeholder="Last name"
                    />
                    <Button
                        title={t("createUser")}
                        disabled={isLoading}
                        loading={isLoading}
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
        // margin: 36,
        // marginTop: 84,
        // border: 1px solid black
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
