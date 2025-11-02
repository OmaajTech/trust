import { useContext } from "react";
import { CoinsContext } from "../../context/coins/CoinsContext";
import useFilterSearched from "../../hooks/useFilterSearched";
import SearchBar from "../searchBar/SearchBar";
import HeaderBack from "../headerBack/HeaderBack";
import CryptoCards from "../crypto/CryptoCards";
import Scrollbar from "../scrollbar/Scrollbar";
import useLazyLoading from "../../hooks/useLazyLoading";
import SkelentonCard from "../loading/SkelentonCard";
import BasicLoader from "../loading/BasicLoader";
import FullLoader from "../loading/FullLoader";

const MultipleCoinFolder = ({ searchedSend, setSearchedSend, name }) => {
  const { loading, error } = useContext(CoinsContext);
  const { filterCoins } = useFilterSearched(searchedSend);
  const { showLoading } = useLazyLoading(loading);

  const details = `Select asset to ${name}`;

  return (
    <div>
      <HeaderBack back details={details} />
      <div className="mb-6">
        <SearchBar
          searchedCoin={searchedSend}
          setSearchedCoin={setSearchedSend}
          placeholder="Token name or contract address"
        />
      </div>
      <Scrollbar maxSize="124px">
        <div className="pr-3 space-y-5">
          {showLoading ? (
            <BasicLoader />
          ) : (
            <>
              {filterCoins && filterCoins?.length > 0 ? (
                filterCoins
                  ?.slice()
                  .sort((a, b) => b.availableBalance - a.availableBalance)
                  .map((coin) => (
                    <CryptoCards key={coin.id} coin={coin} path={name} />
                  ))
              ) : (
                <p>No Results</p>
              )}
            </>
          )}
          {error && <p>{error}</p>}
        </div>
      </Scrollbar>
    </div>
  );
};

export default MultipleCoinFolder;
