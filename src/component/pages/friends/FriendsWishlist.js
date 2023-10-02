import React from "react";
import {WishlistTable} from "../mywishlist/common/CustomTable";
import Editable from "../mywishlist/common/Editable";

const FriendsWishlist = ({wishlist}) => {
    return (
        <table>
            <thead>
            {
                wishlist.fields.map((field, index) =>
                    <th key={field.id}>
                        {field.name}
                    </th>
                )
            }
            </thead>
            <tbody>
            {
                wishlist.content.map(row => {
                    return (
                        <tr>
                            {
                                wishlist.fields.map(
                                    (fileld, index) =>
                                        <td key={index} >
                                            {row[fileld.id]}
                                        </td>)
                            }
                        </tr>)
                })
            }
            </tbody>
        </table>
    )
}

export default FriendsWishlist;