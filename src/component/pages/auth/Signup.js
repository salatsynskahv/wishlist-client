import React, {useRef, useState} from 'react'
import {Alert, Card, Form, Button, Container} from "react-bootstrap";
import {useAuth} from "../../contexts/AuthContext"
import {Link, useNavigate} from "react-router-dom";

export default function Signup() {
    const emailRef = useRef()
    const passwordConfirmRef = useRef()
    const passwordRef = useRef()
    const {signup} = useAuth()
    console.log(JSON.stringify(useAuth()))
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords don't match")
        }

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        } catch {
            setError("Failed to create account")
        }
        setLoading(false)
    }

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
            <div className="w-100" style={{maxWidth: "400px"}}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign up</h2>
                        {error && <Alert variant="danger"> {error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group id="password-confirm">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} required>
                                </Form.Control>
                            </Form.Group>
                            <br/>
                            <Button disabled={loading} type="submit" className="w-100">Sign up</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Already have an account?
                    <Link to="/login">Log in</Link>
                </div>
            </div>
        </Container>)

}