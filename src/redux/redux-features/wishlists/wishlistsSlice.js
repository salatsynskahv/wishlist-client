import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export const createWishlist =
    createAsyncThunk('wishlists/createWishlist',
        async (payload) => {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_HOST}/wishlist`, payload.newList);
            return response.data;
        });


export const updateWishlist = createAsyncThunk('wishlists/updateWishlist',
    async (payload) => {
        const response = await axios.put(`${process.env.REACT_APP_SERVER_HOST}/wishlist`, payload.newWishlist);
        return response.data;
    });

export const deleteWishlist = createAsyncThunk('wishlists/deleteWishlist',
    async (payload) => {
        console.log(JSON.stringify(payload));
        const headers = {
            "Content-Type": "application/json"
        };

        const response = axios.delete(`${process.env.REACT_APP_SERVER_HOST}/wishlist/${payload._id}`, headers);
        console.log(response);
        return response.data;
    });


export const wishlistsSlice = createSlice(
    {
        name: "wishlists",
        initialState: {
            wishlists: undefined,
            status: 'idle',
            error: null
        },

        reducers: {
            initWishlists(state, action) {
                state.wishlists = action.payload.initValue
            },

            updateValueInCurrentWishlist(state, action) {
                console.log('updateValueInCurrentWishlist action.payload : ' + JSON.stringify(action.payload));
                const indexOfWishlist = action.payload.currentWishlistIndex;
                const newValue = action.payload.newValue;
                const rowIndex = action.payload.index;
                const fieldId = action.payload.field.id;
                state.wishlists[indexOfWishlist].content[rowIndex][fieldId] = newValue;
            },

            updateFieldNameInCurrentWishlist(state, action) {
                const indexOfWishlist = action.payload.currentWishlistIndex;
                const newValue = action.payload.newValue;
                const columnIndex = action.payload.columnIndex;
                console.log('columnIndex: ' + columnIndex);
                state.wishlists[indexOfWishlist].fields[columnIndex] = newValue;
            },

            addRowBelowInCurrentWishlist(state, action) {
                const wishlist = state.wishlists[action.payload.currentWishlistIndex];
                const newRow = {};
                wishlist.fields.forEach(field => newRow[field.id] = '');
                state.wishlists[action.payload.currentWishlistIndex]
                    .content.splice(action.payload.rowIndex + 1, 0, newRow)
            },

            deleteRowInCurrentWishlist(state, action) {
                const result = state.wishlists[action.payload.currentWishlistIndex]
                    .content.splice(action.payload.rowIndex, 1);
                console.log("row deleted" + result)
            },
            addColumnAfterInCurrentWishlist(state, action) {
                const {currentWishlistIndex, columnIndex, columnName} = action.payload;
                state.wishlists[currentWishlistIndex].fields.splice(columnIndex + 1, 0, columnName);
            },

            deleteColumnInCurrentWishlist(state, action) {
                const { currentWishlistIndex, columnIndex} = action.payload;
                state.wishlists[currentWishlistIndex].fields.splice(columnIndex, 1);
            }

        },
        extraReducers: (builder) => {
            builder.addCase(deleteWishlist.fulfilled, (state, action) => {
                console.log('deleteWishlist.fulfilled :' + JSON.stringify(action))
                state.wishlists = state.wishlists.filter(item => item._id !== action.meta.arg._id);
            })
            // .addCase(updateWishlist.fulfilled, (state, action) => {
            //     console.log('action :' + JSON.stringify(action));
            //     // state.wishlists[action.payload.meta.arg.currentWishlistIndex] = action.payload.meta.arg.newWishlist;
            // })
            //
            .addCase(createWishlist.fulfilled, (state, action) => {
                console.log('createWishlist.fulfilled!!!!!!!!!!!!!!!!!!!!!!!!!!')
                state.wishlists.push(action.meta.arg.newList);
            })
        }
    }
)

export const {
    initWishlists,
    updateValueInCurrentWishlist,
    addRowBelowInCurrentWishlist,
    deleteRowInCurrentWishlist,
    addColumnAfterInCurrentWishlist,
    deleteColumnInCurrentWishlist,
    updateFieldNameInCurrentWishlist
} = wishlistsSlice.actions;

export default wishlistsSlice.reducer;

export const selectAllWishlist = state => state.wishlists;