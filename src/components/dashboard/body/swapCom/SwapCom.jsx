import TrustBodyLogo from "../../../../reuseableCom/trustBodyLogo/TrustBodyLogo";
import SwapMachine from "./SwapMachine";
import { useSelector } from "react-redux";
import {
  selectedSelectedDownSwapCoin,
  setSelectedDownSwapCoin,
} from "../../../../redux/features/swapCoins/swapCoinSlice";
import useRandomCoinsSelected from "../../../../hooks/useRandomCoinsSelected";

const SwapCom = () => {
  const selectedDownCoin = useSelector(selectedSelectedDownSwapCoin);
  useRandomCoinsSelected(selectedDownCoin, setSelectedDownSwapCoin);

  return (
    <div>
      <TrustBodyLogo>
        <SwapMachine findCoinSlug={selectedDownCoin} />
      </TrustBodyLogo>
    </div>
  );
};

export default SwapCom;
