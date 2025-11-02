import { useCallback } from "react";
import { MiningKeysContext } from "./MiningKeysContext";
import useSnapShot from "../../hooks/useSnapShot";
import useGenerateKeys from "../../hooks/useGenerateKeys";

const MiningKeysProvider = ({ children }) => {
  const { setMainValue, setValueFunc, mainValue } = useSnapShot(
    "",
    "miningKeys"
  );
  const { generateNewKeys } = useGenerateKeys();

  const getNewKeyState = useCallback(() => {
    const newkeysState = generateNewKeys();

    setMainValue(newkeysState);
    setValueFunc(newkeysState);
  }, [setMainValue, setValueFunc, generateNewKeys]);

  return (
    <MiningKeysContext.Provider value={{ keys: mainValue, getNewKeyState }}>
      {children}
    </MiningKeysContext.Provider>
  );
};

export default MiningKeysProvider;
