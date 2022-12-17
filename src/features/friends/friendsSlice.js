import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {useAuth} from "../../contexts/AuthContext";

export const addFriend = createAsyncThunk('friends/addFriend',
    async (updateItem) => {
        const result = axios.patch(`${process.env.REACT_APP_SERVER_HOST}/user`, updateItem)
        return result.data;

    })


export const friendsSlice = createSlice({
    name: 'friends',
    initialState: {
        friends: []
    },
    reducers: {
        initFriends: (state, action) => {
            console.log(JSON.stringify(action))
            state.friends = action.payload.initValue

        },
        deleteFriend: (state) => {
            console.log("delete friend");
        }
    },

    extraReducers(builder) {
        // omit posts loading reducers
        builder.addCase(addFriend.fulfilled, (state, action) => {
            // We can directly add the new post object to our posts array
            state.friends.push(action.meta.arg.newFriend.email)
        })

    }
});

export const {initFriends, deleteFriend} = friendsSlice.actions

export default friendsSlice.reducer