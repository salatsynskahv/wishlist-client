import { createSlice } from "@reduxjs/toolkit";

export const wishlistsSlice = createSlice(
    {
        name: "wishlists",
        initialState: {
            wishlists: []
        },
        reducers: {
            initWishlists(state, action){
                state.wishlist = action.payload.initValue
            },

            updateWishlist(state, action) {
                state.wishlist = action.payload.newWishlist
            }
        }
    }
)

export const {initWishlists, updateWishlist} = wishlistsSlice.actions;

export default wishlistsSlice.reducer;