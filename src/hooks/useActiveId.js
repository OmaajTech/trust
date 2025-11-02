import { useState } from "react";

const useActiveId = (initialValue = null) => {
  const [activeId, setActiveId] = useState(initialValue);

  const handleActiveId = (id) =>
    setActiveId((prevActive) => (prevActive === id ? initialValue : id));

  return { activeId, handleActiveId };
};

export default useActiveId;
