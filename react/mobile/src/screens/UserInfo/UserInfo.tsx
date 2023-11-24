import {Text} from "@rneui/themed";
import {StyleSheet, View} from "react-native";

export const UserInfo = ({route, navigation}) => {
    const user = route?.params?.user;

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text h4>{`First Name: ${user.firstName}`}</Text>
                <Text h4>{`Last Name: ${user.lastName}`}</Text>
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
