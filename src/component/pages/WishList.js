import {useParams} from "react-router-dom";
import React from "react";

const WishList = ({}) => {
    const {wishListId} = useParams()
    //let wishList = useFetch() - retrieve data
    return (<>
        <p>{wishListId}</p>
    </>)
}

export default WishList