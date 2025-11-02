import { useCallback, useEffect } from "react";
import useSnapShot from "./useSnapShot";
import equal from "fast-deep-equal";

const useMultipleSelectedActiveId1 = (arrObject, defaultValue, fieldName) => {
  const { setMainValue, setValueFunc, mainValue, loading } = useSnapShot(
    {},
    fieldName
  );

  // Initialize missing coin IDs only once
  useEffect(() => {
    if (arrObject?.length > 0) {
      setMainValue((prev) => {
        const newState = { ...prev };
        let changed = false;

        arrObject.forEach((coin) => {
          if (!(coin.id in newState)) {
            newState[coin.id] = defaultValue;
            changed = true;
          }
        });

        // Only return new state if something changed
        return changed ? newState : prev;
      });
    }
  }, [arrObject, defaultValue, setMainValue]);

  const handleToggleId = useCallback(
    (id) => {
      setMainValue((prev) => {
        const updated = { ...prev, [id]: !prev[id] };
        if (!equal(updated, prev)) setValueFunc(updated);
        return updated;
      });
    },
    [setMainValue, setValueFunc]
  );

  const handleId = useCallback(
    (id, isActive) => {
      setMainValue((prev) => {
        const updated = { ...prev, [id]: isActive };
        if (!equal(updated, prev)) setValueFunc(updated);
        return updated;
      });
    },
    [setMainValue, setValueFunc]
  );

  return {
    handleId,
    handleToggleId,
    saveValue: mainValue,
    loading,
  };
};

export default useMultipleSelectedActiveId1;
