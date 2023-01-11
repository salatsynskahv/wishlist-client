import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {useUsersWishlists} from "../../../contexts/UsersWishlistsContext";
import axios from "axios"
import {useLocation} from "react-router-dom"
import WishlistTable from "./WishlistTable"
import {useAuth} from "../../../contexts/AuthContext";
import {useSelector} from "react-redux";

export default function CustomTable() {
    const location = useLocation();
    const [currentWishlist, setCurrentWishlist] = useState(undefined)
    const params =  useParams();
    const wishListId = params.wishListId;
    let wishlists = useSelector(state => state.wishlists.wishlists);
    const {currentUser} = useAuth();
    // console.log('currentUser.email: ' + currentUser.email);
    // console.log('typeof wishListId' + typeof wishListId);

    // console.log('currentWishlist: ' + JSON.stringify(wishListId))
    useEffect(() => {
        // console.log('wishlists before: ' + JSON.stringify(wishlists))
        //todo: solve problem with context
        if (wishlists.length < 1) {
            wishlists = getWishlistFromServer().then(
                (repsonse) => {
                    wishlists = repsonse.data;
                    const findList = wishlists.find(item => item._id === wishListId)
                    setCurrentWishlist(findList)
                    // console.log('useEffect: ' + findList)
                    initVisibilityMatrix(findList)
                }
            )
        } else {
            const findList = wishlists.find(item => item._id === wishListId)
            setCurrentWishlist(findList)
            // console.log('useEffect: ' + findList)
        }

    }, [location.pathname])

    const getWishlistFromServer = () => {
        return axios.get(`${process.env.REACT_APP_SERVER_HOST}/wishlists/${currentUser.email}`);
    }





    // console.log('currentWishlist' + JSON.stringify(currentWishlist))
    return (
        currentWishlist && <>
            <div className="container">
                <div className="mb-4">
                    <h3 className="align-items-center fw-bold"> {currentWishlist.name} </h3>
                </div>
                <WishlistTable
                    wishlist={currentWishlist}
                    setWishlist={setCurrentWishlist}
                />
            </div>
        </>
    )

}