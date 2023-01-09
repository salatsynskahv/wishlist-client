import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {useUsersWishlists} from "../../../contexts/UsersWishlistsContext";

import axios from "axios"
import {useLocation} from "react-router-dom"
import './MyWishlits.css'
import WishlistTable from "./WishlistTable"
import {useAuth} from "../../../contexts/AuthContext";

export default function CustomTable() {
    const location = useLocation();
    const [currentWishlist, setCurrentWishlist] = useState(undefined)
    const [visibilityDotsMatrix, setVisibilityDotsMatrix] = useState();
    const params = useParams();
    const wishListId = params.wishListId;
    let {wishlists} = useUsersWishlists();
    const {currentUser} = useAuth();
    // console.log('currentUser.email: ' + currentUser.email);
    // console.log('typeof wishListId' + typeof wishListId);

    const initVisibilityMatrix = (currentWishlist) => {
        console.log("Wishlist TABLE !!!! on mount")
        if (!currentWishlist) return;
        const newMatrix = []
        currentWishlist.content.forEach(
            (item, index1) => {
                // console.log(Object.keys(item))
                newMatrix[index1] = []
                item && Object.keys(item).forEach(
                    (key, index2) => {
                        newMatrix[index1][index2] = true;
                    }
                )
            }
        )

        setVisibilityDotsMatrix(newMatrix);
        // console.log("visibilityMatrix: " + newMatrix)
    }

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
            initVisibilityMatrix(findList)
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
                    visibilityDotsMatrix={visibilityDotsMatrix}
                    setVisibilityDotsMatrix={setVisibilityDotsMatrix}
                />
            </div>
        </>
    )

}