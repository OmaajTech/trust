import { useCallback, useContext } from "react";
import { CgClose } from "react-icons/cg";
import useFilterSearched from "../../../../../hooks/useFilterSearched";
import SearchBar from "../../../../../reuseableCom/searchBar/SearchBar";
import YouPayCard from "./YouPayCard";
import { useDispatch } from "react-redux";
import Scrollbar from "../../../../../reuseableCom/scrollbar/Scrollbar";
import { CoinsContext } from "../../../../../context/coins/CoinsContext";
import useLazyLoading from "../../../../../hooks/useLazyLoading";
import BasicLoader from "../../../../../reuseableCom/loading/BasicLoader";

const YouPay = ({
  thePay,
  handleSelectedItems,
  searchedPay,
  setSearchedPay,
  name,
}) => {
  const { loading } = useContext(CoinsContext);
  const { filterCoins } = useFilterSearched(searchedPay);
  const dispatch = useDispatch();
  const { showLoading } = useLazyLoading(loading);

  const filteredSelectedCoins = useCallback(
    (id) => {
      handleSelectedItems(id);
      dispatch(thePay(false));
    },
    [handleSelectedItems, dispatch, thePay]
  );

  const handleSearchedPay = (val) => {
    dispatch(setSearchedPay(val));
  };

  return (
    <div className="bg-white p-4 rounded-3xl  customMiniTablet:w-[600px] w-full">
      <div className="mb-4 allFlex">
        <p></p>
        <p className="text-lg font-semibold tracking-wide">{name}</p>
        <p
          className="text-2xl text-opacity-75 cursor-pointer text-customGray-200"
          onClick={() => dispatch(thePay(false))}
        >
          <CgClose />
        </p>
      </div>
      <div className="mb-3">
        <SearchBar
          searchedCoin={searchedPay}
          setSearchedCoin={handleSearchedPay}
          placeholder="Searched crypto"
        />
      </div>
      {showLoading ? (
        <BasicLoader />
      ) : (
        <Scrollbar maxSize="320px">
          <div className="pt-1 pr-2 space-y-5">
            {filterCoins && filterCoins?.length > 0 ? (
              filterCoins?.map((coin) => (
                <YouPayCard
                  key={coin.id}
                  coin={coin}
                  handleSelectedItems={filteredSelectedCoins}
                />
              ))
            ) : (
              <p className="relative text-sm font-bold text-center break-words transform -translate-y-1/2 top-1/2 mx">
                No results, check for typo or search for another token.
              </p>
            )}
          </div>
        </Scrollbar>
      )}
    </div>
  );
};

export default YouPay;
