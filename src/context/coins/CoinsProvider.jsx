import { useDispatch, useSelector } from "react-redux";
import {
  getAllCoins,
  selectedCoins,
  selectedCoinsError,
  selectedCoinsLoading,
} from "../../redux/features/coins/coinSlice";
import { useContext, useEffect } from "react";
import { CoinsContext } from "./CoinsContext";
import useSelectedItems from "../../hooks/useSelectedItems";
import { AuthContext } from "../auth/AuthContext";

const CoinsProvider = ({ children }) => {
  const { usersDetails } = useContext(AuthContext);
  const loading = useSelector(selectedCoinsLoading);
  const coins = useSelector(selectedCoins);
  const error = useSelector(selectedCoinsError);
  const { selectedItems, handleSelectedItems, resetToAllCoins } =
    useSelectedItems(coins);

  const handleAllCoins = () => {
    resetToAllCoins();
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (usersDetails?.uid) {
      dispatch(getAllCoins());
    }
  }, [usersDetails?.uid, dispatch]);

  return (
    <CoinsContext.Provider
      value={{
        loading,
        error,
        coins,
        selectedItems,
        handleSelectedItems,
        handleAllCoins,
      }}
    >
      {children}
    </CoinsContext.Provider>
  );
};

export default CoinsProvider;
