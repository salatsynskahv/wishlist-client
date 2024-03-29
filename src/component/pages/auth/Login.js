import React, {useRef, useState} from 'react'
import {Alert, Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux";
import {signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import {auth, googleProvider} from "../../../firebase";
import {login} from "../../../redux/redux-features/user/userSlice";
import {FcGoogle} from "react-icons/fc";
import FacebookLogin from "./FacebookLogin";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const dispatch = useDispatch();
    // const {login, errorCode, signupWithGoogle} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function handleGoogle() {
        signInWithPopup(auth, googleProvider).then(
            userAuth => {
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: userAuth.user.displayName,
                    photoUrl: userAuth.user.photoURL,
                }));
                navigate('/');
            }
        )
        // signupWithGoogle().then((result) => {
        //     navigate('/');
        // })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        try {
            setError("")
            setLoading(true)
            signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value).then(
                userAuth => {
                    dispatch(login({
                        email: userAuth.user.email,
                        uid: userAuth.user.uid,
                        displayName: userAuth.user.displayName,
                        photoUrl: userAuth.user.photoURL,
                    }));
                    navigate('/');
                }
            )
            // if (errorCode) {
            //     setError("Failed to login")
            // }
            console.log("navigate after login")
            navigate("/")
        } catch {
            console.log("Failed to login")
            setError("Failed to login")
        }
        setLoading(false)
    }

    return (
        <div className="login-main">

            <div className="login-container">
                <div className="social-login">
                    <button className="btn btn-outline-primary" onClick={handleGoogle}>
                        Login with Google    <FcGoogle size={25}/>
                    </button>
                    <FacebookLogin />
                    {/*<button className="btn btn-outline-primary" disabled="true">Login with FacebookLogin</button>*/}
                </div>
                {error && <Alert variant="danger"> {error} </Alert>}
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
                    <Button disabled={loading} type="submit" className="w-100">Login</Button>
                </Form>

            </div>
        </div>)
}