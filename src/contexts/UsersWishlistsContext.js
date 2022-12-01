import React, {useContext, useEffect, useState} from 'react';
import backend from "../component/api/backend";
import axios from "axios";


const UsersWishlistContext = React.createContext({})

export function useUsersWishlists() {
    return useContext(UsersWishlistContext)
}

export function UsersWishlistProvider({userEmail, children}) {
    console.log('userEmail:  '+ userEmail)
    const [wishlists, setWishlists] = useState([])
    useEffect(() => {
        try {
            axios.get(`${process.env.REACT_APP_SERVER_HOST}/wishlists/${userEmail}`, )
                .then((response) => {
                    console.log(response.data)
                    // response.data.forEach((item) => item.key = item.id)
                    setWishlists(response.data)
                })
        } catch (err) {
            console.log(err)
        }
    }, [])

    const value = {
        wishlists,
        setWishlists
    }

    return (
        <UsersWishlistContext.Provider value={value}>
            {children}
        </UsersWishlistContext.Provider>
    )
}