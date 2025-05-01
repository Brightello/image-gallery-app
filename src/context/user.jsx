import { doc, getDoc } from "firebase/firestore"
import React, { createContext, useContext, useEffect, useState } from "react"

import { db } from "../firebase/config.js"
import useCustomToast from "../hooks/useCustomToast.js"
import useFileStore from "../hooks/useFileStore.js"
import { AuthContext, useAuth } from "./auth.jsx"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)
  const { currentUser } = useContext(AuthContext)
  const { logOutUser } = useAuth()
  const showToast = useCustomToast()
  const {
    userUploadPost,
    userFetchAllPosts,
    userUploadProfilePhoto,
    userFetchCurrentPosts,
    userFetchSavedPosts
  } = useFileStore()
  const [selectedFile, setSelectedFile] = useState(null)
  const [myPosts, setMyPosts] = useState([])
  const [savedPosts, setSavedPosts] = useState([])
  const [communityPosts, setCommunityPosts] = useState([])

  const handleFetchMyPosts = async () => {
    const pictures = await userFetchCurrentPosts()
    setMyPosts([...pictures])
    await handleFetchMyPosts()
  }
  const handleChangePhoto = async (e) => {
    const selectedFile = e.target.files[0]

    try {
      await userUploadProfilePhoto(selectedFile)
    } catch (error) {
      console.log(error)
    }
  }

  const handleFetchPosts = async () => {
    const pictures = await userFetchAllPosts()
    setCommunityPosts([...pictures])
  }

  const handleFetchSavedPosts = async () => {
    const savedPictures = await userFetchSavedPosts()
    setSavedPosts(savedPictures)
  }

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    await userUploadPost(file)
    await handleFetchPosts()
    setSelectedFile(null)
  }
  const handleLogOut = async () => {
    try {
      await logOutUser()
      showToast("User successfully logged out", "info", 3, "Have a nice day!")
    } catch (error) {
      showToast("Error while logging out", "error", 3, `${error.message}`)
    }
  }

  useEffect(() => {
    const getUserData = async () => {
      if (currentUser) {
        const docRef = doc(db, "/users", currentUser.uid)
        try {
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            setUserData(docSnap.data())
          } else {
            console.log("No such document")
          }
        } catch (error) {
          console.log(error.message)
        }
      }
    }

    getUserData()

    return () => {}
  }, [currentUser])

  const value = {
    userData,
    myPosts,
    savedPosts,
    communityPosts,
    selectedFile,
    handleFetchSavedPosts,
    handleFetchMyPosts,
    handleFetchPosts,
    handleChangePhoto,
    handleUpload,
    handleLogOut
  }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserProvider
