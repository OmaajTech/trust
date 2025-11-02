import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  youPay: false,
  youGet: false,
  sellCoin: false,
  buyCoin: false,
  isOverPaid: false,
  adminCoin: false,
  searchedPay: "",
  searchedGet: "",
  searchedSellCoin: "",
  searchedBuyCoin: "",
  searchedAdminCoin: "",
  selectedCoins: null,
  selectedDownSwapCoin: null,
  selectedUpSellCoin: null,
  selectedUpBuyCoin: null,
};

const swapCoinSlice = createSlice({
  name: "swapCoins",
  initialState,
  reducers: {
    setYouPay: (state, action) => {
      state.youPay = action.payload;
    },
    setYouGet: (state, action) => {
      state.youGet = action.payload;
    },
    setSellCoin: (state, action) => {
      state.sellCoin = action.payload;
    },
    setBuyCoin: (state, action) => {
      state.buyCoin = action.payload;
    },
    setIsOverPaid: (state, action) => {
      state.isOverPaid = action.payload;
    },
    setAdminCoin: (state, action) => {
      state.adminCoin = action.payload;
    },
    setSearchedPay: (state, action) => {
      state.searchedPay = action.payload;
    },
    setSearchedGet: (state, action) => {
      state.searchedGet = action.payload;
    },
    setSearchedSellCoin: (state, action) => {
      state.searchedSellCoin = action.payload;
    },
    setSearchedBuyCoin: (state, action) => {
      state.searchedBuyCoin = action.payload;
    },
    setSearchedAdminCoin: (state, action) => {
      state.searchedAdminCoin = action.payload;
    },
    setSelectedCoins: (state, action) => {
      state.selectedCoins = action.payload;
    },
    setSelectedDownSwapCoin: (state, action) => {
      state.selectedDownSwapCoin = action.payload;
    },
    setSelectedUpSellCoin: (state, action) => {
      state.selectedUpSellCoin = action.payload;
    },
    setSelectedUpBuyCoin: (state, action) => {
      state.selectedUpBuyCoin = action.payload;
    },
  },
});

export const selectedYouPay = (state) => state.swapCoins.youPay;
export const selectedYouGet = (state) => state.swapCoins.youGet;
export const selectedSearchedPay = (state) => state.swapCoins.searchedPay;
export const selectedSearchedGet = (state) => state.swapCoins.searchedGet;
export const selectedSelectedCoins = (state) => state.swapCoins.selectedCoins;
export const selectedSellCoins = (state) => state.swapCoins.sellCoin;
export const selectedIsOverPaid = (state) => state.swapCoins.isOverPaid;
export const selectedAdminCoin = (state) => state.swapCoins.adminCoin;
export const selectedSelectedUpBuyCoin = (state) =>
  state.swapCoins.selectedUpBuyCoin;
export const selectedSelectedUpSellCoin = (state) =>
  state.swapCoins.selectedUpSellCoin;
export const selectedSelectedDownSwapCoin = (state) =>
  state.swapCoins.selectedDownSwapCoin;
export const selectedSearchedSellCoin = (state) =>
  state.swapCoins.searchedSellCoin;
export const selectedSearchedAdminCoin = (state) =>
  state.swapCoins.searchedAdminCoin;
export const selectedBuyCoins = (state) => state.swapCoins.buyCoin;
export const selectedSearchedBuyCoin = (state) =>
  state.swapCoins.searchedBuyCoin;
export const {
  setYouPay,
  setYouGet,
  setSearchedGet,
  setSearchedPay,
  setSelectedCoins,
  setSellCoin,
  setSearchedSellCoin,
  setBuyCoin,
  setSearchedBuyCoin,
  setSelectedDownSwapCoin,
  setSelectedUpSellCoin,
  setSelectedUpBuyCoin,
  setIsOverPaid,
  setAdminCoin,
  setSearchedAdminCoin,
} = swapCoinSlice.actions;
export default swapCoinSlice.reducer;
