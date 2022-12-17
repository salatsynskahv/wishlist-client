import React, {useEffect, useState} from "react";
import Linkify from "react-linkify";
import axios from "axios";

const WishlistTable = ({wishlist, setWishlist, editMode = false, setEditMode, handleInputTableChange}) => {

    useEffect(() => {
        return () => {
            if (!wishlist) return;
            
            const newItem = {
                _id: wishlist._id,
                fields: wishlist.fields,
                content: wishlist.content
            }
            // console.log('handleSave tableContent2' + JSON.stringify(newItem))
            axios.put(`${process.env.REACT_APP_SERVER_HOST}/wishlist`, newItem)
                .then((response) => {
                    console.log(response)
                }).catch(function (error) {
                console.log(error);
            });
        }
    }, [])

    if (!wishlist) {
        return <div>Select table first</div>
    }

    const addTableRow = () => {
        const newRow = {};
        setEditMode(true)
        wishlist.fields.map(columnName => newRow[columnName] = '')
        setWishlist({
            ...wishlist,
            content: [
                ...wishlist.content,
                newRow
            ]
        });
    }

    return (
        <>
            <table className="table table-bordered wishlist-table">
                <thead>
                <tr>
                    {
                        wishlist.fields.map((field, index) =>
                            (
                                <td key={index}>
                                    {field}
                                    {index === (wishlist.fields.length - 1) &&
                                    <button>+</button>}
                                </td>
                            )
                        )
                    }
                </tr>
                </thead>
                {
                    wishlist.content && <tbody className="table-group-divider">
                    {
                        wishlist.content.map((item, index1) =>
                            (
                                <tr key={index1}>
                                    {wishlist.fields.map((field, index2) =>
                                        (
                                            <td key={index2}>
                                                <Linkify component='input'>
                                                    {
                                                        editMode &&
                                                        <textarea
                                                            className="form-control"
                                                            onChange={(e) => handleInputTableChange(index1, field, e)}
                                                            defaultValue={item[field]}/>}
                                                    {
                                                        !editMode &&
                                                        <span>
                                                                {item[field]}
                                                            </span>
                                                    }
                                                </Linkify>
                                            </td>
                                        )
                                    )
                                    }
                                </tr>
                            )
                        )
                    }
                    </tbody>
                }

            </table>
            <button className="btn btn-primary" onClick={addTableRow}>Add row</button>
        </>
    )
}

export default WishlistTable;