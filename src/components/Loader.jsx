import React from 'react';
import {Box} from "@chakra-ui/react";
import "../styles/_loader.scss"
function Loader() {
    return (
        <Box className="loader-box">
            <Box className="dot"></Box>
            <Box className="dot"></Box>
            <Box className="dot"></Box>
        </Box>
    );
}

export default Loader;