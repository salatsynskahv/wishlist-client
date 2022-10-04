import React, {useRef, useState} from "react";
import {useAuth} from "../../contexts/AuthContext";
import {Link} from "react-router-dom";
import {Alert, Button, Card, Container, Form} from "react-bootstrap";

export default function ForgotPassword(){
    const emailRef = useRef()
    const {resetPassword} = useAuth()
    console.log(JSON.stringify(useAuth()))
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    // const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        try {
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions')
        } catch {
            setError("Failed to reset password")
        }
        setLoading(false)
    }

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
            <div className="w-100" style={{maxWidth: "400px"}}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Password Reset</h2>
                        { error && <Alert variant="danger"> {error}</Alert> }
                        { message && <Alert variant="success"> {message}</Alert> }
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required>
                                </Form.Control>
                            </Form.Group>
                            <br/>
                            <Button disabled={loading} type="submit" className="w-100">Reset Password</Button>
                            <Link to="/login">Login</Link>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2"> Need an account? <Link to="/signup"> Sign up</Link></div>
            </div>
        </Container>)
}