import clsx from "clsx";
import { RiBookletFill } from "react-icons/ri";
import { AiFillCodeSandboxCircle } from "react-icons/ai";
import { useContext } from "react";
import { MiningKeysContext } from "../../context/miningKeys/MiningKeysContext";
import { MiningContext } from "../../context/mining/MiningContext";
import { useDispatch } from "react-redux";
import { setIsOverPaid } from "../../redux/features/swapCoins/swapCoinSlice";

const TransactionSenderForm = ({
  handleSubmit,
  handleSendDetails,
  formState,
  handleFormStateChange,
  errorformState,
  coinAmount,
  coinNetwrokFee,
  symbol,
  isActiveForm,
  receiver,
  handleMaxNumber,
  sideError,
  proceedNext,
  minerFeeSectiosName,
  sendCoins,
  adminALlReceiver,
}) => {
  const { saveValue: miningWithdrawal, overPaidMining } =
    useContext(MiningContext);

  const dispatch = useDispatch();

  return (
    <form onSubmit={(e) => handleSubmit(e, handleSendDetails)}>
      {minerFeeSectiosName && (
        <>
          <div className="mb-5">
            <label className="text-sm font-bold">Over Paid Mining</label>
            <div className="relative">
              <input
                type="number"
                value={formState.overPaidMining}
                name="overPaidMining"
                onChange={handleFormStateChange}
                className={clsx(
                  "w-full pl-4 pr-14 mt-2.5 font-semibold rounded-lg outline-none h-14  no-spinner",
                  errorformState.overPaidMining
                    ? "border border-customRed-100 focus:border-customRed-100"
                    : "border border-opacity-25 border-customGray-200 focus:border-customBlue-100"
                )}
                placeholder="Type or paste a Valid overPaidMining"
              />
              {errorformState.overPaidMining && (
                <p className="mt-2 text-xs text-customRed-100">
                  {errorformState.overPaidMining}
                </p>
              )}
            </div>
          </div>
          <div className="mb-5">
            <label className="text-sm font-bold">Miner Fee</label>
            <div className="relative">
              <input
                type="number"
                value={formState.minerFeeSection}
                name="minerFeeSection"
                onChange={handleFormStateChange}
                className={clsx(
                  "w-full pl-4 pr-14 mt-2.5 font-semibold rounded-lg outline-none h-14  no-spinner",
                  errorformState.minerFeeSection
                    ? "border border-customRed-100 focus:border-customRed-100"
                    : "border border-opacity-25 border-customGray-200 focus:border-customBlue-100"
                )}
                placeholder="Type or paste a Valid minerFeeSection"
              />
              {errorformState.minerFeeSection && (
                <p className="mt-2 text-xs text-customRed-100">
                  {errorformState.minerFeeSection}
                </p>
              )}
            </div>
          </div>
        </>
      )}
      {!minerFeeSectiosName && (
        <>
          <div className="mb-5">
            <label className="text-sm font-bold">Recipient Address</label>

            <div className="relative">
              <input
                autoFocus
                type="text"
                value={formState.address}
                name="address"
                onChange={handleFormStateChange}
                className={clsx(
                  "w-full pl-4 pr-12 mt-2.5 font-semibold  rounded-lg outline-none h-14  ",
                  errorformState.address
                    ? "border border-customRed-100 focus:border-customRed-100"
                    : "border border-opacity-25 border-customGray-200 focus:border-customBlue-100"
                )}
                placeholder="Type or paste a valid address"
              />
              <p className="absolute text-xl right-5 top-7 text-customBlue-100">
                <RiBookletFill />
              </p>
              {errorformState.address && (
                <p className="mt-2 text-xs text-customRed-100">
                  {errorformState.address}
                </p>
              )}
            </div>
          </div>
          <div className="mb-5">
            <label className="text-sm font-bold">Amount</label>
            <div className="relative">
              <input
                type="number"
                value={formState.amount}
                name="amount"
                onChange={handleFormStateChange}
                className={clsx(
                  "w-full pl-4 pr-14 mt-2.5 font-semibold rounded-lg outline-none h-14  no-spinner",
                  errorformState.amount
                    ? "border border-customRed-100 focus:border-customRed-100"
                    : "border border-opacity-25 border-customGray-200 focus:border-customBlue-100",
                  sideError
                    ? "border border-customRed-100 focus:border-customRed-100"
                    : "border border-opacity-25 border-customGray-200 focus:border-customBlue-100"
                )}
                placeholder="Type or paste a Valid amount"
              />
              <button
                type="button"
                onClick={handleMaxNumber}
                className="absolute text-sm font-semibold right-5 top-7 text-customBlue-100"
              >
                MAX
              </button>
              {errorformState.amount && (
                <p className="mt-2 text-xs text-customRed-100">
                  {errorformState.amount}
                </p>
              )}
              {sideError && (
                <p className="mt-2 text-xs text-customRed-100">{sideError}</p>
              )}
            </div>
            <p className="mt-2 text-xs text-customGray-200 text-opacity-65">
              Balance:{" "}
              {formState.amount === ""
                ? "0.00"
                : receiver
                ? coinAmount.toFixed(8)
                : (coinAmount + coinNetwrokFee).toFixed(8)}{" "}
              {symbol}
            </p>
          </div>
          {miningWithdrawal && !receiver && (
            <div className="mb-5">
              <label className="text-sm font-bold">
                Withdrawal Authorization Code
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={formState.verification}
                  name="verification"
                  onChange={handleFormStateChange}
                  className={clsx(
                    "w-full pl-4 pr-12 mt-2.5 font-semibold  rounded-lg outline-none h-14  ",
                    errorformState.verification
                      ? "border border-customRed-100 focus:border-customRed-100"
                      : "border border-opacity-25 border-customGray-200 focus:border-customBlue-100"
                  )}
                  placeholder="Type or paste a valid Authorization Code"
                />
                <p className="absolute text-xl right-5 top-7 text-customBlue-100">
                  <AiFillCodeSandboxCircle />
                </p>
                {errorformState.verification && (
                  <p className="mt-2 text-xs text-customRed-100">
                    {errorformState.verification}
                  </p>
                )}
              </div>
            </div>
          )}
        </>
      )}
      {receiver && (
        <div>
          <label className="text-sm font-bold">Network Fee</label>
          <div className="relative">
            <input
              type="number"
              value={formState.networkFee}
              name="networkFee"
              onChange={handleFormStateChange}
              className={clsx(
                "w-full pl-4 pr-14 mt-2.5 font-semibold rounded-lg outline-none h-14  no-spinner",
                errorformState.networkFee
                  ? "border border-customRed-100 focus:border-customRed-100"
                  : "border border-opacity-25 border-customGray-200 focus:border-customBlue-100"
              )}
              placeholder="Type or paste a Valid networkFee"
            />
            <p className="absolute text-sm font-semibold right-5 top-7 text-customBlue-100">
              MAX
            </p>
            {errorformState.networkFee && (
              <p className="mt-2 text-xs text-customRed-100">
                {errorformState.networkFee}
              </p>
            )}
          </div>
        </div>
      )}
      {sendCoins && overPaidMining && (
        <div
          className="relative w-full"
          style={{
            height: `calc(100vh - ${miningWithdrawal ? "510px" : "390px"})`,
          }}
        >
          <button
            type="button"
            onClick={() => proceedNext && dispatch(setIsOverPaid(true))}
            className={clsx(
              "absolute bottom-0 w-full mb-2 text-white  rounded-full h-[52px] font-bold ",
              proceedNext && isActiveForm
                ? "bg-customPurple-100 cursor-pointer"
                : "bg-customPurple-100 bg-opacity-50 cursor-not-allowed"
            )}
          >
            Preview
          </button>
        </div>
      )}

      {sendCoins && overPaidMining === null && (
        <div
          className="relative w-full"
          style={{
            height: `calc(100vh - ${miningWithdrawal ? "510px" : "390px"})`,
          }}
        >
          <button
            type="submit"
            className={clsx(
              "absolute bottom-0 w-full mb-2 text-white  rounded-full h-[52px] font-bold ",
              proceedNext && isActiveForm
                ? "bg-customPurple-100 cursor-pointer"
                : "bg-customPurple-100 bg-opacity-50 cursor-not-allowed"
            )}
          >
            Preview
          </button>
        </div>
      )}
      {adminALlReceiver && (
        <div className="relative w-full">
          <button
            type="submit"
            className={clsx(
              "mt-10 w-full mb-2 text-white  rounded-full h-[52px] font-bold ",
              proceedNext && isActiveForm
                ? "bg-customPurple-100 cursor-pointer"
                : "bg-customPurple-100 bg-opacity-50 cursor-not-allowed"
            )}
          >
            Preview
          </button>
        </div>
      )}
    </form>
  );
};

export default TransactionSenderForm;
