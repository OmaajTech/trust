import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [saveValue, setSaveValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(saveValue));
  }, [saveValue, key]);

  return { saveValue, setSaveValue };
};

export default useLocalStorage;
