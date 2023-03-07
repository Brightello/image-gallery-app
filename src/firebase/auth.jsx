import React, {useEffect, useState} from "react";
import { auth } from "./config";
import app from './config'


export const AuthContext = React.createContext();

export const AuthProvider = ({children}) =>{
    const [currentUser,setCurrentUser] = useState(null);
    const [pending,setPending] = useState(true)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setPending(false)
        });
        return () => {
          unsubscribe()
        };
    }, []);

    if(pending){
        return <>Loading...</>
    }
    return (
        <AuthContext.Provider
        value={{
            currentUser
        }}
        >
            {children}
        </AuthContext.Provider>
    )
    
}