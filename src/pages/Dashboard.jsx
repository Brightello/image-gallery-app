import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Text, Box, Flex, Heading, Link, List, ListItem, AvatarBadge} from "@chakra-ui/react";
import {AuthContext, useAuth} from "../firebase/auth.jsx";
import {db} from "../firebase/config.js";
import {getDoc, doc,} from "firebase/firestore";
import {Loader} from "../components/index.js";
import {Link as ReachLink} from "react-router-dom";
import useCustomToast from "../hooks/useCustomToast.jsx";


function Dashboard() {
    const {currentUser} = useContext(AuthContext)
    const [userData, setUserData] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [showUserOptions, setShowUserOptions] = useState(false);
    const {logoOutUser} = useAuth()
    const showToast = useCustomToast()

    const handleLogOut = async () => {
        try {
            await logoOutUser()
            showToast("User successfully logged out", "info", 3, "Have a nice day!")
        } catch (error) {
            showToast("Error while logging out", "error", 3,`${error.message}`)
        }
    }
    const showOptions = () => {
        setShowUserOptions(prevState => !prevState)
    }
    const getUserData = async () => {
        const docRef = doc(db, "/users", currentUser.uid)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setUserData(docSnap.data())

        } else {
            console.log("No such document")
        }


    }

    useEffect(() => {
        return () => {
            getUserData()

        }

    }, [currentUser]);


    // console.log(userData)


    return (
        <>
            {userData ? (
                <Flex as="header" w="100%" h="80px" justify="space-between" align="center" px="30px" py="30px">
                    <Flex as="nav" justify="between" align="center">
                        <Box borderRadius="sm"  _hover={{bg: "#ddd"}}>
                            <Heading fontSize="1xl" as={ReachLink} to="/">
                                Main Page
                            </Heading>
                        </Box>

                    </Flex>
                    <Avatar
                        name={userData.firstname}
                        src={profilePhoto ? profilePhoto : ""}
                        _hover={{bg: "#ddd"}}
                        transition="0.2s"
                        cursor="pointer"
                        position="relative"
                        onClick={() => showOptions()}
                    />


                    {showUserOptions && (
                        <Box
                            cursor="pointer"
                            position="absolute"
                            top="75%"
                            right="10px"
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
                                    <Avatar name={userData.firstname} src={profilePhoto ? profilePhoto : ""} mr="10px">
                                        <AvatarBadge bg='green.500' boxSize='1em' />
                                    </Avatar>
                                    <Flex direction="column">
                                        <Text fontSize="xl">
                                            {userData.firstname} {userData.lastname}
                                        </Text>
                                        <Text fontSize="sm">{userData.email}</Text>
                                    </Flex>
                                </Flex>
                                <List py="15px">
                                    <ListItem
                                        py="10px"
                                       onClick ={() => handleLogOut()}
                                    >
                                        Log Out
                                    </ListItem>
                                    <ListItem
                                        as = {ReachLink}
                                        to="/update-profile"
                                        py="10px"
                                    >
                                       Update a profile

                                    </ListItem>
                                </List>
                            </Box>
                        </Box>
                    )}
                </Flex>
            ) : (
                <>
                    <Loader/>
                </>
            )}
        </>
    );
}

export default Dashboard;