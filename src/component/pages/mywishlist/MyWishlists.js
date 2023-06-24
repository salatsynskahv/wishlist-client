import React, {useEffect, useState} from "react";
import store from "../../../redux/store";
import {v4 as uuidv4} from 'uuid';

import WishlistMenu from "./WishlistMenu";
import {useSelector} from "react-redux";
import {initWishlists} from "../../../redux/redux-features/wishlists/wishlistsSlice";
import axios from "axios";
import NewWishlist from "./NewWishlist";
import {selectUser} from "../../../redux/redux-features/user/userSlice";


export default function MyWishlists() {
    const currentUser = useSelector(selectUser);
    const wishlists = useSelector(state => state.wishlists.wishlists);
    const [showCreateNewWishlist, setShowCreateNewWishlist] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(wishlists)
        console.log(currentUser)
        //TODO: AFTER FIX remove currentUser FROM Condition
        if (!wishlists && currentUser) {
            setLoading(true);
            console.log('if (!wishlists && currentUser) - passed!!!!')
            axios.get(`${process.env.REACT_APP_SERVER_HOST}/wishlists/${currentUser.email}`,)
                .then((response) => {
                    store.dispatch(initWishlists({initValue: response.data}));
                    setLoading(false);
                });
        }
        //TODO: TEMPORARY

        if (wishlists) {
            for (let i = 0; i < wishlists.length; i++) {
                const wl = wishlists[i];
                if (typeof wl.fields[0] === "string") {
                    const newFields = wl.fields.map(field => {
                        return {
                            id: generateFieldID(field),
                            name: field
                        }
                    });
                    const newWL = {...wl, fields: newFields}
                    console.log('new WL ' + JSON.stringify(newWL));
                }
            }

            function generateFieldID(field) {
                const result = uuidv4().substr(0, 16);
                console.log('result uuidv4' + result);
                return result;
            }
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
                        <NewWishlist show={showCreateNewWishlist} setShow={setShowCreateNewWishlist}/>
                        <div className="container my-wishlist-menu">
                            {wishlists &&
                            <WishlistMenu
                                wishlists={wishlists}
                                show={showCreateNewWishlist}
                                setShow={setShowCreateNewWishlist}
                            />}
                        </div>
                    </>
            }
        </>
    );

}


