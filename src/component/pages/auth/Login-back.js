import {Button} from "@mui/material";
import FacebookIcon from "../../../icons/FacebookIcon";
import {useEffect, useState} from 'react';
import jwt_decode from "jwt-decode";

export default function Login() {

    const [user, setUser] = useState();

    const handleGoogleAuthCallback = (response) => {
        console.log(response + JSON.stringify(response))
        const userObject = jwt_decode(response.credential)
        console.log(userObject)
        setUser(userObject)
        document.getElementById("googleSignin").hidden = true;
    }

    const handleSignOut = (event) =>{
        setUser(undefined)
        document.getElementById("googleSignin").hidden = false;
    }

    useEffect(() => {
        /*global google*/
        google.accounts.id.initialize({
            client_id: "505731494113-5dq3sn802eqn8k2fg787kc3j3l6cu0c7.apps.googleusercontent.com",
            callback: handleGoogleAuthCallback
        })
        google.accounts.id.renderButton(
            document.getElementById("googleSignin"),
            {theme: "outline", size: "large"}
        )
    }, [])

    return (
        <div>

            <div id="googleSignin">
                {/*<Button variant="outlined" endIcon={<GoogleIcon/>}> Sign in with Google</Button>*/}
            </div>
            <div>
                <Button variant="outlined" endIcon={<FacebookIcon/>}> Sign in with Facebook </Button>
            </div>

            {user &&
                <>
                    <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
                    <div>
                        <img alt="user Image" src={user.picture}/>
                        <h3>{user.name}</h3>
                    </div>
                </>
            }
        </div>
    )
}