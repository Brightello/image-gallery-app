import React, {useContext, useEffect, useState} from 'react';
import {db, storage} from "../firebase/config.js";
import {ref,getDownloadURL,uploadBytes} from "firebase/storage"
import {doc, updateDoc, collection, addDoc, orderBy, getDocs, serverTimestamp, query} from "firebase/firestore"
import {AuthContext} from "../context/auth.jsx";


function UseFileStore() {
    const [files, setFiles] = useState([]);
    const [pending,setPending] = useState(false)
    const {currentUser} = useContext(AuthContext)

const uploadFile = async (file) =>{
    if (file) {
        const storageRef = ref(storage, `/images/${currentUser.uid}/${file.name}`);
        const postRef = collection(db, `users/${currentUser.uid}/posts`);

        const { id: newDocId } = await addDoc(postRef, { name: file.name });
        await uploadBytes(storageRef, file);
        const downloadUrl = await getDownloadURL(storageRef);
        const newPost = {
            imageUrl: downloadUrl,
            name: file.name,
            createdAt: serverTimestamp(),
            uuid:newDocId
        };

        await updateDoc(doc(postRef, newDocId), newPost);
    }
}

const fetchCurrentUserFiles = async () => {
    const postsRef = query(collection(db,`/users/${currentUser.uid}/posts`),orderBy("createdAt","desc"))
    const querySnapshot = await getDocs(postsRef)
    const posts = querySnapshot.docs.map((post) => (post.data()))
   return posts;
    }

    const userUploadProfilePhoto = async (file) =>{
        if(file){
            const storageRef = ref(storage, `/images/${currentUser.uid}/profile_photo/${file.name}`);
           const usersRef = collection(db,`/users`)
             const docRef = doc(usersRef,`${currentUser.uid}`)
            await  uploadBytes(storageRef,file)
            const fileRef = await getDownloadURL(storageRef);
            await updateDoc(docRef,{
                picture_photo:fileRef,
            })
            return fileRef;
        }


    }

return {files,pending,uploadFile,fetchCurrentUserFiles,userUploadProfilePhoto}
}

export default UseFileStore;
