import React, {useRef, useState} from 'react'
import {useAuth} from "../../../contexts/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import {Alert, Button, Card, Container, Form} from "react-bootstrap";

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {currentUser, changeEmail, changePassword} = useAuth()
    console.log(JSON.stringify(useAuth()))
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


     function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords don't match")
        }
        const promises = []
        if(emailRef.current.value !== currentUser.email){
            promises.push(changeEmail(emailRef.current.value))
        }
        if(passwordRef.current.value){
            promises.push(changePassword(emailRef.current.value))
        }

        Promise.all(promises)
            .then(() =>{
                navigate('/')
            })
            .catch(() => {
                setError('Failed to update')
            })
            .finally(() => {setLoading(false)})
    }

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
            <div className="w-100" style={{maxWidth: "400px"}}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Update profile</h2>
                        {error && <Alert variant="danger"> {error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} defaultValue={currentUser.email} required>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef}
                                              placeholder="Leave blank to keep the same" >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group id="password-confirm">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef}
                                              placeholder="Leave blank to keep the same" >
                                </Form.Control>
                            </Form.Group>
                            <br/>
                            <Button disabled={loading} type="submit" className="w-100">Update</Button>
                        </Form>
                        <div className="w-100 text-center mt-3">
                            <Link to="/">Cancel</Link>
                        </div>
                    </Card.Body>
                </Card>
                {/*<div className="w-100 text-center mt-2"> Need an account? <Link to="/signup"> Sign up</Link></div>*/}
            </div>
        </Container>)
}