import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useMultipleSelectedActiveId = (key, arrObjValue, isActive) => {
  const { saveValue, setSaveValue } = useLocalStorage(key, {});

  useEffect(() => {
    if (arrObjValue?.length > 0) {
      setSaveValue((prevSave) => {
        const newState = { ...prevSave };
        arrObjValue?.forEach((arrObj) => {
          if (!(arrObj.id in newState)) {
            newState[arrObj.id] = isActive;
          }
        });
        return newState;
      });
    }
  }, [setSaveValue, arrObjValue, isActive]);

  const handleToggleId = (id) => {
    setSaveValue((prevToggle) => ({
      ...prevToggle,
      [id]: !prevToggle[id],
    }));
  };
  const handleId = (id, isActive) => {
    setSaveValue((prevToggle) => ({
      ...prevToggle,
      [id]: isActive,
    }));
  };

  return {
    saveValue,
    handleToggleId,
    handleId,
  };
};

export default useMultipleSelectedActiveId;
