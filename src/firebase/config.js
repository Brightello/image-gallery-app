import * as firebase from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore,collection} from 'firebase/firestore'





// Firebase configuration
const app = firebase.initializeApp({
    apiKey: import.meta.env.VITE_APP_FIREBASE_KEY.replace(/[",]/gm,""),
    authDomain: import.meta.env.VITE_APP_FIREBASE_DOMAIN,
    projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_FIREBASE_SENDER_ID,
    appId: import.meta.env.VITE_APP_FIREBASE_APP_ID
});


//Authentication object
 const auth = getAuth(app)
//Database object
 const db = getFirestore(app);
 //reference to collection
const colRef = collection(db,"/users")

 export {
     auth,
     db,
     colRef,
 }

export default app;

