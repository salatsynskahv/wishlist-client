import React, {useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../contexts/AuthContext";

export default function Logout() {
    const navigate = useNavigate()
    const {logout} = useAuth()

    useEffect(() => {
        setTimeout(handleLogout, 1000)
    }, [])

    async function handleLogout() {
        try {
            await logout()
            navigate('/login')

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