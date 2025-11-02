import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const adminUpdateField = async (uid, fieldName, value) => {
  try {
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, { [fieldName]: value });
  } catch (error) {
    console.error(error);
  }
};

export const deleteUserSubDoc = async (uid, subcollection, docId) => {
  try {
    const docRef = doc(db, "users", uid, subcollection, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(error);
  }
};
