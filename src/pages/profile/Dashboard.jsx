import React, {useContext, useEffect, useState} from 'react';
import {
    Text,
    Box,
    Flex,
    ButtonGroup, Button, Input,
    List,ListItem
} from "@chakra-ui/react";
import {Icon, ImagesGrid, Header} from "../../components/index.js";
import {Avatar,Link} from "../../components/index.js"
import {UserContext} from "../../context/user.jsx";
import {Outlet,useNavigate} from "react-router-dom";

function Dashboard() {
    const {userData,profilePhoto,
        handleChangePhoto,downloadProgress}
        = useContext(UserContext)
    const navigate = useNavigate();


    useEffect(() => {
      navigate("/dashboard/my-posts",{replace:true})
    }, []);
    return (
        <>
            {userData && (
                <Box>
                   <Header userData={userData} profilePhoto={profilePhoto}/>
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
                                     src={profilePhoto ? profilePhoto : ""}
                                     size="xl"
                                     position="relative"
                                 />
                             </Text>
                            <Text as="h1" fontSize="4xl">
                                {userData.firstname} {userData.lastname}
                            </Text>
                            <Text fontSize="sm">{userData.email}</Text>
                            <ButtonGroup>
                                <Button>Update Profile</Button>
                            </ButtonGroup>
                            {downloadProgress && "loading..."}
                        </Flex>
                        <Flex align="center"  display="column">
                        </Flex>
                           </Box>
                        <Flex  w="100%" justify="center" >
                            <List display="flex"  fontSize="30px" >
                                <ListItem p="20px"><Link to="my-posts" >My Posts</Link></ListItem>
                                <ListItem p="20px"><Link to="saved">Saved</Link></ListItem>
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
