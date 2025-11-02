import { useCallback, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminContext } from "../../../context/admin/AdminContext";
import useFormState from "../../../hooks/useFormState";
import { receivDetails } from "../../dashboard/body/sendCom/sendDetails";
import { ConfirmTransactionContext } from "../../../context/confrimTransaction/ConfirmTransactionContext";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedAdminCoin,
  selectedSearchedAdminCoin,
  setAdminCoin,
  setSearchedAdminCoin,
} from "../../../redux/features/swapCoins/swapCoinSlice";
import { CoinsContext } from "../../../context/coins/CoinsContext";
import useSelectedItems from "../../../hooks/useSelectedItems";
import useConvertAmountToCoin from "../../../hooks/useConvertAmountToCoin";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import SwapFolder from "../../../reuseableCom/swapFolder/SwapFolder";
import Scrollbar from "../../../reuseableCom/scrollbar/Scrollbar";
import YouPay from "../../dashboard/body/swapCom/swapCoins/YouPay";
import TransactionSender from "../../../reuseableCom/transactionSender/TransactionSender";
import ReceiptsCheck from "../../../reuseableCom/receiptsCheck/ReceiptsCheck";

const AdminDepositfunds = () => {
  const { userId } = useParams();
  const { allUsers } = useContext(AdminContext);
  const { formState, errorformState, handleFormStateChange, handleSubmit } =
    useFormState(receivDetails);
  const { setSaveValue, saveValue } = useContext(ConfirmTransactionContext);
  const [receipts, setReceipts] = useState(false);
  const [receiptsLoading, setReceiptsLoading] = useState(false);
  const findUserId = allUsers?.find((user) => user.id === userId);
  const adminCoin = useSelector(selectedAdminCoin);
  const searchedAdminCoin = useSelector(selectedSearchedAdminCoin);
  const { coins, loading, error } = useContext(CoinsContext);
  const { selectedItems, handleSelectedItems } = useSelectedItems(coins);

  const dispatch = useDispatch();

  const handleOpenCoins = useCallback(() => {
    dispatch(setAdminCoin(true));
  }, [dispatch]);
  const { coinAmount } = useConvertAmountToCoin(
    formState?.amount,
    selectedItems?.quote.USD.price
  );
  const { coinAmount: coinNetwrokFee } = useConvertAmountToCoin(
    formState?.networkFee,
    selectedItems?.quote.USD.price
  );
  const totalAmount = Number(formState.amount) + Number(formState?.networkFee);
  const { coinAmount: totalAmountCoin } = useConvertAmountToCoin(
    totalAmount,
    selectedItems?.quote.USD.price
  );
  const navigate = useNavigate();
  const isActiveForm = formState.amount !== "" && formState.address !== "";

  const handleSendDetails = async () => {
    const valueAdded = {
      type: "Receive",
      logo: selectedItems?.logo,
      amount: formState.amount,
      coinAmount: coinAmount,
      status: "Completed",
      from: formState.address,
      to: selectedItems?.addressCoins,
      coinSlug: selectedItems?.slug,
      coinSymbol: selectedItems?.symbol,
      coinId: selectedItems?.id,
      coinName: selectedItems?.name,
      coinNetwrokFee: coinNetwrokFee,
      netWorkFee: formState?.networkFee,
      totalAmount: totalAmount,
      totalAmountCoin: totalAmountCoin,
      timeStamps: new Date().toISOString(),
    };

    if (isActiveForm) {
      setReceipts(true);
    }

    setSaveValue(valueAdded);
  };

  const fromCoin = `${saveValue.from?.slice(0, 7)}...${saveValue.from?.slice(
    -7
  )}`;

  const toCoin = `${saveValue.to?.slice(0, 7)}...${saveValue.to?.slice(-7)}`;

  const finaliseSubmit = async () => {
    setReceiptsLoading(true);
    try {
      await addDoc(
        collection(db, "users", findUserId?.id, "transactions"),
        saveValue
      );
      navigate(`/admin-list/singleUser/${findUserId?.id}`);
      setReceipts(false);
    } catch (error) {
      console.error(error);
    } finally {
      setReceiptsLoading(false);
    }
  };

  return (
    <>
      {!receipts && (
        <>
          <div className="mt-5 allFlex2">
            <SwapFolder
              loading={loading}
              selectedCoin={selectedItems ? selectedItems : ""}
              thePay={handleOpenCoins}
              inputs
              balance
              error={error}
            />
          </div>
          {adminCoin && (
            <div className="fixed top-0 left-0 z-50 w-full min-h-screen bg-black bg-opacity-10 backdrop-blur-sm">
              <div className="absolute w-full px-3 transform left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 customMiniTablet:w-max transist1">
                <YouPay
                  thePay={setAdminCoin}
                  handleSelectedItems={handleSelectedItems}
                  searchedPay={searchedAdminCoin}
                  setSearchedPay={setSearchedAdminCoin}
                  name="Choose crypto"
                />
              </div>
            </div>
          )}
          <Scrollbar maxSize="120px">
            <TransactionSender
              headerName="Admin Receive"
              handleSubmit={handleSubmit}
              handleSendDetails={handleSendDetails}
              formState={formState}
              handleFormStateChange={handleFormStateChange}
              errorformState={errorformState}
              coinAmount={coinAmount}
              coinNetwrokFee={coinNetwrokFee}
              symbol={selectedItems?.symbol}
              isActiveForm={isActiveForm}
              logo={selectedItems?.logo}
              name={selectedItems?.name}
              receiver
              adminALlReceiver
            />
          </Scrollbar>
        </>
      )}
      {receipts && (
        <div className="w-full px-4 allFlex2">
          <div className="w-full customTablet1:w-[500px]">
            <ReceiptsCheck
              saveValue={saveValue}
              assets="Asset"
              fromCoin={fromCoin}
              toCoin={toCoin}
              from="From"
              to="To"
              maxTotal="Max Total"
              cancelTheConfirmTransaction={finaliseSubmit}
              reCeiptsloading={receiptsLoading}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDepositfunds;
