import React, {useEffect} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import useCustomToast from "../hooks/useCustomToast.jsx";

function NotFound() {
    const location = useLocation()
    const path = location.pathname
    const showToast = useCustomToast()
    useEffect(() => {
        return () => {
            showToast("Path Error","error",3,`Page ${path} does not exist`)

        };
    }, []);

    return (
        <>
            <Navigate to="/"/>
        </>
    );
}

export default NotFound;