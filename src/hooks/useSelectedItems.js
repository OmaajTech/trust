import { useState } from "react";

const useSelectedItems = (initialValue) => {
  const [selectedItems, setselectedItems] = useState(null);

  const handleSelectedItems = (id) => {
    const idx = initialValue?.find((ind) => ind.id === id);

    setselectedItems(idx);
  };

  const resetToAllCoins = () => {
    setselectedItems(null);
  };

  return {
    selectedItems,
    handleSelectedItems,
    resetToAllCoins,
    setselectedItems,
  };
};

export default useSelectedItems;
