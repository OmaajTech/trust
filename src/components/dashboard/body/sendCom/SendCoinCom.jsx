import { useCallback, useContext, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CoinsContext } from "../../../../context/coins/CoinsContext";
import useFormState from "../../../../hooks/useFormState";
import { sendDetails } from "./sendDetails";
import { ConfirmTransactionContext } from "../../../../context/confrimTransaction/ConfirmTransactionContext";
import useConvertAmountToCoin from "../../../../hooks/useConvertAmountToCoin";
import TransactionSender from "../../../../reuseableCom/transactionSender/TransactionSender";
import { NetworkFeeContext } from "../../../../context/networkFee/NetworkFeeContext";
import { MiningContext } from "../../../../context/mining/MiningContext";
import { MiningKeysContext } from "../../../../context/miningKeys/MiningKeysContext";
import ModalPayment from "../../../../reuseableCom/modalPayment/ModalPayment";
import { useSelector } from "react-redux";
import {
  selectedIsOverPaid,
  setIsOverPaid,
} from "../../../../redux/features/swapCoins/swapCoinSlice";
import OverMiningNotice from "./OverMiningNotice";
import { selectedMinerFees } from "../../../../redux/features/minerFee/minerFeeSlice";

const SendCoinCom = () => {
  const { coinslug } = useParams();
  const { networkFee: netWorkFee } = useContext(NetworkFeeContext);
  const { coins } = useContext(CoinsContext);
  const { keys, getNewKeyState } = useContext(MiningKeysContext);
  const { setSaveValue } = useContext(ConfirmTransactionContext);
  const {
    formState,
    errorformState,
    handleFormStateChange,
    handleSubmit,
    setFormState,
  } = useFormState(sendDetails, keys);

  const { saveValue: miningWithdrawal } = useContext(MiningContext);

  const minerFees = useSelector(selectedMinerFees);
  const isOverPaid = useSelector(selectedIsOverPaid);

  const findCoinSlug = coins?.find((coin) => coin.slug === coinslug);
  const findTheOverPaidSlug = minerFees?.find(
    (overMin) => overMin.coinSlugId === findCoinSlug?.slug
  );
  const { coinAmount: overMiningCoin } = useConvertAmountToCoin(
    findTheOverPaidSlug?.overPaidMining,
    findCoinSlug?.quote.USD.price
  );

  const { coinAmount } = useConvertAmountToCoin(
    formState?.amount,
    findCoinSlug?.quote.USD.price
  );
  const { coinAmount: coinNetwrokFee } = useConvertAmountToCoin(
    netWorkFee,
    findCoinSlug?.quote.USD.price
  );
  const totalAmount = Number(formState.amount) + netWorkFee;
  const { coinAmount: totalAmountCoin } = useConvertAmountToCoin(
    totalAmount,
    findCoinSlug?.quote.USD.price
  );
  const navigate = useNavigate();

  const isActiveForm = formState.amount !== "" && formState.address !== "";

  const proceedNext = miningWithdrawal
    ? isActiveForm &&
      findCoinSlug?.availableBalance > Number(formState.amount) + netWorkFee &&
      formState.verification === keys
    : isActiveForm &&
      findCoinSlug?.availableBalance > Number(formState.amount) + netWorkFee;

  let sideError = useMemo(() => {
    const totalWithNetworkFee = Number(formState.amount) + netWorkFee;
    return findCoinSlug?.availableBalance < totalWithNetworkFee
      ? "Not Enough Balanace"
      : "";
  }, [formState, findCoinSlug, netWorkFee]);

  const handleMaxNumber = useCallback(() => {
    setFormState((prevState) => ({
      ...prevState,
      amount: findCoinSlug?.availableBalance.toFixed(2),
    }));
  }, [findCoinSlug, setFormState]);

  const handleSendDetails = useCallback(() => {
    const valueAdded = {
      type: "Send",
      logo: findCoinSlug?.logo,
      amount: formState.amount,
      coinAmount: coinAmount,
      status: "Pending",
      from: findCoinSlug?.addressCoins,
      to: formState.address,
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

    if (!proceedNext) return;

    navigate(`/transfer/${findCoinSlug?.slug}`);
    setSaveValue(valueAdded);
    getNewKeyState();
  }, [
    coinAmount,
    coinNetwrokFee,
    findCoinSlug,
    formState,
    navigate,
    netWorkFee,
    proceedNext,
    setSaveValue,
    totalAmount,
    totalAmountCoin,
    getNewKeyState,
  ]);

  return (
    <>
      {isOverPaid && (
        <ModalPayment allYou={isOverPaid} setAllYou={setIsOverPaid}>
          <OverMiningNotice
            findCoinSlug={findCoinSlug}
            coinAmount={overMiningCoin}
            findTheOverPaidSlug={findTheOverPaidSlug}
          />
        </ModalPayment>
      )}
      <TransactionSender
        headerName="Send"
        handleSubmit={handleSubmit}
        handleSendDetails={handleSendDetails}
        formState={formState}
        handleFormStateChange={handleFormStateChange}
        errorformState={errorformState}
        coinAmount={coinAmount}
        coinNetwrokFee={coinNetwrokFee}
        symbol={findCoinSlug?.symbol}
        isActiveForm={isActiveForm}
        logo={findCoinSlug?.logo}
        name={findCoinSlug?.name}
        handleMaxNumber={handleMaxNumber}
        sideError={sideError}
        proceedNext={proceedNext}
        sendCoins
      />
    </>
  );
};

export default SendCoinCom;
