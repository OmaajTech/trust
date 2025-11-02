import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToFiresStoreUserId } from "../thunk/thunkSlice";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

const initialState = {
  transactions: [],
  totalPrice: 0,
  loading: true,
  error: null,
};

export const editInFireStore = createAsyncThunk(
  "transactions/editInFireStore",
  async ({ uid, id, updatedMiner }, { rejectWithValue }) => {
    try {
      const minerDocRef = doc(db, "users", uid, "transactions", id);
      await updateDoc(minerDocRef, updatedMiner);
      return { id, updatedMiner };
    } catch (error) {
      console.error("Error updating miner:", error);
      return rejectWithValue(error.message);
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactionsFromFirestore: (state, action) => {
      state.transactions = action.payload;
      state.loading = false;
      state.totalPrice = state.transactions.reduce((acc, transac) => {
        if (transac.status === "Completed") {
          if (transac.type === "Receive") {
            return acc + transac.totalAmount;
          } else if (transac.type === "Send") {
            return acc - transac.totalAmount;
          }
        }
        return acc;
      }, 0);
    },

    getAllTransactionPrice: (state) => {
      state.totalPrice = state.transactions.reduce((acc, transac) => {
        if (transac.status === "Completed") {
          if (transac.type === "Receive") {
            return acc + transac.totalAmount;
          } else if (transac.type === "Send") {
            return acc - transac.totalAmount;
          }
        }
        return acc;
      }, 0);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToFiresStoreUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToFiresStoreUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload.status === "Completed") {
          if (action.payload.type === "Receive") {
            state.totalPrice += action.payload.totalAmount;
          } else if (action.payload.type === "Send") {
            state.totalPrice -= action.payload.totalAmount;
          }
        }
      })
      .addCase(addToFiresStoreUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.totalPrice = 0;
        state.transactions = [];
      })
      .addCase(editInFireStore.fulfilled, (state, action) => {
        const { id, updatedMiner } = action.payload;
        const existingStatus = state.transactions.find(
          (transac) => transac.id === id
        );

        if (existingStatus && existingStatus.status !== updatedMiner.status) {
          existingStatus.status = updatedMiner.status;

          state.totalPrice = state.transactions.reduce((acc, transac) => {
            if (transac.status === "Completed") {
              if (transac.type === "Receive") {
                return acc + transac.totalAmount;
              } else if (transac.type === "Send") {
                return acc - transac.totalAmount;
              }
            }
            return acc;
          }, 0);
        }
      });
  },
});

export const selectedTransactions = (state) => state.transaction.transactions;
export const selectedTotalPrice = (state) => state.transaction.totalPrice;
export const selectedTransactionLoading = (state) => state.transaction.loading;
export const { getAllTransactionPrice, setTransactionsFromFirestore } =
  transactionSlice.actions;
export default transactionSlice.reducer;
