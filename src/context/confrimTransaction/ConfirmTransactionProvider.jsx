import useLocalStorage from "../../hooks/useLocalStorage";
import { ConfirmTransactionContext } from "./ConfirmTransactionContext";

const ConfirmTransactionProvider = ({ children }) => {
  const { saveValue, setSaveValue } = useLocalStorage(
    "confirm-transaction",
    {}
  );

  const clearConfirmTransaction = () => {
    localStorage.removeItem("confirm-transaction");
  };

  return (
    <ConfirmTransactionContext.Provider
      value={{ setSaveValue, saveValue, clearConfirmTransaction }}
    >
      {children}
    </ConfirmTransactionContext.Provider>
  );
};

export default ConfirmTransactionProvider;
