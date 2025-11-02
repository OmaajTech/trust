import { useContext, useEffect, useState } from "react";
import useFormState from "../../../../hooks/useFormState";
import { sendDetails } from "../sendCom/sendDetails";
import { ConfirmTransactionContext } from "../../../../context/confrimTransaction/ConfirmTransactionContext";
import useConvertAmountToCoin from "../../../../hooks/useConvertAmountToCoin";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { RiBookletFill } from "react-icons/ri";

const AdminCoinForm = ({ findCoinSlug }) => {
  const [netWorkFee, setNetworkFee] = useState(0);
  const { formState, errorformState, handleFormStateChange, handleSubmit } =
    useFormState(sendDetails);
  const { setSaveValue } = useContext(ConfirmTransactionContext);
  const { coinAmount } = useConvertAmountToCoin();
  const totalAmount = Number(formState.amount) + netWorkFee;

  const navigate = useNavigate();

  useEffect(() => {
    const randomIndex = Math.random() * (3 - 0.01) + 0.01;
    setNetworkFee(randomIndex);
  }, []);

  const isActiveForm = formState.amount !== "" && formState.address !== "";

  const coinAmount1 = coinAmount(
    formState?.amount,
    findCoinSlug?.quote.USD.price
  );
  const coinNetwrokFee = coinAmount(netWorkFee, findCoinSlug?.quote.USD.price);
  const totalAmountCoin = coinAmount(
    totalAmount,
    findCoinSlug?.quote.USD.price
  );

  const handleSendDetails = () => {
    const valueAdded = {
      type: "Receive",
      logo: findCoinSlug?.logo,
      amount: formState.amount,
      coinAmount: coinAmount1,
      status: "Confirmed",
      from: formState.address,
      to: findCoinSlug?.addressCoins,
      coinSlug: findCoinSlug?.slug,
      coinSymbol: findCoinSlug?.symbol,
      coinId: findCoinSlug?.id,
      coinName: findCoinSlug?.name,
      coinNetwrokFee: coinNetwrokFee,
      netWorkFee: netWorkFee,
      totalAmount: totalAmount,
      totalAmountCoin: totalAmountCoin,
      timeStamps: new Date().toISOString(),
    };

    if (isActiveForm) {
      navigate(`/transfer/${findCoinSlug?.slug}`);
    }

    setSaveValue(valueAdded);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, handleSendDetails)}>
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
      <div>
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
                : "border border-opacity-25 border-customGray-200 focus:border-customBlue-100"
            )}
            placeholder="Type or paste a Valid amount"
          />
          <p className="absolute text-sm font-semibold right-5 top-7 text-customBlue-100">
            MAX
          </p>
          {errorformState.amount && (
            <p className="mt-2 text-xs text-customRed-100">
              {errorformState.amount}
            </p>
          )}
        </div>
        <p className="mt-2 text-xs text-customGray-200 text-opacity-65">
          Balance:{" "}
          {formState.amount === ""
            ? "0.00"
            : (coinAmount + coinNetwrokFee).toFixed(8)}{" "}
          {findCoinSlug?.symbol}
        </p>
      </div>
      <div
        className="relative w-full"
        style={{ height: "calc(100vh - 368px)" }}
      >
        <button
          type="submit"
          className={clsx(
            "absolute bottom-0 w-full mb-2 text-white  rounded-full h-[52px] font-bold ",
            isActiveForm
              ? "bg-customPurple-100 cursor-pointer"
              : "bg-customPurple-100 bg-opacity-50 cursor-not-allowed"
          )}
        >
          Preview
        </button>
      </div>
    </form>
  );
};

export default AdminCoinForm;
