import React, {useEffect, useState} from "react";
import { auth } from "./config";
import app from './config'


export const AuthContext = React.createContext();

export const AuthProvider = ({children}) =>{
    const [currentUser,setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
        return () => {
          unsubscribe()
        };
    }, []);

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