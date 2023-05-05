import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../../../redux/redux-features/user/userSlice";
import {signOut} from "firebase/auth";
import {auth} from "../../../firebase";

export default function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');

    useEffect(() => {
        setTimeout(handleLogout, 1000)
    }, [])

    async function handleLogout() {
        try {
            auth.signOut().then(() => {
                dispatch(logout);
            })
            navigate('/login');
        } catch (e) {
            //todo: make nice error message
            console.log('Failed logout' + e);
            setError(e.message);
        }

    }

    return (
        <div className="container">
            <span>Logging out ... </span>
            {error && <p>{error}</p>}
        </div>
    )
}