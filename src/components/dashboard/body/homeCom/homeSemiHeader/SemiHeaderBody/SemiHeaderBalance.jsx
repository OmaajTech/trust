import clsx from "clsx";
import useActiveId from "../../../../../../hooks/useActiveId";
import { homeSubHeaderDetails } from "../../homeDetails";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTransactionPrice,
  selectedTotalPrice,
  selectedTransactionLoading,
} from "../../../../../../redux/features/transactions/transactionSlice";
import useFormatePrice from "../../../../../../hooks/useFormatePrice";
import { SwitchPriceContext } from "../../../../../../context/switchPrice/SwitchPriceContext";
import "react-loading-skeleton/dist/skeleton.css";

import Skeleton from "react-loading-skeleton";

const SemiHeaderBalance = () => {
  const [isRefresh, setIsRefresh] = useState(false);
  const { saveValue, handleToggle } = useContext(SwitchPriceContext);
  const { activeId, handleActiveId } = useActiveId();
  const totalCoinPrice = useSelector(selectedTotalPrice);
  const loading = useSelector(selectedTransactionLoading);
  const { formatePrice } = useFormatePrice();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTransactionPrice());
  }, [dispatch]);

  // the purposed of this is that when the page mount set the isRefresh to true so it can continue to rotate
  useEffect(() => {
    setIsRefresh(true);
  }, []);

  const handleIsRefresh = () => {
    setIsRefresh(false);

    setTimeout(() => {
      setIsRefresh(true);
    }, 10);
  };

  return (
    <>
      <div className="relative flex items-center gap-3 text-customGray-200">
        <div className="text-[32px] font-extrabold relative">
          {saveValue ? (
            <p className="-translate-y-2.5">.....</p>
          ) : loading ? (
            <p>
              {" "}
              <Skeleton height={20} width={70} />
            </p>
          ) : (
            <p>${formatePrice(totalCoinPrice)}</p>
          )}
        </div>
        <div className="flex items-center gap-3 ">
          {homeSubHeaderDetails.map((sub) => {
            const { path, icon, element, id } = sub;

            const showCase =
              (path && saveValue && element === "Show Balance") ||
              (path && !saveValue && element === "Hide Balance") ||
              (!path && element === "Refresh");

            const showValue = showCase ? icon() : null;

            return (
              <div key={id}>
                {activeId === id && showValue && (
                  <div
                    className={clsx(
                      "absolute -top-8 text-sm bg-customGray-200 bg-opacity-[0.07] px-3.5 p-1.5 rounded-lg shadow-md mt-2"
                    )}
                  >
                    <p>{showValue && element}</p>
                  </div>
                )}
                <div
                  className="text-lg cursor-pointer text-opacity-45 text-customGray-200"
                  onMouseEnter={() => handleActiveId(id)}
                  onMouseLeave={() => handleActiveId(null)}
                >
                  <p
                    className={clsx(
                      element === "Show Balance" && "-mx-3",
                      //   why this refreshing once is false is that the "infinite " i added in the css styles automatically it spins...the purpose of the click is just to refresh immediately from the beginning
                      element === "Refresh" && isRefresh
                        ? "animate-rotate-pause"
                        : ""
                    )}
                    onClick={() => {
                      if (path) {
                        handleToggle();
                      } else {
                        handleIsRefresh();
                      }
                    }}
                  >
                    {showValue}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SemiHeaderBalance;
