import { useContext } from "react";
import HeaderBack from "../../../../../reuseableCom/headerBack/HeaderBack";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { CoinMininigInfoContext } from "../../../../../context/coinMininigInfo/CoinMininigInfoContext";
import MiningFeeResults from "./MiningFeeResults";
import { MiningContext } from "../../../../../context/mining/MiningContext";
import { useDispatch, useSelector } from "react-redux";
import { MiningActivatedContext } from "../../../../../context/miningActivated/MiningActivatedContext";
import { MiningFeeContext } from "../../../../../context/miningFee/MiningFeeContext";
import { AuthContext } from "../../../../../context/auth/AuthContext";
import { selectedCoinMiner } from "../../../../../redux/features/coinMiner/coinMinerSlice";
import { deleteInUserFirestore } from "../../../../../redux/features/thunk/thunkSlice";

const MiningFee = ({ findSlug }) => {
  const { usersDetails } = useContext(AuthContext);
  const { miningResultss, handleId: handleBackToFalse } = useContext(
    CoinMininigInfoContext
  );
  const { handleOverMiningToTrue } = useContext(MiningContext);
  const { handleToggleId } = useContext(MiningActivatedContext);
  const { handleId } = useContext(MiningFeeContext);
  const minerFetch = useSelector(selectedCoinMiner);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const minerId = minerFetch?.find(
    (miner) => miner.coinMiningSlug === findSlug?.slug
  );

  return (
    <div className="h-screen px-5 py-4 wallet-container">
      <HeaderBack back details="Final Mining Summary" />
      <div>
        {miningResultss[findSlug?.id] ? (
          <MiningFeeResults findSlug={findSlug} />
        ) : (
          <div className="px-4 py-2 space-y-2 text-sm bg-customGray-300 rounded-xl ">
            <h1 className="mb-2 font-bold">Finalizing Mining Results</h1>
            <p className="text-customRed-100 text">
              Please wait while we calculate your final balance and ROI.{" "}
              <span className="font-bold">This may take a few moments!.</span>{" "}
            </p>
          </div>
        )}
      </div>

      {/* <div
        className="relative w-full h-full mt-5"
        style={{ height: "calc(100vh - 80%)" }}
      >
        <button
          className={clsx(
            "absolute bottom-0 w-full transist h-[48px] rounded-full text-white tracking-wider font-bold bg-customPurple-100 cursor-pointer"
          )}
          onClick={() =>
            miningResultss[findSlug?.id]
              ? refactorySettings()
              : navigate(`/earn/adminMiner/${findSlug?.slug}`)
          }
        >
          {miningResultss[findSlug?.id] ? "Mining Fee Paid" : "Add Mining Fee"}
        </button>
      </div> */}
    </div>
  );
};

export default MiningFee;
