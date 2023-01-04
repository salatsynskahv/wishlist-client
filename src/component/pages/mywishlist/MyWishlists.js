import React, {useState} from "react";
import {useAuth} from "../../../contexts/AuthContext";
import {UsersWishlistProvider, useUsersWishlists} from "../../../contexts/UsersWishlistsContext";
import NewWishlist from "./NewWishlist";

import WishlistMenu from "./WishlistMenu";


export default function MyWishlists() {
    const {currentUser} = useAuth();
    return (
        <UsersWishlistProvider userEmail={currentUser.email}>
            <MyWishlistsInner/>
        </UsersWishlistProvider>
    );

}

function MyWishlistsInner() {
    const {wishlists, setWishlists} = useUsersWishlists();
    const [show, setShow] = useState(false)
    return (
        <>
            <div className="container my-wishlist-page d-block">
                <NewWishlist rows={wishlists} setRows={setWishlists} show={show} setShow={setShow}/>
            </div>
            <div className="container my-wishlist-menu">
                <WishlistMenu wishlists={wishlists} setWishlists={setWishlists} show={show} setShow={setShow}/>
            </div>

        </>

    )
}


