import { combineReducers, configureStore } from "@reduxjs/toolkit";
import coinsReducer from "../features/coins/coinSlice";
import swapCoinsReducer from "../features/swapCoins/swapCoinSlice";
import transactionReducer from "../features/transactions/transactionSlice";
import minerFeeReducer from "../features/minerFee/minerFeeSlice";
import coinMinerReducer from "../features/coinMiner/coinMinerSlice";
import authReducer from "../features/auth/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  coin: coinsReducer,
  swapCoins: swapCoinsReducer,
  transaction: transactionReducer,
  minerFee: minerFeeReducer,
  coinMiner: coinMinerReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
