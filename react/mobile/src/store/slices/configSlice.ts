import {createSlice} from "@reduxjs/toolkit";
import * as Localization from "expo-localization";

const initialState = {
    locale: Localization.locale,
};

export const configSlice = createSlice({
    name: "config",
    initialState,
    reducers: {
        setLocale: (state, action) => {
            state.locale = action.payload;
        },
    },
});

export const {setLocale} = configSlice.actions;

export default configSlice.reducer;
