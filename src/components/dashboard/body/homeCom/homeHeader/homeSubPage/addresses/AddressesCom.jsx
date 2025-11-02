import HeaderBack from "../../../../../../../reuseableCom/headerBack/HeaderBack";
import SearchBar from "../../../../../../../reuseableCom/searchBar/SearchBar";
import { useContext, useState } from "react";
import { CoinsContext } from "../../../../../../../context/coins/CoinsContext";
import AddressessComCard from "./AddressessComCard";
import useFilterSearched from "../../../../../../../hooks/useFilterSearched";
import Scrollbar from "../../../../../../../reuseableCom/scrollbar/Scrollbar";
import useLazyLoading from "../../../../../../../hooks/useLazyLoading";
import BasicLoader from "../../../../../../../reuseableCom/loading/BasicLoader";

const AddressesCom = () => {
  const { loading, error } = useContext(CoinsContext);
  const [searchedBlockChain, setSearchedBlockChain] = useState("");
  const { filterCoins } = useFilterSearched(searchedBlockChain);
  const { showLoading } = useLazyLoading(loading);

  return (
    <div className="px-5 py-4">
      <div className="mb-5">
        <HeaderBack details="Your addresses" links="/" />
        <SearchBar
          placeholder="Blockchain name or chain id"
          searchedCoin={searchedBlockChain}
          setSearchedCoin={setSearchedBlockChain}
        />
      </div>
      <Scrollbar maxSize="136px">
        <div className="space-y-3.5 pr-3">
          {showLoading ? (
            <BasicLoader />
          ) : filterCoins && filterCoins.length > 0 ? (
            filterCoins?.map((coin) => (
              <AddressessComCard key={coin.id} coin={coin} />
            ))
          ) : (
            <p>Blockchain name or chain id Not Found</p>
          )}
          {error && <p>{error}</p>}
        </div>
      </Scrollbar>
    </div>
  );
};

export default AddressesCom;
