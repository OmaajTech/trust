import { CgClose } from "react-icons/cg";
import { swapDetails } from "./swapDetails";
import { FaCircleInfo } from "react-icons/fa6";
import useActiveId from "../../../../hooks/useActiveId";
import clsx from "clsx";
import useMultipleSelectedActiveId from "../../../../hooks/useMultipleSelectedActiveId";
import ToggleButton from "../../../../reuseableCom/toggleButton/ToggleButton";

const SwapSettings = ({ setSwapModal }) => {
  const { activeId, handleActiveId } = useActiveId();
  const { saveValue, handleToggleId } = useMultipleSelectedActiveId(
    "swapToggle",
    swapDetails,
    true
  );

  return (
    <div className="bg-white p-4 rounded-3xl  customMiniTablet:w-[448px] w-full ">
      <div className="allFlex">
        <p></p>
        <p className="text-lg font-semibold tracking-wide">Settings</p>
        <p
          className="text-2xl text-opacity-75 cursor-pointer text-customGray-200"
          onClick={() => setSwapModal(false)}
        >
          <CgClose />
        </p>
      </div>
      <div className="mt-3 space-y-5">
        {swapDetails.map((swap) => (
          <div key={swap.id} className="flex justify-between">
            <div className="flex items-center gap-1.5 font-semibold relative">
              <h3>{swap.name}</h3>
              <p
                className="text-[13px] text-customGray-200 cursor-pointer text-opacity-65"
                onMouseEnter={() => handleActiveId(swap.id)}
                onMouseLeave={() => handleActiveId(null)}
              >
                <FaCircleInfo />
              </p>
              {activeId === swap.id && (
                <p
                  className={clsx(
                    "absolute -top-16 shadow-md -left-1 w-[300px] text-xs font-medium rounded-md p-3 bg-customGray-300",
                    swap.name === "MEV Protection" && "-top-28"
                  )}
                >
                  {swap.info}
                </p>
              )}
            </div>
            <ToggleButton
              saveValue={saveValue}
              coin={swap}
              handleActiveCoins={handleToggleId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwapSettings;
