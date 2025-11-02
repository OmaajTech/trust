import { useDispatch, useSelector } from "react-redux";
import {
  selectedBuyCoins,
  selectedSearchedBuyCoin,
  setBuyCoin,
  setSearchedBuyCoin,
} from "../../../../redux/features/swapCoins/swapCoinSlice";
import { CoinsContext } from "../../../../context/coins/CoinsContext";
import { useCallback, useContext } from "react";
import useSelectedItems from "../../../../hooks/useSelectedItems";
import TrustBodyLogo from "../../../../reuseableCom/trustBodyLogo/TrustBodyLogo";
import CoinsMachine from "../../../../reuseableCom/coinsMachine/CoinsMachine";

const BuyFolder = ({ findCoinSlug }) => {
  const buyCoin = useSelector(selectedBuyCoins);
  const searchedBuyCoin = useSelector(selectedSearchedBuyCoin);
  const { coins, loading, error } = useContext(CoinsContext);
  const { selectedItems, handleSelectedItems } = useSelectedItems(coins);
  const dispatch = useDispatch();

  const handleOpenCoins = useCallback(() => {
    dispatch(setBuyCoin(true));
  }, [dispatch]);

  return (
    <>
      <TrustBodyLogo>
        <CoinsMachine
          findCoinSlug={findCoinSlug}
          searchedSellCoin={searchedBuyCoin}
          selectedItems={selectedItems}
          sellCoin={buyCoin}
          loading={loading}
          error={error}
          handleOpenCoins={handleOpenCoins}
          handleSelectedItems={handleSelectedItems}
          heaerName="Buy"
          setSearchedSellCoin={setSearchedBuyCoin}
          setSellCoin={setBuyCoin}
          action="buy"
          interChange
          currency="I want to spend"
        />
      </TrustBodyLogo>
    </>
  );
};

export default BuyFolder;
