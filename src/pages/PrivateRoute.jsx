import React, {useContext} from 'react';
import {AuthContext} from '../context/auth.jsx'
import { Navigate, Outlet} from "react-router-dom";
function PrivateRoute() {
    const {currentUser} = useContext(AuthContext)
    return (
        <>
            {currentUser ? <Outlet/> : <Navigate to="/login"/>}
        </>

    );
}

export default PrivateRoute;