import { useCallback, useEffect, useState } from "react";
import { NetworkFeeContext } from "./NetworkFeeContext";
import useLocalStorage from "../../hooks/useLocalStorage";

const ONE_HOUR = 3600000;

const NetworkFeeProvider = ({ children }) => {
  const { saveValue, setSaveValue } = useLocalStorage("networkFees", {
    fee: 0,
    lastUpdated: 0,
  });

  const handleReloadFees = useCallback(() => {
    const randomIndex = Math.random() * (5 - 0.01) + 0.01;

    const now = Date.now();

    setSaveValue({
      fee: randomIndex,
      lastUpdated: now,
    });
  }, [setSaveValue]);

  useEffect(() => {
    const now = Date.now();

    // If no fee yet or last update was over an hour ago
    if (!saveValue.lastUpdated || now - saveValue.lastUpdated > ONE_HOUR) {
      handleReloadFees();
    }
    // Automatically refresh every hour
    const timerInterval = setInterval(handleReloadFees, ONE_HOUR);

    return () => clearInterval(timerInterval);
  }, [handleReloadFees, saveValue]);

  return (
    <NetworkFeeContext.Provider value={{ networkFee: saveValue.fee }}>
      {children}
    </NetworkFeeContext.Provider>
  );
};

export default NetworkFeeProvider;
