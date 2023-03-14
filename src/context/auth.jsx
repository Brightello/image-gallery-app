import React, {createContext, useContext, useEffect, useState} from "react";
import {auth} from "../firebase/config.js";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut} from "firebase/auth";
import {Loader} from "../components/index.js";


export const AuthContext = createContext({
    currentUser: null,
    loginUser: () => Promise,
    registerUser: () => Promise,
    logOutUser: () => Promise
})
export const useAuth = () => useContext(AuthContext)
export const AuthProvider = ({children}) =>{
    const [currentUser,setCurrentUser] = useState(null);
    const [pending,setPending] = useState(true)



    async function loginUser(email, password) {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    async function registerUser(email, password) {
        return await createUserWithEmailAndPassword(auth, email, password);
    }

    async function logOutUser() {
        return await signOut(auth);
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setPending(false)
            console.log(user)
        });
        return () => {
            unsubscribe()
        };
    }, []);

    const value = {
        currentUser,
        loginUser,
        registerUser,
        logOutUser
    }
    return (
        <>
        {pending ? (
           <Loader/>
            ) : (
                  <AuthContext.Provider
                 value={value}
                  >
                      {children}
                  </AuthContext.Provider>
            )}
        </>

    )

}