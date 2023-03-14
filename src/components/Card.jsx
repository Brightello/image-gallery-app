import React from 'react';
import {Box} from "@chakra-ui/react";

function Card({children}) {
    return (
        <Box
            w="400px"
            borderWidth="1px"
            borderRadius="lg"
            p="16px"
            mx="auto"

        >
            {children}
        </Box>
    )
}

export default Card;