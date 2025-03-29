import React, {useContext} from 'react';
import {Avatar, AvatarBadge, Box, Flex, Text} from "@chakra-ui/react";
import {UserContext} from "../context/user.jsx";

function DropDown({children}) {
    const {userData,profilePhoto} = useContext(UserContext)
    return (
        <Box
            position="absolute"
            top="70%"
            zIndex={1}
            right="6%"
            borderRadius="lg"
            boxShadow="md"
            rounded="md"
            bg="white"
            px="20px"
            py="2px"
        >
            <Box>
                <Text as="p" fontSize="sm" py="5px">
                    Currently in account
                </Text>
                <Flex justify="center" align="center">
                    <Avatar name={userData.firstname} src={profilePhoto ? profilePhoto : ""}
                            mr="10px">
                        <AvatarBadge bg="green.500" boxSize="1em"/>
                    </Avatar>
                    <Flex direction="column">
                        <Text fontSize="xl">
                            {userData.firstname} {userData.lastname}
                        </Text>
                        <Text fontSize="sm">{userData.email}</Text>
                    </Flex>
                </Flex>
                {children}
            </Box>
        </Box>
    );
}

export default DropDown;