import React, {useContext} from 'react';
import {AuthContext} from '../firebase/auth'
import {Route, Navigate, Outlet} from "react-router-dom";
function PrivateRoute({component:RouteComponent,...rest}) {
    const {currentUser} = useContext(AuthContext)
    return (
        <>
            {currentUser ? <Outlet/> : <Navigate to="/login"/>}
        </>

    );
}

export default PrivateRoute;