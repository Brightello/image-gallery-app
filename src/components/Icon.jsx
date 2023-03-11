import React from 'react';
import {Box} from "@chakra-ui/react";

function Icon({IconComponent,size,color}) {
    return (
        <Box

        // _hover={{
        //     bg:"gray.200",
        //     borderRadius:"lg",
        //     cursor:"pointer",
        //     transition: "0.4s ease"
        // }}
        >
            <IconComponent size={size} color={color ? color : ""} />
        </Box>
    );
}

export default Icon;