import {Button, Text} from "@rneui/themed";
import {useTranslation} from "react-i18next";
import {StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import i18n from "../../../i18n";
import {setLocale} from "../../store/slices/configSlice";

export const Settings = () => {
    const locale = useSelector((state: any) => state.config.locale);
    const dispatch = useDispatch();

    const {t} = useTranslation();

    const changeLocale = () => {
        const newLocale = locale === "sv" ? "en" : "sv";
        i18n.changeLanguage(newLocale);
        dispatch(setLocale(newLocale));
    };

    return (
        <View style={styles.container}>
            <View style={{marginTop: 24}}>
                <View style={styles.infoContainer}>
                    <Text h4>{t("currentLanguage", {lang: locale})}</Text>
                </View>
                <Button
                    color="secondary"
                    onPress={changeLocale}
                    title={t("chooseLang")}
                />
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
    },
    actionsContainer: {
        marginBottom: 24,
    },
});
