import React from 'react';
import {Avatar as ChakrAvatar} from "@chakra-ui/react"
function Avatar({name,src,size}) {
    return (
        <ChakrAvatar
        name={name}
        src={src}
        cursor="pointer"
        size={size ? size : "md"}
        >


        </ChakrAvatar>
    );
}

export default Avatar;