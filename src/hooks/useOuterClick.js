import { useEffect, useRef } from "react";

const useOuterClick = (initialValue) => {
  const mainStateRef = useRef();

  useEffect(() => {
    const handleOuterClick = (e) => {
      if (mainStateRef.current && !mainStateRef.current.contains(e.target)) {
        initialValue(false);
      }
    };

    document.addEventListener("mousedown", handleOuterClick);

    return () => document.removeEventListener("mousedown", handleOuterClick);
  }, [initialValue]);

  return { mainStateRef };
};

export default useOuterClick;
