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



function loginUser(email,password){
        return signInWithEmailAndPassword(auth,email,password)
}

function registerUser(email,password){
        return createUserWithEmailAndPassword(auth,email,password)

}
function logOutUser(){
        return signOut(auth);
}

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            console.log(currentUser)
            setPending(false)
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