import React, {useEffect, useRef} from "react";
import SearchIcon from "../../../icons/SearchIcon";
import axios from "axios";

export default function Friends() {
    const searchFriendRef = useRef()

    const handleSearchFriend = () => {
        const value = searchFriendRef.current.value
        console.log('value: '+ value)
        axios.get(`http://localhost:3001/friends/?email=${value}`)
            .then((result) => {
                console.log(result)
            })
    }

    return (
        <div className="m-3">
            <div className="container w-50">
                <div className="input-group ">
                    <input type="text"
                           className="form-control"
                           ref={searchFriendRef}
                           placeholder="Search friend" />
                    <button className="btn btn-outline-secondary" onClick={handleSearchFriend} type="button"><SearchIcon/></button>
                </div>
            </div>
            <div>
                <h3>My friends </h3>
            </div>
        </div>
    )
}