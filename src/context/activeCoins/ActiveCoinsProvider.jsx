import { useMemo, useState } from "react";
import useFilterSearched from "../../hooks/useFilterSearched";
import { ActiveContext } from "./ActiveContext";
import useMultipleSelectedActiveId1 from "../../hooks/useMultipleSelectedActiveId1";

const ActiveCoinsProvider = ({ children }) => {
  const [searchedManagedCoins, setSearchedManagedCoins] = useState("");
  const { filterCoins } = useFilterSearched(searchedManagedCoins);
  const { saveValue, handleToggleId, loading } = useMultipleSelectedActiveId1(
    filterCoins,
    false,
    "activeCoins"
  );

  const allActiveCoins = useMemo(() => {
    return filterCoins?.filter((coin) => saveValue[coin.id]);
  }, [filterCoins, saveValue]);

  return (
    <ActiveContext.Provider
      value={{
        setSearchedManagedCoins,
        handleToggleId,
        filterCoins,
        allActiveCoins,
        saveValue,
        searchedManagedCoins,
        loading,
      }}
    >
      {children}
    </ActiveContext.Provider>
  );
};

export default ActiveCoinsProvider;
