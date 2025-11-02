import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserTransactionRef } from "../../../hooks/useFirestoreTransactions";
import { addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

export const addToFiresStoreUserId = createAsyncThunk(
  "firestore/addToFiresStoreUserId",
  async ({ uid, fieldName, newState }, { rejectWithValue }) => {
    try {
      const responseRef = getUserTransactionRef(uid, fieldName);
      const response = await addDoc(responseRef, newState);
      return { id: response.id, ...newState, fieldName };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteInUserFirestore = createAsyncThunk(
  "firestore/deleteInUserFirestore",
  async ({ uid, fieldName, id }, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "users", uid, fieldName, id);
      await deleteDoc(docRef);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
