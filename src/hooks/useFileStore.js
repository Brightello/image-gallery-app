import React, {useContext, useState} from 'react';
import {db, storage} from "../firebase/config.js";
import {ref,getDownloadURL,uploadBytes} from "firebase/storage"
import {
    doc,
    updateDoc,
    collection,
    addDoc,
    orderBy,
    getDocs,
    serverTimestamp,
    query,
    setDoc,
    deleteDoc, getDoc
} from "firebase/firestore"
import {AuthContext} from "../context/auth.jsx";
import useCustomToast from "../hooks/useCustomToast";
import { v4 as uuidv4 } from 'uuid';
function UseFileStore() {
    const [files, setFiles] = useState([]);
    const {currentUser} = useContext(AuthContext)
 const showToast = useCustomToast()
    const [downloadProgress, setDownloadProgress] = useState(0);

    const uploadFile = async (file) => {
        if (!file) {
            showToast("File upload error", "error", 3, "No file selected.");
            return;
        }

        const isImage = /.*\/(gif|jpe?g|gif)$/.test(file.type)
        if(!isImage) {
            showToast("File upload error","error",3,"File wrong format")
            return
        }
        const storageRef = ref(storage, `/images/${currentUser.uid}/my-posts/${file.name}`);
        try {
           const existingFile = await getDownloadURL(storageRef);
           if(existingFile){
               showToast("File upload error", "error", 3, "File with this name already exists.");
               return
           }

        } catch (error) {
            if(error.code === "storage/object-not-found"){
                showToast("File upload ", "success", 3, "Uploading file...");
            }
        }

        const postRef = collection(db, `users/${currentUser.uid}/my-posts`);
        const newDocId = uuidv4();

        try {
            const snapshot = await uploadBytes(storageRef, file);
            const downloadUrl = await getDownloadURL(snapshot.ref);
            const newPost = {
                imageUrl: downloadUrl,
                name: file.name,
                createdAt: serverTimestamp(),
                uuid: newDocId
            };
            await addDoc(postRef, newPost);
            showToast("File upload", "success", 3, "File was successfully uploaded to your profile!");
        } catch (error) {
            console.error('Error uploading file:', error);
            showToast("File upload error", "error", 3, "Error uploading file. Please try again.");
        }

    };

    const userSaveFile = async (file) => {
        try {
            const {createdAt, imageUrl, name, uuid} = file;
            try {
                const savedPostDocRef = doc(db, `users/${currentUser.uid}/saved/${uuid}`);
                const docSnapshot = await getDoc(savedPostDocRef);

                if (docSnapshot.exists()) {
                    await deleteDoc(savedPostDocRef);
                    showToast("File deleted from collection", "info", 3, "Post was successfully deleted from collection");
                } else {
                    const savedPost = {
                        imageUrl: imageUrl,
                        name: name,
                        createdAt: createdAt,
                        savedAt: serverTimestamp(),
                        uuid: uuid,
                    };

                    await setDoc(savedPostDocRef, savedPost);
                    showToast("File saved", "success", 3, "Post was successfully saved!");
                }
            } catch (error) {
                console.log(error.message);
            }
        }catch (error){
            console.log(error.message)
        }
    }


            const fetchCurrentUserFiles = async () => {
        const postsRef = query(collection(db, `/users/${currentUser.uid}/my-posts`), orderBy("createdAt", "desc"))
        try {
            const querySnapshot = await getDocs(postsRef)
            const posts = querySnapshot.docs.map((post) => (post.data()))
            return posts;
        }catch (error){
                         showToast("Posts fetch error","error",3,error.message)
        }
    }

    const fetchSavedUserFiles = async () => {
        const postsRef = query(collection(db, `/users/${currentUser.uid}/saved`), orderBy("savedAt", "desc"))
        try {
            const querySnapshot = await getDocs(postsRef)
            const posts = querySnapshot.docs.map((post) => (post.data()))
            return posts;
        }catch (error){
            showToast("Posts fetch error","error",3,error.message)
        }
    }
const userFetchProfilePhoto = async () => {
    const storageRef = ref(storage, `/images/${currentUser.uid}/profile_photo/profile_photo.jpg`);
    try {
        const fileUrl = await getDownloadURL(storageRef);
        return fileUrl;
    } catch (error) {
        console.error(error.message);
    }
}

    const userUploadProfilePhoto = async (file) =>{
        if(file){
            const storageRef = ref(storage, `/images/${currentUser.uid}/profile_photo/profile_photo.jpg`);
           const usersRef = collection(db,`/users`)
             const docRef = doc(usersRef,`${currentUser.uid}`)
            await  uploadBytes(storageRef,file)
            const fileRef = await getDownloadURL(storageRef);
            await updateDoc(docRef,{
                profile_photo:fileRef,
            })
       return  fileRef;

        }


    }

return {files,downloadProgress,uploadFile,fetchCurrentUserFiles,
    userUploadProfilePhoto,userFetchProfilePhoto,userSaveFile,fetchSavedUserFiles}
}

export default UseFileStore;
