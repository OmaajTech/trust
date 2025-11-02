import { useContext, useMemo, useState } from "react";
import HeaderBack from "../../reuseableCom/headerBack/HeaderBack";
import useFilterSearched from "../../hooks/useFilterSearched";
import SearchBar from "../../reuseableCom/searchBar/SearchBar";
import { CoinsContext } from "../../context/coins/CoinsContext";
import useLazyLoading from "../../hooks/useLazyLoading";
import TrendingComCard from "./TrendingComCard";
import Scrollbar from "../../reuseableCom/scrollbar/Scrollbar";
import BasicLoader from "../../reuseableCom/loading/BasicLoader";

const TrendingCom = () => {
  const [trendingSearched, setTrendingSearched] = useState("");
  const { loading } = useContext(CoinsContext);
  const { showLoading } = useLazyLoading(loading);
  const { filterCoins } = useFilterSearched(trendingSearched);

  const sortFilter = useMemo(() => {
    return filterCoins?.sort((a, b) => a.cmc_rank - b.cmc_rank);
  }, [filterCoins]);

  return (
    <>
      <div>
        <HeaderBack links="/" details="Trending" />
        <div>
          <SearchBar
            searchedCoin={trendingSearched}
            setSearchedCoin={setTrendingSearched}
            placeholder="Token name or contract address"
          />
        </div>
        {showLoading ? (
          <BasicLoader />
        ) : (
          <div className="w-full pb-3 mt-5 overflow-x-auto scrollbar-custom">
            <Scrollbar maxSize="200px">
              <div className="flex gap-5 mb-3 text-xs text-customGray-200 text-opacity-70">
                <h2 className="w-[161px] shrink-0">Token</h2>
                <h2 className="w-[172px] shrink-0 text-end">% Price change</h2>
                <h2 className="w-[146px] shrink-0 text-end">24H Volume</h2>
                <h2 className="w-[153px] shrink-0 text-end">Marketcap</h2>
              </div>
              <div className="space-y-1 w-max">
                {sortFilter && sortFilter.length > 0 ? (
                  sortFilter?.map((coin) => (
                    <TrendingComCard key={coin.id} coin={coin} />
                  ))
                ) : (
                  <p>No Token name or contract address found</p>
                )}
              </div>
            </Scrollbar>
          </div>
        )}
      </div>
    </>
  );
};

export default TrendingCom;
