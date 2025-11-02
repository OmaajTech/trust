import { FaPlus } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import AccountImg from "../../../../../../assets/home/Accounts.svg";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { SwitchPriceContext } from "../../../../../../context/switchPrice/SwitchPriceContext";
import {
  selectedTotalPrice,
  selectedTransactionLoading,
} from "../../../../../../redux/features/transactions/transactionSlice";
import useFormatePrice from "../../../../../../hooks/useFormatePrice";
import { logoutUser } from "../../../../../../redux/features/auth/authSlice";

const MainWalletModal = ({ backUp, id }) => {
  const { saveValue } = useContext(SwitchPriceContext);
  const totalCoinPrice = useSelector(selectedTotalPrice);
  const loading = useSelector(selectedTransactionLoading);
  const { formatePrice } = useFormatePrice();
  const dispatch = useDispatch();

  return (
    <div>
      <div className="p-2 border-b border-b-customGray-200 border-opacity-10">
        <div className="flex justify-between p-4">
          <h2 className="font-semibold text-custom15px">
            {backUp ? "Main Wallet" : "Seed Phrase"}
          </h2>
          <p className="text-sm text-customGray-200 text-opacity-70">
            {saveValue ? (
              <p className="-translate-y-2.5">.....</p>
            ) : loading ? (
              <p>Loading...</p>
            ) : (
              <p>${formatePrice(totalCoinPrice)}</p>
            )}
          </p>
        </div>
        <div className="flex justify-between items-center pt-2.5 mb-2 pb-2 px-4 hover:bg-customGray-200 hover:scale-[1.01] hover:bg-opacity-[0.07] mx-2.5 rounded-2xl transist">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9">
              <img
                src={AccountImg}
                alt=""
                className="object-contain w-full h-full"
              />
            </div>
            <div>
              <h2 className="text-sm font-semibold">Account 1</h2>
              <p className="text-sm text-customGray-200 text-opacity-70">
                {saveValue ? (
                  <p className="-translate-y-2.5">.....</p>
                ) : loading ? (
                  <p>Loading...</p>
                ) : (
                  <p>${formatePrice(totalCoinPrice)}</p>
                )}
              </p>
            </div>
          </div>
          <div className="w-5 h-5 rounded-full border-[2.5px] border-customBlue-100 allFlex2">
            <p className="w-2.5 h-2.5 rounded-full bg-customBlue-100"></p>
          </div>
        </div>
        <div className="px-4">
          <div
            className="rounded-3xl w-full flex justify-center items-center bg-customGray-200 bg-opacity-[0.04] py-2 gap-3 text-sm font-semibold hover:bg-opacity-[0.07] transist mb-5"
            onClick={() => dispatch(logoutUser())}
          >
            <h2>Add account</h2>
            <FaPlus />
          </div>
        </div>
      </div>
      <div className="flex gap-3 p-4">
        <div
          className="rounded-3xl w-full flex justify-center items-center bg-customGray-200 bg-opacity-[0.04] py-2 gap-3 text-sm font-semibold hover:bg-opacity-[0.07] transist"
          onClick={() => dispatch(logoutUser(id))}
        >
          <h2>Log Out</h2>
          <FaArrowRightLong />
        </div>
        <Link
          to="/wallet"
          className="rounded-3xl w-full flex justify-center items-center bg-customGray-200 bg-opacity-[0.04] py-2 gap-3 text-sm font-semibold hover:bg-opacity-[0.07] transist"
        >
          <h2>Manage wallets</h2>
          <FaArrowRightLong />
        </Link>
      </div>
    </div>
  );
};

export default MainWalletModal;
