import { AuthContext } from "@context/auth.jsx"
import useCustomToast from "@hooks/useCustomToast"
import { updateProfile } from "firebase/auth"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore"
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable
} from "firebase/storage"
import { useContext } from "react"
import { v4 as uuidv4 } from "uuid"

import { db, storage } from "#firebase/config"

function UseFileStore() {
  const { currentUser } = useContext(AuthContext)
  const showToast = useCustomToast()

  const userUploadPost = async (file) => {
    if (!file) {
      showToast("File upload error", "error", 3, "No file selected.")
      return
    }

    const isImage = /.*\/(jpe?g|png|gif)$/i.test(file.type)
    if (!isImage) {
      showToast("File upload error", "error", 3, "File is not an image.")
      return
    }

    const newPostId = uuidv4()
    const storage1Ref = ref(
      storage,
      `/images/${currentUser?.uid}/my-posts/${newPostId}`
    )

    try {
      const uploadTask = uploadBytesResumable(storage1Ref, file)

      showToast("Post upload", "info", 3, "Attempting to upload a post....")
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          showToast("Error while uploading post ", "error", 3, error.message)
        },
        async () => {
          try {
            const url1 = await getDownloadURL(storage1Ref)

            const myPostRef = collection(
              db,
              `users/${currentUser?.uid}/my-posts`
            )
            const newPost = {
              author: currentUser.uid,
              file_name: file.name,
              imageUrl: url1,
              comments: [],
              createdAt: serverTimestamp()
            }

            const postRef = await addDoc(myPostRef, newPost)

            const myPostDocRef = doc(myPostRef, postRef.id)
            await updateDoc(myPostDocRef, { ...newPost, uid: postRef.id })

            await addDoc(collection(db, "posts"), {
              ...newPost,
              uid: postRef.id
            })

            showToast(
              "Post upload",
              "success",
              3,
              "Post was successfully uploaded to your profile!"
            )
          } catch (error) {
            console.log(error.message)
          }
        }
      )
    } catch (error) {
      console.log(error.message)
    }
  }

  const userDeletePost = async (uid, postId) => {
    try {
      const userPostsRef = collection(db, `users/${uid}/my-posts`)
      const q = query(userPostsRef, where("uid", "==", postId))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        console.log(`No posts found with postId ${postId}`)
        return
      }

      const postDoc = querySnapshot.docs[0]
      const postRef = postDoc.ref
      await deleteDoc(postRef)
      showToast(
        "Post delete confirmation",
        "success",
        3,
        "Post was successfully deleted!"
      )
    } catch (error) {
      console.log(`Error deleting post: ${error}`)
    }
  }

  const userSavePost = async (file) => {
    const { createdAt, imageUrl, file_name, uid } = file
    try {
      const savedPostDocRef = doc(db, `users/${currentUser.uid}/saved/${uid}`)
      const docSnapshot = await getDoc(savedPostDocRef)

      if (docSnapshot.exists()) {
        await deleteDoc(savedPostDocRef)
        showToast(
          "Post deleted from collection",
          "info",
          3,
          "Post was successfully deleted from collection"
        )
      } else {
        const savedPost = {
          imageUrl: imageUrl,
          file_name: file_name,
          createdAt: createdAt,
          savedAt: serverTimestamp(),
          uid: uid
        }

        await setDoc(savedPostDocRef, savedPost)
        showToast("Post saved", "success", 3, "Post was successfully saved!")
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const userFetchAllPosts = async () => {
    const postsRef = query(
      collection(db, `/posts`),
      orderBy("createdAt", "desc")
    )
    try {
      const querySnapshot = await getDocs(postsRef)
      const posts = querySnapshot.docs.map((post) => post.data())
      return posts
    } catch (error) {
      showToast("Posts fetch error", "error", 3, error.message)
    }
  }
  const userFetchCurrentPosts = async () => {
    const postsRef = query(
      collection(db, `/users/${currentUser.uid}/my-posts`),
      orderBy("createdAt", "desc")
    )
    try {
      const querySnapshot = await getDocs(postsRef)
      const posts = querySnapshot.docs.map((post) => post.data())
      return posts
    } catch (error) {
      showToast("Posts fetch error", "error", 3, error.message)
    }
  }

  const userFetchSavedPosts = async () => {
    const postsRef = query(
      collection(db, `/users/${currentUser?.uid}/saved`),
      orderBy("savedAt", "desc")
    )
    try {
      const querySnapshot = await getDocs(postsRef)
      const posts = querySnapshot.docs.map((post) => post.data())
      return posts
    } catch (error) {
      showToast("Posts fetch error", "error", 3, error.message)
    }
  }

  const userUploadProfilePhoto = async (file) => {
    if (file) {
      const isImage = /.*\/(gif|jpe?g|gif)$/.test(file.type)
      if (!isImage) {
        showToast("File upload error", "error", 3, "File wrong format")
        return
      }
      const storageRef = ref(
        storage,
        `/images/${currentUser?.uid}/profile_photo/profile_photo.jpg`
      )
      await uploadBytes(storageRef, file)
      try {
        const fileRef = await getDownloadURL(storageRef)
        await updateProfile(currentUser, {
          photoURL: fileRef
        })
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  return {
    userUploadPost,
    userFetchAllPosts,
    userUploadProfilePhoto,
    userSavePost,
    userFetchCurrentPosts,
    userFetchSavedPosts,
    userDeletePost
  }
}

export default UseFileStore
