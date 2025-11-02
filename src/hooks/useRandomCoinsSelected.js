import { useContext, useEffect } from "react";
import { CoinsContext } from "../context/coins/CoinsContext";
import { useDispatch } from "react-redux";

const useRandomCoinsSelected = (initialValue, setInitialValue) => {
  const { coins } = useContext(CoinsContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (coins?.length && !initialValue) {
      const randomIndex = Math.floor(Math.random() * coins?.length);
      dispatch(setInitialValue(coins[randomIndex]));
    }
  }, [coins, initialValue, dispatch, setInitialValue]);
};

export default useRandomCoinsSelected;
