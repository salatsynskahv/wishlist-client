import React, {useRef, useState} from 'react'
import {useAuth} from "../../../contexts/AuthContext";
import {Alert, Button, Card, Container, Form} from "react-bootstrap";
import {Link, useNavigate } from "react-router-dom"

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    console.log(JSON.stringify(useAuth()))
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        } catch {
            setError("Failed to login")
        }
        setLoading(false)
    }

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
            <div className="w-100" style={{maxWidth: "400px"}}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Login</h2>
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
                            <br/>
                            <Button disabled={loading} type="submit" className="w-100">Log in</Button>
                        </Form>
                        <div className="w-100 text-center mt-3">
                            <Link to="/forgot-password">Forgot password?</Link>
                        </div>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2"> Need an account? <Link to="/signup"> Sign up</Link></div>
            </div>
        </Container>)
}