import { getDocs, query, where } from "firebase/firestore"

import { colRef } from "../firebase/config.js"

const checkIfUserExists = async (email) => {
  const q = await query(colRef, where("email", "==", email))
  const querySnapshot = await getDocs(q)
  return querySnapshot.empty
}

export default checkIfUserExists
