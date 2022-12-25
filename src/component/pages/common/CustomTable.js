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
    const [editMode, setEditMode] = useState(false);
    const params = useParams();
    const wishListId = params.wishListId;
    let {wishlists} = useUsersWishlists();
    const {currentUser} = useAuth();
    console.log('currentUser.email: ' + currentUser.email);
    console.log('typeof wishListId' + typeof wishListId);

    console.log('currentWishlist: ' + JSON.stringify(wishListId))
    useEffect(() => {
        console.log('wishlists before: ' + JSON.stringify(wishlists))
        //todo: solve problem with context
        if (wishlists.length < 1) {
            wishlists = getWishlistFromServer().then(
                (repsonse) => {
                    wishlists = repsonse.data;
                    const findList = wishlists.find(item => item._id === wishListId)
                    setCurrentWishlist(findList)
                    console.log('useEffect: ' + findList)
                }
            )
        } else {
            const findList = wishlists.find(item => item._id === wishListId)
            setCurrentWishlist(findList)
            console.log('useEffect: ' + findList)
        }

    }, [location.pathname])

    const getWishlistFromServer = () => {
        return axios.get(`${process.env.REACT_APP_SERVER_HOST}/wishlists/${currentUser.email}`);
    }
    const handleInputTableChange = (index1, field, e) => {
        const row = currentWishlist.content[index1]
        row[field] = e.target.value
        setCurrentWishlist(currentWishlist)
        console.log('setTableData tableContent2' + JSON.stringify(currentWishlist))
        console.log('row' + JSON.stringify(row))
    }

    const handleSave = () => {
        const newItem = {
            _id: currentWishlist._id,
            fields: currentWishlist.fields,
            content: currentWishlist.content
        }
        console.log('handleSave tableContent2' + JSON.stringify(newItem))
        axios.put(`${process.env.REACT_APP_SERVER_HOST}/wishlist`, newItem)
            .then((response) => {
                console.log(response)
            }).catch(function (error) {
            console.log(error);
        });
    }

    const addTableRow = () => {
        const newRow = {};
        currentWishlist.fields.map(columnName => newRow[columnName] = '')
        console.log('newRow: ' + JSON.stringify(newRow))
        setCurrentWishlist({
            ...currentWishlist, content: [
                ...currentWishlist.content,
                newRow
            ]
        })
    }

    console.log('currentWishlist' + JSON.stringify(currentWishlist))
    return (
        currentWishlist && <>
            <div className="container">
                <div className="mb-4">
                    {currentWishlist.name}
                    <span className="float-end">
                        <button className="btn btn-primary" hidden={editMode}
                                onClick={() => setEditMode(true)}> Edit </button>
                        <button className="btn btn-primary" hidden={!editMode}
                                onClick={() => {
                                    setEditMode(false);
                                    handleSave();
                                }}> Save </button>
                    </span>
                </div>
                <div className="table-responsive w-100">
                    <WishlistTable wishlist={currentWishlist}
                                   setWishlist={setCurrentWishlist}
                                   editMode={editMode}
                                   setEditMode={setEditMode}
                                   handleInputTableChange={handleInputTableChange}
                    />
                </div>
            </div>
        </>
    )

}