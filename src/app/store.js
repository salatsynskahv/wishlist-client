import { configureStore } from "@reduxjs/toolkit";
import friendsReducer from '../features/friends/friendsSlice'
import wishlistsSlice from "../features/wishlists/wishlistsSlice";

export default configureStore({
    reducer: {
        friends: friendsReducer,
        wishlists: wishlistsSlice
    }
})