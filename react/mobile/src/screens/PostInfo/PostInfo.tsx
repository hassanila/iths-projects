import {StyleSheet, View} from "react-native";
import {Text} from "@rneui/themed";

export const PostInfo = ({route, navigation}) => {
    const post = route?.params?.post;

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text h4>{`Text: ${post.text}`}</Text>
                <Text h4>{`Created By: ${post.createdBy}`}</Text>
                <Text h4>{`Date: ${post.createdDate}`}</Text>
                <Text h4>{`Private: ${post.private}`}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 24,
        backgroundColor: "white",
        borderRadius: 12,
        padding: 36,
    },
    infoContainer: {
        marginBottom: 24,
    }
});