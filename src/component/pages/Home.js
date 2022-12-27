import React, {useState} from "react"
import {Card, Button, Alert, Dropdown} from 'react-bootstrap'
import {useAuth} from "../../contexts/AuthContext";
import {Link, useNavigate} from "react-router-dom";

export default function Home() {
    const [error, setError] = useState()
    const {currentUser, logout} = useAuth();
    console.log('currentUser: ' + JSON.stringify(currentUser));
    const navigate = useNavigate()

    async function handleLogout() {
        setError('')
        try {
            await logout()
            navigate('/login')

        } catch {
            setError('Failed to logout')
        }

    }

    const aboutUser = !!currentUser ?
        (<div className="about-user">
            <h2 className="text-center mb-4">About You</h2>
            <strong>Email: </strong> {currentUser.email}
            <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update profile</Link>
        </div>) : (<p> Please, <Link to='/login'>login </Link> for better user experience</p>)

    return (
        <>
        <div className="dropdown">
            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                Dropdown button
            </button>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Link 1</a></li>
                <li><a className="dropdown-item" href="#">Link 2</a></li>
                <li><a className="dropdown-item" href="#">Link 3</a></li>
            </ul>
        </div>
            <div className="home-page-banner">
                <p>
                    <br/>
                    <h2 className="home-title"> Create wishlists!  &nbsp; Share with friends!</h2>
                    <h2 className="home-title">Get what you want! </h2>
                </p>
            </div>
            <div className="container">

                <aside id="home-aside" className="m-0">
                    <div className="container">
                        {error && <Alert variant="danger"> {error}</Alert>}
                        {aboutUser}
                    </div>
                </aside>
            </div>
        </>
    )

}