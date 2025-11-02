import { useContext, useMemo } from "react";
import { CoinsContext } from "../context/coins/CoinsContext";

const useFilterSearched = (initialValue) => {
  const { coins } = useContext(CoinsContext);

  const filterCoins = useMemo(() => {
    return coins
      ?.filter((coin) =>
        coin.name.toLowerCase().includes(initialValue.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [coins, initialValue]);

  return { filterCoins };
};

export default useFilterSearched;
