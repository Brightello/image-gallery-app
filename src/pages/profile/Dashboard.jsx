import React, {useContext, useEffect, useState} from 'react';
import {
    Text,
    Box,
    Flex,
    ButtonGroup, Button, Input,
    List,ListItem
} from "@chakra-ui/react";
import { Header} from "../../components/index.js";
import {Avatar,Link} from "../../components/index.js"
import {UserContext} from "../../context/user.jsx";
import {Outlet,useNavigate} from "react-router-dom";
import {useAuth} from "../../context/auth.jsx";

function Dashboard() {
    const {userData,profilePhoto,
        handleChangePhoto,downloadProgress}
        = useContext(UserContext)
    const navigate = useNavigate();
    const {currentUser} = useAuth();


    useEffect(() => {
      navigate("/dashboard/my-posts",{replace:true})
    }, []);
    return (
        <>
            {userData && (
                <Box>
                    <Header/>
                    <Box as="main" py="25px" mt="15px">
                    <Box as="section" maxW={{md:"760px",lg:"960px"}} mx="auto">
                        <Flex  py="10px" gap="10px" direction="column" maxW="100%" justify="center" align="center">
                             <Text as="label" htmlFor="profile-photo-input"
                                   onChange ={(e) => handleChangePhoto(e)}>
                                 <Input
                                     display="none"
                                     type="file"
                                     id="profile-photo-input"
                                 />
                                 <Avatar
                                     name={userData.firstname}
                                     src={currentUser.photoURL ? currentUser.photoURL : ""}
                                     size="xl"
                                     position="relative"
                                 />
                             </Text>
                            <Text as="h1" fontSize="4xl">
                                {userData.firstname} {userData.lastname}
                            </Text>
                            <Text fontSize="sm">{userData.email}</Text>
                        </Flex>
                           </Box>
                        <Flex  w="100%" justify="center" align="center" py="20px">
                            <List as="ul" display="flex" fontSize="30px" flexWrap="wrap" mb="20px">
                                <ListItem ><Link to="my-posts" >My Posts</Link></ListItem>
                                <ListItem ><Link to="saved">Saved</Link></ListItem>
                                <ListItem  ><Link to="community">Community</Link></ListItem>
                            </List>
                        </Flex>
                        <Box as="section" maxW="1020px" mx="auto" px="30px">
                            <Outlet/>
                        </Box>
                    </Box>

                </Box>
            )}
        </>
    );
}

    export default Dashboard;
