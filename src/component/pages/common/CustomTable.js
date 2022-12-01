import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {useUsersWishlists} from "../../../contexts/UsersWishlistsContext";
import Linkify from 'react-linkify'
import axios from "axios";
import {useLocation} from "react-router-dom";
import './MyWishlits.css'

export default function CustomTable() {
    const location = useLocation();
    const [currentWishlist, setCurrentWishlist] = useState()
    const [editMode, setEditMode] = useState(false);
    const params = useParams();
    const wishListId = params.wishListId;
    const {wishlists} = useUsersWishlists();
    console.log('typeof wishListId' + typeof wishListId);

    console.log('currentWishlist' + JSON.stringify(wishlists))
    // const foundItem = wishlists.find(item => {
    //     console.log('typeof item._id in find: ' + typeof item._id);
    //     return item._id === wishListId
    // })
    useEffect(() => {
        const findList = wishlists.find(item => item._id === wishListId)
        setCurrentWishlist(findList)
        console.log('useEffect: ' + findList)
    }, [location.pathname])
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
                    <table className="table table-bordered wishlist-table">
                        <thead>
                        <tr>{
                            currentWishlist.fields.map((field, index) =>
                                (<td key={index}>
                                    {field}
                                </td>)
                            )
                        }
                        </tr>
                        </thead>
                        {currentWishlist.content && <tbody className="table-group-divider">
                        {
                            currentWishlist.content.map((item, index1) =>
                                (<tr key={index1}>
                                        {currentWishlist.fields.map((field, index2) =>
                                            (<td key={index2}>
                                                <Linkify component='input'>
                                                    {editMode &&
                                                    <textarea
                                                        className="form-control"
                                                        onChange={(e) => handleInputTableChange(index1, field, e)}
                                                        defaultValue={item[field]}/>}
                                                    {!editMode && <span onClick={() => {
                                                        console.log(index1 + ' ' + index2 + 'clicked')
                                                    }}
                                                                        onMouseLeave={() => {
                                                                            console.log(index1 + ' ' + index2 + 'mouseLeft')
                                                                        }}>
                                                        {item[field]}
                                                    </span>}
                                                </Linkify>
                                            </td>)
                                        )}
                                    </tr>
                                )
                            )
                        }
                        </tbody>}
                    </table>
                </div>
            </div>
        </>
    )

}