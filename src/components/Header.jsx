import React, {useContext, useState} from 'react';
import {Box, Flex, Heading, List, ListItem} from "@chakra-ui/react";
import {Link as ReachLink} from "react-router-dom";
import {DropDown, Icon, Avatar} from "./index.js";
import {GrGallery} from "react-icons/gr"

import { useAuth} from "../context/auth.jsx";
import {UserContext} from "../context/user.jsx";
import useCustomToast from "../hooks/useCustomToast"

function Header() {
    const [showUserOptions, setShowUserOptions] = useState(false);
    const {logOutUser} = useAuth()
    const {userData,profilePhoto} = useContext(UserContext)
    const showToast = useCustomToast()
    const showOptions = () =>{
       setShowUserOptions(prevState => !prevState)
        console.log(5)
    }
    const handleUserLogOut = async () =>{
        try {
            await logOutUser();
            showToast("User logout success","info",3,"User successfully logged out")
        }catch (error){

        }

    }

    return (
        <Flex as="header" w="100%" h="70px" justify={{base:"center",sm:"space-between"}}
              position={{sm:"static",md:"fixed"}}
              zIndex={1}
              align="center" px="30px" py="35px">
            <Flex as="nav" justify="between" align="center">
                <Flex borderRadius="lg" p="10px"
                      transition="0.4s ease-in-out"

                      _hover={{bg: "#ddd"}} align="center" gap={2}

                >
                    <Icon IconComponent={GrGallery} size={25}/>
                    <Heading fontSize="2xl" as={ReachLink} to="/" >
                        Image Gallery
                    </Heading>
                </Flex>
            </Flex>
            {/*<Input placeholder="Search" />*/}
            <Box position="relative"
                 display={{base:"none",md:"block"}}
                 onClick={() => showOptions()}
            >
                {userData &&
               <Avatar
                name={userData.firstname}
                src={profilePhoto ? profilePhoto : ""}
                position="relative"
            />
                }
            </Box>
            {showUserOptions && (
                <DropDown>
                    <List py="15px">
                        <ListItem py="10px" onClick={() => handleUserLogOut()}>
                            Log Out
                        </ListItem>
                        <ListItem as={ReachLink} to="/update-profile" py="10px">
                            Update a profile
                        </ListItem>
                    </List>
                </DropDown>
            )}
        </Flex>
    );
}

export default Header;