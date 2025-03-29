import React, {useState} from 'react';
import {Button} from "@chakra-ui/react";
import {Link as ReachLink} from "react-router-dom"

function Link({children,to,shouldBeActive}) {
    const [isActive, setIsActive] = useState(false);
    return (
        <>
            <Button
                as={ReachLink}
                to={to}
                size="md"
                fontSize="16px"
                fontWeight="600"
                borderRadius="md"
                borderWidth="2px"
                borderStyle="solid"
                border= "none"
                bg="transparent"
                _hover={!isActive ? { bg: "#e5e5e5", borderColor: "#dcdcdc", color: "#111" } : {bg:"none",borderBottom: "4px solid black"}}
                onClick={shouldBeActive ? ()=>setIsActive(true) : ""}
                _active={{ transform:"scale(0.95)"}}
                >
                {children}
            </Button>
        </>
    );
}

export default Link;