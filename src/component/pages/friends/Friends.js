import React, {useEffect, useRef, useState} from "react";
import SearchIcon from "../../icons/SearchIcon";

export default function Friends() {
    const [searchFriend, setSearchFriend] = useState('')
    const searchFriendRef = useRef()

    const handleSearchFriend = () => {
        const value = searchFriendRef.current.value
        console.log('value: '+ value)
    }

    console.log(searchFriend)
    return (
        <div className="m-3">
            <div className="container w-50">
                <div className="input-group ">
                    <input type="text" className="form-control" onKeyUp={handleSearchFriend} ref={searchFriendRef} placeholder="Search friend" />
                    <button className="btn btn-outline-secondary" type="button"><SearchIcon/></button>
                </div>
            </div>
            <div>
                <h3>My friends </h3>
            </div>
        </div>
    )
}