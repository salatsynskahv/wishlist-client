import React, {useContext, useEffect, useState} from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateEmail, updatePassword} from "firebase/auth";
import {auth} from "../firebase"
import axios from "axios";


const AuthContext = React.createContext({nothing: ""})

export function useAuth() {
    return useContext(AuthContext)
}


export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [errorCode, setErrorCode] = useState(undefined);

    function signup(email, password) {
        console.log('signup call')
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        console.log('resetPassword')
        return auth.sendPasswordResetEmail(email)
    }

    function changeEmail(email) {
        return updateEmail(currentUser, email)
    }

    function changePassword(password) {
        return updatePassword(currentUser, password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
                if (user) {
                    setErrorCode(undefined);
                    try {
                        const userFormDB = await axios.get(`${process.env.REACT_APP_SERVER_HOST}/user/${user.email}`);
                        console.log(`userFormDB user: ${JSON.stringify(userFormDB)}`);
                        const resultUser = {...user, ...userFormDB.data};
                        console.log(JSON.stringify(resultUser));
                        setCurrentUser(resultUser)
                    } catch (error) {
                        console.log(error)
                        setErrorCode(error.code)
                    }
                }
                setLoading(false)
            },
            (error) => {
                console.log('Error in authContext' + JSON.stringify(error))
                setErrorCode(error.code);
            });

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        changeEmail,
        changePassword
    }


    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}