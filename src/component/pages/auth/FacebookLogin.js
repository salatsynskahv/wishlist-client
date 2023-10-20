import {FacebookAuthProvider, signInWithPopup, fetchSignInMethodsForEmail} from "firebase/auth";
import {auth, facebookProvider} from "../../../firebase";
import {login} from "../../../redux/redux-features/user/userSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {BsFacebook} from "react-icons/bs";

export default function FacebookLogin() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleFacebookLogin() {
        signInWithPopup(auth, facebookProvider)
            .then(
                (result) => {
                    const user = result.user;
                    console.log(result);
                    // const credential = FacebookAuthProvider.credentialFromResult(result);
                    // const accessToken = credential.accessToken;
                    dispatch(login({
                        email: user.email,
                        uid: user.uid,
                        displayName: user.displayName,
                        photoUrl: user.photoURL,
                    }));
                    navigate('/');
                })
            .catch((error) => {
                console.log(JSON.stringify(error));
                if (error.code === 'auth/account-exists-with-different-credential') {
                    const email = error.customData.email;
                    fetchSignInMethodsForEmail(auth, email).then(
                        (result) => {
                            console.log(result);
                        }
                    )

                }

                console.log(error);
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = FacebookAuthProvider.credentialFromResult(error);
            });
    }

    return (<button className="btn btn-outline-primary" onClick={handleFacebookLogin}>
        Login with Facebook <BsFacebook/>
    </button>);
}