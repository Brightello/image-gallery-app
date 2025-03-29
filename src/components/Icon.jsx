import React from 'react';
import {Box} from "@chakra-ui/react";

function Icon({IconComponent,size,color}) {
    return (
        <
        >
            <IconComponent size={size} color={color ? color : ""} />
        </>
    );
}

export default Icon;