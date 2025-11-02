import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CoinsContext } from "../../../../context/coins/CoinsContext";
import BuyFolder from "./BuyFolder";

const BuyCoinCom = () => {
  const { coinslug } = useParams();
  const { coins } = useContext(CoinsContext);

  const findCoinSlug = coins?.find((coin) => coin.slug === coinslug);
  return (
    <>
      <BuyFolder findCoinSlug={findCoinSlug} />
    </>
  );
};

export default BuyCoinCom;
