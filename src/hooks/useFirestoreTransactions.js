import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// Get the transactions collection reference for a user
export const getUserTransactionRef = (uid, fieldName) =>
  collection(db, "users", uid, fieldName);

// add To FireStore
export const addTransactionToFirestore = async (
  uid,
  transactionData,
  fieldName
) => {
  const transactionRef = getUserTransactionRef(uid, fieldName);
  await addDoc(transactionRef, transactionData);
};

export const updateTransactionInFirestore = async (uid, id, newstatus) => {
  const transactionDoc = doc(db, "users", uid, "transactions", id);
  await updateDoc(transactionDoc, { status: newstatus });
};

export const listenToTransaction = (uid, fieldName, callback) => {
  const transactionRef = getUserTransactionRef(uid, fieldName);
  return onSnapshot(transactionRef, (snapShot) => {
    const transactions = snapShot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    callback(transactions);
  });
};
