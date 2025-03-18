import React, {useContext,useEffect} from 'react';
import {Box} from "@chakra-ui/react";
import {AuthContext} from "../firebase/auth.jsx";
import {auth, colRef} from "../firebase/config.js";


function Dashboard() {
    const {currentUser} = useContext(AuthContext)
    useEffect(() => {
        return () => {
          auth.onAuthStateChanged((user) =>{
               if(user){

               }
           })
        };
    }, []);

    return (
        <Box w="100%">


        </Box>
    );
}

export default Dashboard;