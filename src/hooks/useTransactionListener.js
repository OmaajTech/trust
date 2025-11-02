import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { listenToTransaction } from "./useFirestoreTransactions";
import { setTransactionsFromFirestore } from "../redux/features/transactions/transactionSlice";

const useTransactionListener = (uid, fieldName) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!uid) return;

    const unsubscribe = listenToTransaction(uid, fieldName, (transaction) => {
      dispatch(setTransactionsFromFirestore(transaction));
    });

    return () => unsubscribe();
  }, [uid, dispatch, fieldName]);
};

export default useTransactionListener;
