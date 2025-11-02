import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { listenToTransaction } from "./useFirestoreTransactions";
import { setCoinMinerFromFirestore } from "../redux/features/coinMiner/coinMinerSlice";

const useCoinMinerListener = (uid, fieldName) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!uid) return;

    const unsubscribe = listenToTransaction(uid, fieldName, (coinMiners) => {
      dispatch(setCoinMinerFromFirestore(coinMiners));
    });

    return () => unsubscribe();
  }, [uid, dispatch, fieldName]);
};

export default useCoinMinerListener;
