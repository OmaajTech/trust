import { useContext, useMemo } from "react";
import HeaderBack from "../../../../../../../reuseableCom/headerBack/HeaderBack";
import { CoinsContext } from "../../../../../../../context/coins/CoinsContext";
import SearchBar from "../../../../../../../reuseableCom/searchBar/SearchBar";
import ManageCryptoCard from "./ManageCryptoCard";
import { ActiveContext } from "../../../../../../../context/activeCoins/ActiveContext";
import Scrollbar from "../../../../../../../reuseableCom/scrollbar/Scrollbar";
import useLazyLoading from "../../../../../../../hooks/useLazyLoading";
import BasicLoader from "../../../../../../../reuseableCom/loading/BasicLoader";

const ManageCryCom = () => {
  const {
    setSearchedManagedCoins,
    handleToggleId,
    filterCoins,
    searchedManagedCoins,
    saveValue,
    loading: coinLoading,
  } = useContext(ActiveContext);
  const { loading, error } = useContext(CoinsContext);
  const { showLoading } = useLazyLoading(loading);

  const sortByActive = useMemo(() => {
    return filterCoins?.slice().sort((a, b) => {
      const aActive = saveValue[a.id];
      const bActive = saveValue[b.id];

      return bActive - aActive || a.name.localeCompare(b.name);
    });
  }, [filterCoins, saveValue]);

  return (
    <div>
      <HeaderBack links="/" details="Search" />
      <div className="mb-5">
        <SearchBar
          searchedCoin={searchedManagedCoins}
          setSearchedCoin={setSearchedManagedCoins}
          placeholder="Token name or contract address"
        />
      </div>
      <Scrollbar maxSize="120px">
        <div className="pb-2 pr-2 space-y-5">
          {showLoading ? (
            <BasicLoader />
          ) : sortByActive && sortByActive.length > 0 ? (
            sortByActive.map((coin) => (
              <ManageCryptoCard
                key={coin.id}
                coin={coin}
                handleActiveCoins={handleToggleId}
                saveValue={saveValue}
                loading={coinLoading}
              />
            ))
          ) : (
            <p>No Results</p>
          )}
        </div>
      </Scrollbar>
      {error && <p>{error}</p>}
    </div>
  );
};

export default ManageCryCom;
