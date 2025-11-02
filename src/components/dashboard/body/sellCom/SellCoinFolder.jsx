import { useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedSearchedSellCoin,
  selectedSellCoins,
  setSearchedSellCoin,
  setSellCoin,
} from "../../../../redux/features/swapCoins/swapCoinSlice";
import { CoinsContext } from "../../../../context/coins/CoinsContext";
import useSelectedItems from "../../../../hooks/useSelectedItems";
import TrustBodyLogo from "../../../../reuseableCom/trustBodyLogo/TrustBodyLogo";
import CoinsMachine from "../../../../reuseableCom/coinsMachine/CoinsMachine";

const SellCoinFolder = ({ findCoinSlug }) => {
  const sellCoin = useSelector(selectedSellCoins);
  const searchedSellCoin = useSelector(selectedSearchedSellCoin);
  const { coins, loading, error } = useContext(CoinsContext);
  const { selectedItems, handleSelectedItems } = useSelectedItems(coins);
  const dispatch = useDispatch();

  const handleOpenCoins = useCallback(() => {
    dispatch(setSellCoin(true));
  }, [dispatch]);

  return (
    <>
      <TrustBodyLogo>
        <CoinsMachine
          findCoinSlug={findCoinSlug}
          searchedSellCoin={searchedSellCoin}
          selectedItems={selectedItems}
          sellCoin={sellCoin}
          loading={loading}
          error={error}
          handleOpenCoins={handleOpenCoins}
          handleSelectedItems={handleSelectedItems}
          heaerName="Sell"
          setSearchedSellCoin={setSearchedSellCoin}
          setSellCoin={setSellCoin}
          action="sell"
        />
      </TrustBodyLogo>
    </>
  );
};

export default SellCoinFolder;
