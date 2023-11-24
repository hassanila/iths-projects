import {Button, Input} from "@rneui/themed";
import {useState} from "react";
import {Keyboard, StyleSheet, Switch, Text, TouchableWithoutFeedback, View,} from "react-native";
import {useToast} from "react-native-toast-notifications";

import {useCreatePostMutation} from "../../store/api/postsApi";
import {useSelector} from "react-redux";

export const AddPostForm = (props) => {
    const {navigation} = props;

    const [postText, setPostText] = useState('')
    const [privatePost, setPrivatePost] = useState(false)
    const [createPost, {isLoading}] = useCreatePostMutation();
    const toast = useToast();

    const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);

    const handleSubmit = () => {

        if (postText === "") {
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

        createPost({
            post: {
                text: postText,
                createdBy: loggedInAs.id,
                createdDate: new Date().toLocaleDateString(),
                private: privatePost
            }
        })
            .then(() => {
                navigation.navigate("PostsList");
                toast.show(`Post has been created!`, {
                    type: "success",
                    placement: "top",
                    duration: 4000,
                    animationType: "slide-in",
                });
                setPostText("");
            })
            .catch((error) => {
                toast.show(error, {type: "danger"});
            });
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.parentContainer}>
                <View style={styles.container}>
                    <Text>Create a post</Text>
                    <Input
                        blurOnSubmit={false}
                        value={postText}
                        disabled={isLoading}
                        onChangeText={(text) => setPostText(text)}
                        placeholder="Text..."
                    />
                    <View style={styles.switchContainer}>
                        <Text>Private (only visible to you)</Text>
                        <Switch
                            trackColor={{false: "#767577", true: "#81b0ff"}}
                            thumbColor={privatePost ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={setPrivatePost}
                            value={privatePost}
                        />
                    </View>
                    <Button
                        title="Create post"
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
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        marginVertical: 10,
    }
});
