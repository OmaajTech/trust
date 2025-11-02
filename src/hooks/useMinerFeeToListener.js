import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { listenToTransaction } from "./useFirestoreTransactions";
import { setListeniningToMinerFee } from "../redux/features/minerFee/minerFeeSlice";

const useMinerFeeToListener = (uid, fieldName) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!uid) return;

    const unsubscribe = listenToTransaction(uid, fieldName, (mainFee) => {
      dispatch(setListeniningToMinerFee(mainFee));
    });

    return () => unsubscribe();
  }, [uid, dispatch, fieldName]);
};

export default useMinerFeeToListener;
