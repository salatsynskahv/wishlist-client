import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

export const addFriend = createAsyncThunk('friends/addFriend',
    async (updateItem) => {
        const result = await axios.patch(`${process.env.REACT_APP_SERVER_HOST}/user`, updateItem)
        return result.data;
    })

export const deleteFriend = createAsyncThunk('friends/deleteFriend',
    async (deleteItem) => {
        return (await axios.patch(`${process.env.REACT_APP_SERVER_HOST}/deleteFriend`, deleteItem)).data;
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

        }
    },

    extraReducers(builder) {
        // omit posts loading reducers
        builder
            .addCase(addFriend.fulfilled, (state, action) => {
                // We can directly add the new post object to our posts array
                state.friends.push(action.meta.arg.newFriend.email)
            })
            .addCase(deleteFriend.fulfilled, (state, action) => {
                console.log(action.meta.arg.deleteFriendEmail)
                state.friends = state.friends.filter(item => item !== action.meta.arg.deleteFriendEmail)
            })

    }
});

export const {initFriends} = friendsSlice.actions

export default friendsSlice.reducer