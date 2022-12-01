import React, {useState} from "react"
import {Card, Button, Alert} from 'react-bootstrap'
import {useAuth} from "../../contexts/AuthContext";
import {Link, useNavigate} from "react-router-dom";

export default function Home() {
    const [error, setError] = useState()
    const { currentUser, logout } = useAuth();
    console.log('currentUser: '+ JSON.stringify(currentUser));
    const navigate = useNavigate()
    async function handleLogout() {
        setError('')
        try{
            await logout()
            navigate('/login')

        }catch {
            setError('Failed to logout')
        }

    }

    return (<div className="container">
        <Card>
            <Card.Body>
                {error && <Alert variant="danger"> {error}</Alert>}
                <h2 className="text-center mb-4">Profile</h2>
                <strong>Email: </strong> {currentUser.email}
                <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update profile</Link>
            </Card.Body>
        </Card>
        <Card>
            <div className="text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Log out</Button>
            </div>
        </Card>
    </div>)
}