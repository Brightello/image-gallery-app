import {colRef} from "../firebase/config.js"
import {query,where,getDocs} from "firebase/firestore";

const checkIfUserExists = async (email) =>{
    const q = await query(colRef,where("email","==",email))
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty
}

export default checkIfUserExists;