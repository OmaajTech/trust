import { PiApproximateEquals } from "react-icons/pi";
import useFormatePrice from "../../hooks/useFormatePrice";
import HeaderBack from "../headerBack/HeaderBack";
import { FaCircleInfo } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectedTransactionLoading } from "../../redux/features/transactions/transactionSlice";
import clsx from "clsx";
import { ClipLoader } from "react-spinners";
import useLazyLoading from "../../hooks/useLazyLoading";

const ReceiptsCheck = ({
  saveValue,
  assets,
  fromCoin,
  toCoin,
  from,
  to,
  maxTotal,
  cancelTheConfirmTransaction,
  history,
  informativeAddress,
  reCeiptsloading,
}) => {
  const loading = useSelector(selectedTransactionLoading);
  const { showLoading } = useLazyLoading(loading);
  const { formatePrice } = useFormatePrice();

  let headerName = "";

  if (saveValue?.type === "Send") {
    headerName = "Transfer";
  } else if (saveValue?.type === "Receive") {
    headerName = "Transfer";
  } else {
    headerName = "Transfer";
  }

  const dateFormte = new Date(saveValue?.timeStamps).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });

  return (
    <div>
      <HeaderBack back details={headerName} history={history} />
      <div className="mb-10 text-center">
        <h1 className="text-2xl tracking-wide mb-0.5 font-bold flex justify-center items-center gap-1">
          <div>
            {saveValue?.type === "Send" ? (
              <>-{saveValue?.coinAmount?.toFixed(8)}</>
            ) : (
              <>+{saveValue?.coinAmount?.toFixed(8)}</>
            )}
          </div>

          {saveValue?.coinSymbol}
        </h1>
        <div className="gap-1 text-customGray-200 text-opacity-80 allFlex2">
          <div className="text-xs text-customGray-200 text-opacity-70">
            <PiApproximateEquals />
          </div>
          <p>${formatePrice(Number(saveValue?.amount))}</p>
        </div>
      </div>
      <div className="mb-1 space-y-5">
        <div className="p-4 space-y-5 text-sm bg-customGray-300 bg-opacity-80 rounded-2xl">
          <div className="allFlex">
            <h3 className="text-customGray-200 text-opacity-65">{assets}</h3>
            <div className="font-bold text-opacity-100 text-customGray-200">
              {history ? (
                dateFormte
              ) : (
                <>
                  {saveValue?.coinName} ({saveValue?.coinSymbol})
                </>
              )}
            </div>
          </div>

          <div className="allFlex">
            <h3 className="text-customGray-200 text-opacity-65">{from}</h3>
            <div
              className={clsx(
                " font-bold",
                history && saveValue?.status === "Pending"
                  ? "text-customYellow-100"
                  : "text-customGray-200 text-opacity-100"
              )}
            >
              {history ? (
                saveValue?.status
              ) : (
                <>
                  {saveValue?.type === "Send" ? (
                    <>Main Wallet ({fromCoin})</>
                  ) : (
                    <>{fromCoin}</>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="allFlex">
            <h3 className="text-customGray-200 text-opacity-65">{to}</h3>
            <div className="font-bold text-opacity-100 text-customGray-200">
              {history ? (
                informativeAddress
              ) : (
                <>
                  {saveValue?.type === "Send" ? (
                    <> {toCoin}</>
                  ) : (
                    <>Main Wallet ({toCoin})</>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="p-4 space-y-5 text-sm bg-customGray-300 bg-opacity-80 rounded-2xl">
          <div className="allFlex">
            <h3 className="flex items-center gap-1 text-customGray-200 text-opacity-65">
              Network fee{" "}
              <div className="text-xs text-customGray-200">
                <FaCircleInfo />
              </div>
            </h3>
            <div className="font-bold text-opacity-100 text-customGray-200 text-end">
              {saveValue?.coinNetwrokFee?.toFixed(8)}
              <span className="pl-0.5">{saveValue?.coinSymbol}</span>
              <br />{" "}
              <p className="flex justify-end items-center text-xs text-customGray-200 text-opacity-70 gap-0.5">
                <PiApproximateEquals />
                {saveValue?.type === "Send" ? (
                  <>${saveValue?.netWorkFee?.toFixed(2)}</>
                ) : (
                  <>${formatePrice(Number(saveValue?.netWorkFee))}</>
                )}
              </p>
            </div>
          </div>
          <div className="allFlex">
            <h3 className="text-customGray-200 text-opacity-65">{maxTotal}</h3>
            <p className="font-bold text-opacity-100 text-customGray-200">
              {history ? (
                saveValue?.nonce
              ) : (
                <>
                  {saveValue?.type === "Send" ? (
                    <>
                      ${formatePrice(Number(saveValue.totalAmount?.toFixed(2)))}
                    </>
                  ) : (
                    <>${formatePrice(Number(saveValue.totalAmount))}</>
                  )}
                </>
              )}
            </p>
          </div>
        </div>
      </div>
      {history && (
        <button className="w-full h-10 mt-3 text-xs font-semibold text-center border border-dashed rounded-lg border-customGray-100 text-customBlue-100 ">
          <Link to="https://bscscan.com/">View on block explorer</Link>
        </button>
      )}
      {!history && (
        <div
          className="relative w-full h-full"
          style={{ height: "calc(100vh - 440px)" }}
        >
          <button
            disabled={showLoading || reCeiptsloading}
            className={clsx(
              "absolute bottom-0 w-full  h-[48px] rounded-full text-white tracking-wider font-bold flex justify-center items-center gap-2",
              showLoading || reCeiptsloading
                ? "bg-customPurple-100 bg-opacity-60"
                : "bg-customPurple-100 "
            )}
            onClick={cancelTheConfirmTransaction}
          >
            {showLoading || reCeiptsloading ? "Loading..." : "Confirm"}
            {showLoading || reCeiptsloading ? (
              <ClipLoader size={20} color="#fff" />
            ) : (
              ""
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ReceiptsCheck;
