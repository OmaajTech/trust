import { useSelector } from "react-redux";
import {
  selectedSelectedUpBuyCoin,
  setSelectedUpBuyCoin,
} from "../../../../redux/features/swapCoins/swapCoinSlice";
import useRandomCoinsSelected from "../../../../hooks/useRandomCoinsSelected";
import BuyFolder from "./BuyFolder";

const BuyCom = () => {
  const selectedUpBuyCoin = useSelector(selectedSelectedUpBuyCoin);
  useRandomCoinsSelected(selectedUpBuyCoin, setSelectedUpBuyCoin);

  return (
    <>
      <BuyFolder findCoinSlug={selectedUpBuyCoin} />
    </>
  );
};

export default BuyCom;
