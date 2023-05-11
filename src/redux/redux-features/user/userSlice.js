import {createSlice} from "@reduxjs/toolkit";

const userKey = 'currentUser';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: JSON.parse(localStorage.getItem('currentUser')),
        error: null,
        isLoading: false
    },
    reducers: {
        login: (state, action) => {
            localStorage.setItem(userKey, JSON.stringify(action.payload))
            state.user = action.payload;
        },
        logout: (state, action) => {
            localStorage.removeItem(userKey);
            state.user = null;
        }
    }
});

export const {login, logout} = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;