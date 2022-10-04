import React, {useContext, useEffect, useState} from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateEmail, updatePassword } from "firebase/auth";
import { auth } from "../firebase"


const AuthContext = React.createContext({nothing: ""})

export function useAuth() {
    return useContext(AuthContext)
}


export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

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
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

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