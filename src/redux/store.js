import { configureStore } from "@reduxjs/toolkit";
import friendsReducer from './redux-features/friends/friendsSlice'
import wishlistsSlice from "./redux-features/wishlists/wishlistsSlice";
import userReducer from './redux-features/user/userSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        friends: friendsReducer,
        wishlists: wishlistsSlice
    }
})