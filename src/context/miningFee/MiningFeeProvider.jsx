import { useContext, useRef } from "react";
import { MiningFeeContext } from "./MiningFeeContext";
import { CoinsContext } from "../coins/CoinsContext";
import equal from "fast-deep-equal";
import useMultipleSelectedActiveId1 from "../../hooks/useMultipleSelectedActiveId1";

const MiningFeeProvider = ({ children }) => {
  const { coins } = useContext(CoinsContext);

  // Keep a ref to the last stable version of coins
  const lastCoinsRef = useRef(coins);

  if (!equal(lastCoinsRef.current, coins)) {
    lastCoinsRef.current = coins;
  }

  // Use stable reference for downstream hooks
  const stableCoins = lastCoinsRef.current;
  const { saveValue: miningFeeValue, handleId } = useMultipleSelectedActiveId1(
    stableCoins,
    false,
    "minningFee"
  );

  return (
    <MiningFeeContext.Provider value={{ miningFeeValue, handleId }}>
      {children}
    </MiningFeeContext.Provider>
  );
};

export default MiningFeeProvider;
