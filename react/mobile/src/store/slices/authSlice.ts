import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loggedInAs: undefined,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logIn: (state, action) => {
            state.loggedInAs = action.payload;
        },
        logOut: (state) => {
            state.loggedInAs = undefined;
        },
    },
});

export const {logIn, logOut} = authSlice.actions;

export default authSlice.reducer;
