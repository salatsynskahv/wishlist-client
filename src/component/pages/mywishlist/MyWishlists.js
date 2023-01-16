import React, {useEffect, useState} from "react";
import {useAuth} from "../../../contexts/AuthContext";
import store from "../../../app/store";

import WishlistMenu from "./WishlistMenu";
import {useSelector} from "react-redux";
import {initWishlists} from "../../../features/wishlists/wishlistsSlice";
import axios from "axios";
import NewWishlist from "./NewWishlist";


export default function MyWishlists() {
    const {currentUser} = useAuth();
    const wishlists = useSelector(state => state.wishlists.wishlists);
    const [showCreateNewWishlist, setShowCreateNewWishlist] = useState(false);

    useEffect(() => {
        console.log(wishlists)
        if (!wishlists) {
            axios.get(`${process.env.REACT_APP_SERVER_HOST}/wishlists/${currentUser.email}`,)
                .then((response) => {
                    console.log('response.data: ' + JSON.stringify(response.data))
                    store.dispatch(initWishlists({initValue: response.data}));
                });
        }
    }, [])

    return (
        <>
            <div className="container my-wishlist-page d-block">
                <NewWishlist show={showCreateNewWishlist} setShow={setShowCreateNewWishlist}/>
            </div>
            <div className="container my-wishlist-menu">
                {wishlists &&
                <WishlistMenu
                    wishlists={wishlists}
                    show={showCreateNewWishlist}
                    setShow={setShowCreateNewWishlist}
                />}
            </div>

        </>
    );

}


