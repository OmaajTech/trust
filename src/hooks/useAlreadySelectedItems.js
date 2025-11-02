import { useState } from "react";

const useAlreadySelectedItems = (initialValue) => {
  const [singleSelectedItem, setSingleSelectedItem] = useState(0);

  const handleSingleSelectedItem = (id) => {
    const idx = initialValue.findIndex((initi) => initi.id === id);
    setSingleSelectedItem(idx);
  };

  return {
    singleSelectedItem,
    handleSingleSelectedItem,
  };
};

export default useAlreadySelectedItems;
