import { useContext, useEffect, useMemo, useState } from "react";
import { CoinsContext } from "../../../../../context/coins/CoinsContext";
import useFilterSearched from "../../../../../hooks/useFilterSearched";
import SearchBar from "../../../../../reuseableCom/searchBar/SearchBar";
import CryptoCards from "../../../../../reuseableCom/crypto/CryptoCards";
import Scrollbar from "../../../../../reuseableCom/scrollbar/Scrollbar";
import useLazyLoading from "../../../../../hooks/useLazyLoading";
import BasicLoader from "../../../../../reuseableCom/loading/BasicLoader";

const EarnCoinCom = ({ setMiningSearched, miningSearched }) => {
  const { loading, error } = useContext(CoinsContext);
  const { filterCoins } = useFilterSearched(miningSearched);
  const { showLoading } = useLazyLoading(loading);

  const displayed = useMemo(() => {
    return filterCoins && filterCoins?.length > 0 ? (
      filterCoins
        ?.slice()
        .sort((a, b) => b.availableBalance - a.availableBalance)
        .map((coin) => <CryptoCards key={coin.id} coin={coin} path="earn" />)
    ) : (
      <p>No Results</p>
    );
  }, [filterCoins]);

  return (
    <div>
      <div className="mb-5">
        <SearchBar
          searchedCoin={miningSearched}
          setSearchedCoin={setMiningSearched}
          placeholder="Token name or contract address"
        />
      </div>
      <Scrollbar maxSize="200px">
        <div className="pr-3 space-y-5">
          {showLoading ? <BasicLoader /> : displayed}
          {error && <p>{error}</p>}
        </div>
      </Scrollbar>
    </div>
  );
};

export default EarnCoinCom;
