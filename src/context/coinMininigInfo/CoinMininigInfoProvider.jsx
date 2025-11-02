import { useContext, useRef } from "react";
import { CoinMininigInfoContext } from "./CoinMininigInfoContext";
import { CoinsContext } from "../coins/CoinsContext";
import useMultipleSelectedActiveId from "../../hooks/useMultipleSelectedActiveId";
import equal from "fast-deep-equal";
import useMultipleSelectedActiveId1 from "../../hooks/useMultipleSelectedActiveId1";

const CoinMininigInfoProvider = ({ children }) => {
  const { coins } = useContext(CoinsContext);
  const lastCoinRef = useRef(coins);

  if (!equal(lastCoinRef.current, coins)) {
    lastCoinRef.current = coins;
  }

  const stableCoins = lastCoinRef.current;

  const { saveValue: miningResultss, handleId } = useMultipleSelectedActiveId1(
    stableCoins,
    false,
    "miningFeeResults"
  );
  return (
    <CoinMininigInfoContext.Provider value={{ miningResultss, handleId }}>
      {children}
    </CoinMininigInfoContext.Provider>
  );
};

export default CoinMininigInfoProvider;
