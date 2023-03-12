import React, {createContext, useContext, useEffect, useState} from 'react';
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase/config.js";
import {AuthContext, useAuth} from "./auth.jsx";
import useCustomToast from "../hooks/useCustomToast.js";
import useFileStore from "../hooks/useFileStore.js";
export const UserContext = createContext()


export const UserProvider = ({children}) => {
    const [userData, setUserData] = useState(null);
     const {currentUser} = useContext(AuthContext)

    const {logoOutUser} = useAuth()
    const showToast = useCustomToast()
    const {files,
        uploadFile,fetchCurrentUserFiles,userUploadProfilePhoto,
        userFetchProfilePhoto,userSaveFile,fetchSavedUserFiles} = useFileStore()
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [myPosts, setMyPosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);



    const fetchProfilePhoto = async () =>{
        const picture =  await userFetchProfilePhoto();
        setProfilePhoto([...savedPosts,picture])
    }
    const handleChangePhoto = async (e) =>{
        const selectedFile = e.target.files[0]

        try{
            const picture =  await userUploadProfilePhoto(selectedFile)
            setProfilePhoto(picture)
        }catch (error){
            console.log(error)
        }
    }

    const handleFetchPosts = async () =>{
            const pictures = await fetchCurrentUserFiles();
            setMyPosts([...pictures])
    }

    const handleFetchSavedPosts = async () =>{
        const savedPictures = await fetchSavedUserFiles()
        setSavedPosts(savedPictures)
    }

    const handleUpload = async (e) =>{
        const file = e.target.files[0]
        await uploadFile(file)
        await handleFetchPosts();
        setSelectedFile(null)


    }
    const handleLogOut = async () => {
        try {
            await logoOutUser()
            showToast("User successfully logged out", "info", 3, "Have a nice day!")
        } catch (error) {
            showToast("Error while logging out", "error", 3, `${error.message}`)
        }
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
            fetchProfilePhoto()

        }

    }, [currentUser]);

    const value = {
        userData,
        profilePhoto,
        myPosts,
        selectedFile,
        savedPosts,
        handleFetchSavedPosts,
        handleFetchPosts,
        handleChangePhoto,
        handleUpload,
        handleLogOut,

    }
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;