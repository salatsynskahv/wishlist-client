import { configureStore } from "@reduxjs/toolkit";
import friendsReducer from '../features/friends/friendsSlice'

export default configureStore({
    reducer: {
        friends: friendsReducer
    }
})