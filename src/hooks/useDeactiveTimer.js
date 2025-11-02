import { useEffect, useRef } from "react";

const useDeactiveTimer = (findSlug, saveValue, handleId) => {
  const timeUpRef = useRef();
  useEffect(() => {
    if (!findSlug?.id) return;

    const isMiningActivated = saveValue[findSlug?.id];

    if (isMiningActivated) {
      timeUpRef.current = setTimeout(() => {
        handleId(findSlug?.id, true);
      }, 6000);
    }

    return () => clearTimeout(timeUpRef.current);
  }, [handleId, findSlug?.id, saveValue]);
};

export default useDeactiveTimer;
