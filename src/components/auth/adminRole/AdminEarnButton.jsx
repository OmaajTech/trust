import { useCallback, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminContext } from "../../../context/admin/AdminContext";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedAdminCoin,
  selectedSearchedAdminCoin,
  setAdminCoin,
  setSearchedAdminCoin,
} from "../../../redux/features/swapCoins/swapCoinSlice";
import { CoinsContext } from "../../../context/coins/CoinsContext";
import useSelectedItems from "../../../hooks/useSelectedItems";
import SwapFolder from "../../../reuseableCom/swapFolder/SwapFolder";
import ModalPayment from "../../../reuseableCom/modalPayment/ModalPayment";
import YouPay from "../../dashboard/body/swapCom/swapCoins/YouPay";
import {
  adminUpdateField,
  deleteUserSubDoc,
} from "../../../hooks/useAdminUpdateField";
import { getActivatedMiningButton } from "../authDetails";
import { ClipLoader } from "react-spinners";
import clsx from "clsx";

const AdminEarnButton = () => {
  const { userId } = useParams();
  const { allUsers } = useContext(AdminContext);
  const [loadingButton, setLoadingButton] = useState(false);

  const findUserId = allUsers?.find((user) => user.id === userId);

  const adminCoin = useSelector(selectedAdminCoin);
  const searchedAdminCoin = useSelector(selectedSearchedAdminCoin);
  const { coins, loading } = useContext(CoinsContext);
  const { selectedItems, handleSelectedItems } = useSelectedItems(coins);
  const dispatch = useDispatch();

  const handleOpenCoins = useCallback(() => {
    dispatch(setAdminCoin(true));
  }, [dispatch]);

  const handleMiningFee = async () => {
    if (selectedItems === null) return;
    setLoadingButton(true);
    try {
      await adminUpdateField(userId, `minningFee.${selectedItems?.id}`, true);
      navigate(`/admin-list/singleUser/${findUserId?.id}/deposit-mining-fee`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingButton(false);
    }
  };

  const coinMinerID = findUserId?.coinMiner?.map((transac) => transac);
  const minerFeeID = findUserId?.minerFeeSlice?.map((transac) => transac);

  const navigate = useNavigate();

  const findMinerFeeId = coinMinerID?.find(
    (coinMine) => coinMine.coinId === selectedItems?.id
  );
  const theMinerFeeId = minerFeeID?.find(
    (coinMine) => coinMine.coinId === selectedItems?.id
  );

  const refactorySettings = async () => {
    if (selectedItems === null) return;
    setLoadingButton(true);
    try {
      await adminUpdateField(
        userId,
        `miningFeeResults.${selectedItems?.id}`,
        false
      );
      await adminUpdateField(userId, `minningFee.${selectedItems?.id}`, false);
      await adminUpdateField(
        userId,
        `minningActivated.${selectedItems?.id}`,
        false
      );
      await adminUpdateField(userId, "overPaidMining", true);
      await deleteUserSubDoc(userId, "coinMiner", findMinerFeeId?.id);
      navigate(`/admin-list/singleUser/${findUserId?.id}/mining-activated`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingButton(false);
    }
  };

  const paidOverMining = async () => {
    if (selectedItems === null) return;
    setLoadingButton(true);
    try {
      await adminUpdateField(userId, "overPaidMining", null);
      await deleteUserSubDoc(userId, "minerFeeSlice", theMinerFeeId?.id);
      navigate(`/admin-list/singleUser/${findUserId?.id}/mining-activated`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingButton(false);
    }
  };

  const getFindAc = Object.values(findUserId?.minningActivated || {}).some(
    (coiMi) => coiMi
  );
  const getFindMinFee = Object.values(findUserId?.miningFeeResults || {}).some(
    (coiMi) => coiMi
  );

  const overPaid = findUserId?.overPaidMining;

  const buttonDispalyed = getActivatedMiningButton(
    getFindAc,
    handleMiningFee,
    getFindMinFee,
    refactorySettings,
    overPaid,
    paidOverMining
  );

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
      </>
      <div className="w-full px-4 mt-10 allFlex2">
        <div className="w-full customTablet1:w-[400px] space-y-5 rounded-lg px-2 customMiniTablet:px-5 py-4 border-2 border-customGray-200">
          {buttonDispalyed.map((butt) => (
            <>
              {butt.value ? (
                <div className="flex justify-between pb-2 border-b-2 border-customGray-200 last:border-none">
                  <h3 className="text-customGray-400">{butt.label} :</h3>{" "}
                  <button
                    className={clsx(
                      "gap-1 px-4 py-1 text-xs font-bold rounded-full allFlex2",
                      loadingButton
                        ? "bg-customGray-400 bg-opacity-10 text-customGray-400"
                        : "bg-customGray-400 bg-opacity-30"
                    )}
                    onClick={butt.button}
                  >
                    {loadingButton ? "Loading..." : "End"}
                    {loadingButton && <ClipLoader size={10} color="#252525" />}
                  </button>
                </div>
              ) : (
                ""
              )}
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminEarnButton;
