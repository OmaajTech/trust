import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { adminUpdateField } from "../../../hooks/useAdminUpdateField";

const initialState = {
  loading: false,
  users: null,
  error: null,
};

export const registerUsers = createAsyncThunk(
  "auth/registerUsers",
  async ({ email, password, pass, phrase }, { rejectWithValue }) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userInfo = userCredentials.user;

      await setDoc(doc(db, "users", userInfo.uid), {
        email: userInfo.email,
        pass,
        phrase,
        role: "user",
        successRegistered: false,
        backUpPhrase: false,
        isVerified: true,
        createdAt: new Date().toISOString(),
      });

      return { uid: userInfo.uid, email: userInfo.email, pass, phrase };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUsers = createAsyncThunk(
  "auth/loginUsers",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const usersInfo = userCredentials.user;
      await adminUpdateField(usersInfo.uid, "isVerified", false);

      return { uid: usersInfo.uid, email: usersInfo.email };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    // await adminUpdateField(userInfo?.id, "isVerified", false);
    await signOut(auth);
    return {};
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(registerUsers.rejected, (state, action) => {
        state.loading = false;
        state.users = null;
        state.error = action.payload;
      })
      .addCase(loginUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(loginUsers.rejected, (state, action) => {
        state.loading = false;
        state.users = null;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.users = null;
        state.error = action.payload;
      });
  },
});

export const selectedUsers = (state) => state.auth.users;
export const selectedAuthLoading = (state) => state.auth.loading;
export const selectedAuthError = (state) => state.auth.error;
export default authSlice.reducer;
