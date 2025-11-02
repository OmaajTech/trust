import { createSlice } from "@reduxjs/toolkit";
import {
  addToFiresStoreUserId,
  deleteInUserFirestore,
} from "../thunk/thunkSlice";

const initialState = {
  coinMiners: [],
  loading: true,
  error: null,
};

const coinMinerSlice = createSlice({
  name: "coinMiner",
  initialState,
  reducers: {
    setCoinMinerFromFirestore: (state, action) => {
      state.coinMiners = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add miner
      .addCase(addToFiresStoreUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToFiresStoreUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.coinMiners.push(action.payload);
      })
      .addCase(addToFiresStoreUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete miner
      .addCase(deleteInUserFirestore.fulfilled, (state, action) => {
        const id = action.payload;
        const deleteDetails = state.coinMiners.filter((m) => m.id !== id);

        state.coinMiners = deleteDetails;
      });
  },
});

export const selectedCoinMiner = (state) => state.coinMiner.coinMiners;
export const selectedCoinMinerLoading = (state) => state.coinMiner.loading;
export const { setCoinMinerFromFirestore } = coinMinerSlice.actions;
export default coinMinerSlice.reducer;
