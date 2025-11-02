import { useCallback, useContext } from "react";
import { CoinsContext } from "../../../../../context/coins/CoinsContext";
import ModalPayment from "../../../../../reuseableCom/modalPayment/ModalPayment";
import YouPay from "./YouPay";
import SwapFolder from "../../../../../reuseableCom/swapFolder/SwapFolder";
import useSelectedItems from "../../../../../hooks/useSelectedItems";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedSearchedGet,
  selectedSearchedPay,
  selectedSelectedCoins,
  selectedYouGet,
  selectedYouPay,
  setSearchedGet,
  setSearchedPay,
  setSelectedCoins,
  setYouGet,
  setYouPay,
} from "../../../../../redux/features/swapCoins/swapCoinSlice";
import useRandomCoinsSelected from "../../../../../hooks/useRandomCoinsSelected";
import { CgArrowsExchangeV } from "react-icons/cg";

const SwapCoins = ({ findCoinSlug }) => {
  const youPay = useSelector(selectedYouPay);
  const youGet = useSelector(selectedYouGet);
  const searchedPay = useSelector(selectedSearchedPay);
  const searchedGet = useSelector(selectedSearchedGet);
  const selectedCoins = useSelector(selectedSelectedCoins);
  const { coins, loading, error } = useContext(CoinsContext);
  const { selectedItems, handleSelectedItems, setselectedItems } =
    useSelectedItems(coins);
  const {
    selectedItems: selectedGet,
    handleSelectedItems: handleSelectGet,
    setselectedItems: setselectedItemsGet,
  } = useSelectedItems(coins);
  useRandomCoinsSelected(selectedCoins, setSelectedCoins);

  const dispatch = useDispatch();

  const handleSwap = () => {
    const fromCoin = selectedItems || selectedCoins;
    const toCoin = selectedGet || findCoinSlug;

    setselectedItems(toCoin);
    setselectedItemsGet(fromCoin);
  };

  const handleOpenPay = useCallback(() => {
    dispatch(setYouPay(true));
  }, [dispatch]);

  const handleOpenGet = useCallback(() => {
    dispatch(setYouGet(true));
  }, [dispatch]);

  return (
    <>
      <div className="w-full customMiniTablet:w-max">
        <div className="w-full space-y-4 customMiniTablet:w-max">
          <SwapFolder
            loading={loading}
            selectedCoin={selectedItems ? selectedItems : selectedCoins}
            thePay={handleOpenPay}
            inputs
            wallet
            error={error}
            name="From"
          />
          <div className="relative " onClick={handleSwap}>
            <p className="absolute text-4xl text-opacity-75 transform bg-white rounded-full cursor-pointer allFlex2 w-11 h-11 -translate-x-2/4 left-1/2 -translate-y-2/4 -top-2 text-customGray-200 hover:text-customBlue-100">
              <CgArrowsExchangeV />
            </p>
          </div>
          <SwapFolder
            loading={loading}
            selectedCoin={selectedGet ? selectedGet : findCoinSlug}
            thePay={handleOpenGet}
            wallet
            error={error}
            name="To"
          />
        </div>
        <button className="w-full bg-customPurple-100 h-[52px] rounded-full bg-opacity-40 mt-7 text-white font-semibold cursor-not-allowed">
          Swap
        </button>
      </div>
      {youPay && (
        <ModalPayment allYou={youPay} setAllYou={setYouPay}>
          <YouPay
            thePay={setYouPay}
            handleSelectedItems={handleSelectedItems}
            searchedPay={searchedPay}
            setSearchedPay={setSearchedPay}
            name="You pay"
          />
        </ModalPayment>
      )}
      {youGet && (
        <ModalPayment allYou={youGet} setAllYou={setYouGet}>
          <YouPay
            thePay={setYouGet}
            handleSelectedItems={handleSelectGet}
            searchedPay={searchedGet}
            setSearchedPay={setSearchedGet}
            name="You get"
          />
        </ModalPayment>
      )}
    </>
  );
};

export default SwapCoins;
