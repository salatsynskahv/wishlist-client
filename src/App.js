import './styles/App.scss';
import Navbar from "./component/Navbar";
import React, {useEffect} from "react";
import {Outlet, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {login, logout} from "./redux/redux-features/user/userSlice";
import {auth, onAuthStateChanged} from "./firebase";

function App() {
    const location = useLocation();
    const dispatch = useDispatch();
    console.log("APPLICATION STARTED")
    console.log('location: ' + JSON.stringify(location));
    useEffect(() => {
        onAuthStateChanged(auth, (userAuth) => {
            if (userAuth) {
                dispatch(login({
                    email: userAuth.email,
                    uid: userAuth.uid,
                    displayName: userAuth.displayName,
                    photoUrl: userAuth.photoUrl
                }))
            } else {
                dispatch(logout())
            }
        })
    })

    return (
        <div className="App">
            <header>
                <Navbar/>
            </header>
            <Outlet/>
        </div>
    );
}

export default App;
