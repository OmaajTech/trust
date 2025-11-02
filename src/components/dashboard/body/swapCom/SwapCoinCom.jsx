import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CoinsContext } from "../../../../context/coins/CoinsContext";
import SwapMachine from "./SwapMachine";
import TrustBodyLogo from "../../../../reuseableCom/trustBodyLogo/TrustBodyLogo";

const SwapCoinCom = () => {
  const { coinslug } = useParams();
  const { coins } = useContext(CoinsContext);

  const findCoinSlug = coins?.find((coin) => coin.slug === coinslug);

  return (
    <>
      <TrustBodyLogo>
        <SwapMachine findCoinSlug={findCoinSlug} />
      </TrustBodyLogo>
    </>
  );
};

export default SwapCoinCom;
