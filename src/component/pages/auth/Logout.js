import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../../../redux/redux-features/user/userSlice";
import {auth} from "../../../firebase";
import {clearWishlists, initWishlists} from "../../../redux/redux-features/wishlists/wishlistsSlice";

export default function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');

    useEffect(() => {
        handleLogout();
    }, [])

    async function handleLogout() {
        try {
            auth.signOut().then(() => {
                dispatch(logout);
                dispatch(initWishlists({initValue: null}));
                navigate('/login');
            });
        } catch (e) {
            //todo: make nice error message
            console.log('Failed logout' + e);
            setError(e.message);
        }

    }

    return (
        <div className="container">
            <span>Log out ... </span>
            {error && <p>{error}</p>}
        </div>
    )
}