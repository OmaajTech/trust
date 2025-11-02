import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CoinsContext } from "../../../../context/coins/CoinsContext";
import SellCoinFolder from "./SellCoinFolder";

const SellCoinCom = () => {
  const { coinslug } = useParams();
  const { coins } = useContext(CoinsContext);

  const findCoinSlug = coins?.find((coin) => coin.slug === coinslug);

  return (
    <>
      <SellCoinFolder findCoinSlug={findCoinSlug} />
    </>
  );
};

export default SellCoinCom;
