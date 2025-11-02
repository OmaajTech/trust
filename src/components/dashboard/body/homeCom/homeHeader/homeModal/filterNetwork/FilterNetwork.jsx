import { useState } from "react";
import SearchBar from "../../../../../../../reuseableCom/searchBar/SearchBar";
import FilterNetworkCard from "./FilterNetworkCard";
import clsx from "clsx";
import { RiGlobalFill } from "react-icons/ri";
import useFilterSearched from "../../../../../../../hooks/useFilterSearched";
import useLazyLoading from "../../../../../../../hooks/useLazyLoading";
import BasicLoader from "../../../../../../../reuseableCom/loading/BasicLoader";

const FilterNetwork = ({
  loading,
  handleAllCoins,
  selectedItems,
  handleSelectedItems,
  error,
  setModal,
}) => {
  const [searchedNetwork, setSearchedNetwork] = useState("");
  const { filterCoins } = useFilterSearched(searchedNetwork);
  const { showLoading } = useLazyLoading(loading);

  const handleACoins = () => {
    handleAllCoins();
    setModal(false);
  };
  const handleSelectedItemsId = (id) => {
    handleSelectedItems(id);
    setModal(false);
  };

  return (
    <div className="p-2">
      <div className="mx-3 mb-2">
        <SearchBar
          setSearchedCoin={setSearchedNetwork}
          searchedCoin={searchedNetwork}
          placeholder="Network Name"
        />
      </div>
      {showLoading ? (
        <BasicLoader />
      ) : (
        <>
          <div
            className="py-1.5 px-4 cursor-pointer hover:bg-customGray-200 hover:bg-opacity-10 hover:rounded-xl transist"
            onClick={handleACoins}
          >
            <div className="allFlex">
              <div className="flex items-center gap-2">
                <p className="text-2xl">
                  <RiGlobalFill />
                </p>
                <h2 className="text-sm font-semibold">All Networks</h2>
              </div>
              <div
                className={clsx(
                  " border-[2.5px] h-5 w-5 rounded-full allFlex2",
                  !selectedItems
                    ? "border-customBlue-100"
                    : "border-customGray-200 border-opacity-25"
                )}
              >
                {!selectedItems && (
                  <p
                    className={clsx(
                      "w-2.5 h-2.5 rounded-full bg-customBlue-100"
                    )}
                  ></p>
                )}
                <p></p>
              </div>
            </div>
          </div>
          {filterCoins && filterCoins.length > 0 ? (
            filterCoins.map((filllte) => (
              <FilterNetworkCard
                key={filllte.id}
                coin={filllte}
                handleSelectedIndex={handleSelectedItemsId}
                selectedItems={selectedItems}
              />
            ))
          ) : (
            <p className="px-4 py-1 text-sm font-semibold text-center">
              Network Name Not Found
            </p>
          )}
        </>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default FilterNetwork;
