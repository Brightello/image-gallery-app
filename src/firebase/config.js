// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'




// Your web app's Firebase configuration
const app = firebase.initializeApp({
    apiKey: "AIzaSyBmIIEQp9Y5O_jI_ZQq2MD4hO1HLqD1Cbg",
    authDomain: "image-gallery-react-e904d.firebaseapp.com",
    projectId: "image-gallery-react-e904d",
    storageBucket: "image-gallery-react-e904d.appspot.com",
    messagingSenderId: "139078007731",
    appId: "1:139078007731:web:d0f098e7cf22b0c96ea9c6"
    // apiKey: import.meta.env.REACT_APP_FIREBASE_KEY,
    // authDomain: import.meta.env.REACT_APP_FIREBASE_DOMAIN,
    // projectId: import.meta.env.REACT_APP_FIREBASE_PROJECT_ID,
    // storageBucket: import.meta.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: import.meta.env.REACT_APP_FIREBASE_SENDER_ID,
    // appId: import.meta.env.REACT_APP_FIREBASE_APP_ID
});
 const auth = getAuth(app)
 const db = getFirestore(app);
 export {
     auth,
     db
 }

export default app;

