import React from "react";
import {WishlistTable} from "../common/CustomTable";

const FriendsWishlist = ({wishlist}) => {
    const maxWidth = 350;
    const defaultWidth = 100;
    const columnWidth = [];
    wishlist.content.forEach(
        (row, i) => {
            console.log(i)
            wishlist.fields.forEach((key, j) => {
                let width = 30;
                const currentWidthValue = !columnWidth.at(j) ? 30 : columnWidth.at(j);
                console.log(currentWidthValue)
                const contentLength = Math.max(row[key].length * 10, currentWidthValue);
                width = contentLength < maxWidth ? contentLength : maxWidth;
                columnWidth[j] = width;

            })
        }
    )
    console.log(columnWidth)
    return (
        <div className="fwl-container">
            <div className="fwl-row">
                {
                    wishlist.fields.map((item, index) =>
                        <div className="fwl-item" style={{width: `${columnWidth[index]}px`}}>
                            {item}
                        </div>
                    )
                }
            </div>
            {
                wishlist.content.map(row => {
                    return (
                        <div className="fwl-row">
                            {
                                wishlist.fields.map(
                                    (key, index) =>
                                        <div key={index} className="fwl-column fwl-item" style={{width: `${columnWidth[index]}px`}}>
                                            {row[key]}
                                        </div>)
                            }
                        </div>)
                })
            }
        </div>
    )
}

export default FriendsWishlist;