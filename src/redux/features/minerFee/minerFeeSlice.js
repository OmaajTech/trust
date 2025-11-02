import { createSlice } from "@reduxjs/toolkit";
import {
  addToFiresStoreUserId,
  deleteInUserFirestore,
} from "../thunk/thunkSlice";

const initialState = {
  minerFees: [],
  loading: true,
  error: null,
};

export const minerFeeSlice = createSlice({
  name: "minerFee",
  initialState,
  reducers: {
    setListeniningToMinerFee: (state, action) => {
      state.minerFees = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToFiresStoreUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToFiresStoreUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.minerFees.push(action.payload);
        state.error = null;
      })
      .addCase(addToFiresStoreUserId.rejected, (state, action) => {
        state.loading = false;
        state.minerFees = [];
        state.error = action.payload;
      })
      .addCase(deleteInUserFirestore.fulfilled, (state, action) => {
        const id = action.payload;
        const deleteMiner = state.minerFees.filter((mine) => mine.id !== id);
        state.minerFees = deleteMiner;
      });
  },
});

export const selectedMinerFees = (state) => state.minerFee.minerFees;
export const { setListeniningToMinerFee } = minerFeeSlice.actions;
export default minerFeeSlice.reducer;
