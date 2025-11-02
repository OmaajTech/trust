import { FaChevronRight } from "react-icons/fa";
import HeaderBack from "../../../../reuseableCom/headerBack/HeaderBack";
import { Link } from "react-router-dom";
import { logoutUser } from "../../../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { FetchUserDataContext } from "../../../../context/fetchUserData/FetchUserDataContext";

const WalletCom = () => {
  const { userInfo } = useContext(FetchUserDataContext);
  const dispatch = useDispatch();
  const maxHeight = userInfo?.backUpPhrase ? "190px" : "220px";

  return (
    <div>
      <HeaderBack back details="Wallets" />
      <div>
        <h2 className="mb-2 text-sm font-bold">Mnemonic</h2>
        <div className="p-4 space-y-3 rounded-xl bg-customGray-300">
          <Link to="/wallet-details" className="allFlex">
            <div>
              <h3 className="font-bold">Main Wallet</h3>
              <p className="text-sm">Accounts</p>
            </div>
            <p className="text-xl">
              <FaChevronRight />
            </p>
          </Link>
          {!userInfo?.backUpPhrase && (
            <Link to="/backup-phrase" className="allFlex text-customBlue-100">
              <p className="text-sm font-bold">Back up your Secret Phrase</p>
              <p className="text-xl">
                <FaChevronRight />
              </p>
            </Link>
          )}
        </div>
      </div>
      <div
        className="relative"
        style={{ height: `calc(100vh - ${maxHeight})` }}
      >
        <button
          onClick={() => dispatch(logoutUser())}
          className="absolute bottom-0 bg-customBlue-100 text-white font-bold rounded-full w-full h-[52px] hover:bg-opacity-70"
        >
          Add new Wallet
        </button>
      </div>
    </div>
  );
};

export default WalletCom;
