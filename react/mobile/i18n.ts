import * as Localization from "expo-localization";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import {resources} from "./translations";

export const initializeI18n = (locale: string) => {
    i18n.use(initReactI18next).init({
        compatibilityJSON: "v3",
        resources,
        lng: locale || Localization.locale,
        fallbackLng: "en",
    });
};

export default i18n;
