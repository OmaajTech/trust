import { MiningContext } from "./MiningContext";
import { useCallback } from "react";
import useSnapShot from "../../hooks/useSnapShot";

const MiningProvider = ({ children }) => {
  const { setMainValue, setValueFunc, mainValue, loading } = useSnapShot(
    false,
    "miningStarted"
  );

  const handleMining = useCallback(async () => {
    setMainValue(true);
    setValueFunc(true);
  }, [setMainValue, setValueFunc]);
  const {
    setMainValue: setOverPaidMining,
    setValueFunc: setValue2,
    mainValue: overPaidMining,
    loading: overpaidLoading,
  } = useSnapShot(null, "overPaidMining");

  const handleOverMiningToNull = useCallback(async () => {
    setOverPaidMining(null);
    setValue2(null);
  }, [setOverPaidMining, setValue2]);

  const handleOverMiningToTrue = useCallback(async () => {
    setOverPaidMining(true);
    setValue2(true);
  }, [setOverPaidMining, setValue2]);

  return (
    <MiningContext.Provider
      value={{
        saveValue: mainValue,
        loading,
        handleMining,
        overPaidMining,
        setOverPaidMining,
        handleOverMiningToNull,
        handleOverMiningToTrue,
        overpaidLoading,
      }}
    >
      {children}
    </MiningContext.Provider>
  );
};

export default MiningProvider;
