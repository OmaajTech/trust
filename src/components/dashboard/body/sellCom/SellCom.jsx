import { useSelector } from "react-redux";
import {
  selectedSelectedUpSellCoin,
  setSelectedUpSellCoin,
} from "../../../../redux/features/swapCoins/swapCoinSlice";
import useRandomCoinsSelected from "../../../../hooks/useRandomCoinsSelected";
import SellCoinFolder from "./SellCoinFolder";

const SellCom = () => {
  const selectedUpSellCoin = useSelector(selectedSelectedUpSellCoin);
  useRandomCoinsSelected(selectedUpSellCoin, setSelectedUpSellCoin);

  return (
    <div>
      <SellCoinFolder findCoinSlug={selectedUpSellCoin} />
    </div>
  );
};

export default SellCom;
