import { useCallback, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CoinsContext } from "../../../../../context/coins/CoinsContext";
import { CoinMininigInfoContext } from "../../../../../context/coinMininigInfo/CoinMininigInfoContext";
import useFormState from "../../../../../hooks/useFormState";
import TransactionSender from "../../../../../reuseableCom/transactionSender/TransactionSender";
import { useDispatch, useSelector } from "react-redux";
import { adminMinerFee } from "../earnDetails";
import { selectedCoinMiner } from "../../../../../redux/features/coinMiner/coinMinerSlice";
import { AuthContext } from "../../../../../context/auth/AuthContext";
import { addToFiresStoreUserId } from "../../../../../redux/features/thunk/thunkSlice";
import { AdminContext } from "../../../../../context/admin/AdminContext";
import {
  selectedAdminCoin,
  selectedSearchedAdminCoin,
  setAdminCoin,
  setSearchedAdminCoin,
} from "../../../../../redux/features/swapCoins/swapCoinSlice";
import useSelectedItems from "../../../../../hooks/useSelectedItems";
import ModalPayment from "../../../../../reuseableCom/modalPayment/ModalPayment";
import SwapFolder from "../../../../../reuseableCom/swapFolder/SwapFolder";
import YouPay from "../../swapCom/swapCoins/YouPay";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../../firebase/firebaseConfig";
import { adminUpdateField } from "../../../../../hooks/useAdminUpdateField";

const EarnCoinForm = () => {
  const { userId } = useParams();
  const { allUsers } = useContext(AdminContext);
  const { formState, errorformState, handleFormStateChange, handleSubmit } =
    useFormState(adminMinerFee);
  const findUserId = allUsers?.find((user) => user.id === userId);
  const adminCoin = useSelector(selectedAdminCoin);
  const searchedAdminCoin = useSelector(selectedSearchedAdminCoin);
  const { coins, loading, error } = useContext(CoinsContext);
  const { selectedItems, handleSelectedItems } = useSelectedItems(coins);
  const dispatch = useDispatch();

  const handleOpenCoins = useCallback(() => {
    dispatch(setAdminCoin(true));
  }, [dispatch]);

  const coinMinerID = findUserId?.coinMiner?.map((transac) => transac);

  const navigate = useNavigate();

  const findMinerFeeId = coinMinerID?.find(
    (coinMine) => coinMine.coinId === selectedItems?.id
  );

  const handleTheSubmit = async () => {
    if (selectedItems === null) return;
    const valueDetails = {
      initialBalance: findMinerFeeId?.initialBalance,
      overPaidMining: formState.overPaidMining,
      miningFeePercent: formState.minerFeeSection,
      coinSlugId: selectedItems?.slug,
      coinId: selectedItems?.id,
      afterMiningTotalBalance: selectedItems?.availableBalance,
    };

    if (formState.overPaidMining !== "" && formState.minerFeeSection !== "") {
      await addDoc(
        collection(db, "users", findUserId?.id, "minerFeeSlice"),
        valueDetails
      );
      navigate(`/admin-list/singleUser/${findUserId?.id}/earn`);
      await adminUpdateField(
        userId,
        `miningFeeResults.${selectedItems?.id}`,
        true
      );
    }
  };

  return (
    <>
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
            <div className="absolute w-full px-3 transform left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 customMiniTablet:w-max">
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
      </>
      <TransactionSender
        headerName="Miner Payment Send"
        handleSubmit={handleSubmit}
        handleSendDetails={handleTheSubmit}
        formState={formState}
        handleFormStateChange={handleFormStateChange}
        errorformState={errorformState}
        symbol={selectedItems?.symbol}
        logo={selectedItems?.logo}
        name={selectedItems?.name}
        minerFeeSectiosName
        adminALlReceiver
      />
    </>
  );
};

export default EarnCoinForm;
