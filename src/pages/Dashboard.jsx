import React, {useContext, useEffect, useState} from 'react';
import {
    Avatar,
    Text,
    Box,
    Flex,
    Heading,
    List,
    ListItem,
    AvatarBadge,
     ButtonGroup, Button, Input
} from "@chakra-ui/react";
import {AuthContext, useAuth} from "../context/auth.jsx";
import {db} from "../firebase/config.js";
import {getDoc, doc,} from "firebase/firestore";
import {Loader,Icon,ImagesGrid} from "../components/index.js";
import {Link as ReachLink} from "react-router-dom";
import useCustomToast from "../hooks/useCustomToast.js";
import useFileStore from "../hooks/useFileStore.js";
import {AiOutlinePlus} from "react-icons/ai"


function Dashboard() {
    const {currentUser} = useContext(AuthContext)
    const [userData, setUserData] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [showUserOptions, setShowUserOptions] = useState(false);
    const {logoOutUser} = useAuth()
    const showToast = useCustomToast()
    const {files,pending,uploadFile,fetchCurrentUserFiles,userUploadProfilePhoto} = useFileStore()
    const [posts, setPosts] = useState([]);

 const handleChangePhoto = async  (e) =>{
     const selectedFile = e.target.files[0]
     try{
      const currentPhoto =  await userUploadProfilePhoto(selectedFile)
         setProfilePhoto(currentPhoto)
     }catch (error){
         console.log(error)
     }
 }
    const handleFetchPosts = async () =>{
        try{
           const pictures = await fetchCurrentUserFiles();
            setPosts([...pictures])
        }catch (error){
            console.log(error.message)
        }
    }

    const handleUpload = async (e) =>{
        try{
            const file = e.target.files[0];
            await uploadFile(file)
            showToast("File upload success","success",3,"Picture was successfully uploaded to your profile!")
        }catch (error){
            showToast("File upload error","error",3,error.message)
            console.log(error.message)
        }
        await handleFetchPosts();
    }
    const handleLogOut = async () => {
        try {
            await logoOutUser()
            showToast("User successfully logged out", "info", 3, "Have a nice day!")
        } catch (error) {
            showToast("Error while logging out", "error", 3, `${error.message}`)
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
            handleFetchPosts()
        }

    }, [currentUser]);


    return (
        <>
            {userData ? (
                <Box>
                    <Flex as="header" w="100%" h="70px" justify="space-between" align="center" px="30px" py="30px">
                        <Flex as="nav" justify="between" align="center">
                            <Box borderRadius="sm" _hover={{bg: "#ddd"}}>
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
                                position="absolute"
                                top="11%"
                                zIndex={1}
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
                                    <List py="15px">
                                        <ListItem py="10px" onClick={() => handleLogOut()}>
                                            Log Out
                                        </ListItem>
                                        <ListItem as={ReachLink} to="/update-profile" py="10px">
                                            Update a profile
                                        </ListItem>
                                    </List>
                                </Box>
                            </Box>
                        )}
                    </Flex>
                    <Box as="main" py="25px">
                    <Box as="section" maxW="960px" mx="auto">
                        <Flex  py="10px" gap="10px" direction="column" maxW="100%" justify="center" align="center">
                            <Avatar name={userData.firstname} src={profilePhoto ? profilePhoto : ""} mr="10px"
                                    size="xl"/>
                            <Text as="h1" fontSize="4xl">
                                {userData.firstname} {userData.lastname}
                            </Text>
                            <Text fontSize="sm">{userData.email}</Text>
                            <Text fontSize="sm">0 friends online</Text>
                            <ButtonGroup py="10px">
                                <Button>Update Profile</Button>
                            </ButtonGroup>

                            <Box>
                                <Text as="label" htmlFor="file-input" className="icon-input-label"
                                      onChange ={(e) => handleUpload(e)}
                                >
                                    <Input
                                        display="none"
                                        type="file"
                                        id="file-input"
                                        accept=".jpg,.png,.gif"
                                    />
                                    <Icon IconComponent={AiOutlinePlus} size={25} />
                                </Text>
                            </Box>


                        </Flex>

                           </Box>
                        <Box as="section" maxW="960px" mx="auto">
                            {pending ? (<><Loader/></>) : (<ImagesGrid files={posts}/>)}
                        </Box>
                    </Box>

                </Box>
            ) : (
                <Loader/>
            )}
        </>
    );
}
    export default Dashboard;
