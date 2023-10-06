import React, {useEffect, useState} from "react";
import store from "../../../redux/store";

import WishlistMenu from "./WishlistMenu";
import {useSelector} from "react-redux";
import {initWishlists} from "../../../redux/redux-features/wishlists/wishlistsSlice";
import axios from "axios";
import {selectUser} from "../../../redux/redux-features/user/userSlice";
import {useLocation, useParams} from "react-router-dom";


export default function MyWishlists() {
    const currentUser = useSelector(selectUser);
    const location = useLocation();

    console.log(location.pathname);

    const wishlists = useSelector(state => state.wishlists.wishlists);
    const [loading, setLoading] = useState(false);

    const reDigits = /(\d)+/;
    const {wishListId} = useParams();

    useEffect(() => {
        console.log(wishlists)
        console.log(currentUser)
        //TODO: AFTER FIX remove currentUser FROM Condition
        if (!currentUser && reDigits.test(location.pathname)) {
            axios.get(`${process.env.REACT_APP_SERVER_HOST}/wishlist/${wishListId}`)
                .then(
                    (response) => {
                        console.log(response.data);
                        store.dispatch(initWishlists({initValue: response.data}));
                        setLoading(false);
                    }
                    )
        }

        if (!wishlists && currentUser) {
            setLoading(true);
            console.log('if (!wishlists && currentUser) - passed!!!!')
            axios.get(`${process.env.REACT_APP_SERVER_HOST}/wishlists/${currentUser.email}`,)
                .then((response) => {
                    store.dispatch(initWishlists({initValue: response.data}));
                    setLoading(false);
                });
        }
    }, [])

    return (
        <>
            {
                loading ?
                    <div className="loader-container">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    :
                    <>
                        {
                            !currentUser &&
                            <div className="login-notification">
                                Please, <a href="/login">login</a> for creating personal wishlists
                            </div>
                        }

                        <div className="container my-wishlist-menu">
                            {
                                wishlists &&
                                <WishlistMenu wishlists={wishlists}/>}
                        </div>
                    </>
            }
        </>
    );

}


