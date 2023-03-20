import React, {useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../../../redux/redux-features/user/userSlice";
import {signOut} from "firebase/auth";

export default function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(handleLogout, 1000)
    }, [])

    async function handleLogout() {
        try {
            signOut().then(() => {
                dispatch(logout);
            })
            navigate('/login');
        } catch {
            //todo: make nice error message
            console.log('Failed logout')
        }

    }

    return (
        <div className="container">
            <span>Logging out ... </span>
        </div>
    )
}