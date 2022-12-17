import React from "react";
import WishlistTable from "../common/WishlistTable";

const FriendsList = ({wishlist}) => {
    return (
        <div>
            <WishlistTable wishlist={wishlist}/>
        </div>)
}

export default FriendsList;