import { useContext, useRef } from "react";
import { MiningActivatedContext } from "./MiningActivatedContext";
import { CoinsContext } from "../coins/CoinsContext";
import useMultipleSelectedActiveId1 from "../../hooks/useMultipleSelectedActiveId1";
import equal from "fast-deep-equal";

const MiningActivatedProvider = ({ children }) => {
  const { coins } = useContext(CoinsContext);

  // Keep a ref to the last stable version of coins
  const lastCoinsRef = useRef(coins);

  if (!equal(lastCoinsRef.current, coins)) {
    lastCoinsRef.current = coins;
  }

  // Use stable reference for downstream hooks
  const stableCoins = lastCoinsRef.current;
  const { saveValue, handleToggleId, handleId, loading } =
    useMultipleSelectedActiveId1(stableCoins, false, "minningActivated");

  return (
    <MiningActivatedContext.Provider
      value={{ saveValue, handleId, handleToggleId, loading }}
    >
      {children}
    </MiningActivatedContext.Provider>
  );
};

export default MiningActivatedProvider;
