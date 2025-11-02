import { SwitchPriceContext } from "./SwitchPriceContext";
import useLocalStorage from "../../hooks/useLocalStorage";

const SwitchPriceProvider = ({ children }) => {
  const { saveValue, setSaveValue } = useLocalStorage("switch-price", false);

  const handleToggle = () => {
    setSaveValue((prevToggle) => !prevToggle);
  };

  return (
    <SwitchPriceContext.Provider value={{ saveValue, handleToggle }}>
      {children}
    </SwitchPriceContext.Provider>
  );
};

export default SwitchPriceProvider;
