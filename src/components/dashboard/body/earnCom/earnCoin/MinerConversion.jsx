import { Navigate, useNavigate, useParams } from "react-router-dom";
import { CoinsContext } from "../../../../../context/coins/CoinsContext";
import { useContext } from "react";
import HeaderBack from "../../../../../reuseableCom/headerBack/HeaderBack";
import { earnsDetaisl } from "../earnDetails";
import useDaysWithdrawal from "../../../../../hooks/useDaysWithdrawal";
import clsx from "clsx";
import useFormState from "../../../../../hooks/useFormState";
import { MiningKeysContext } from "../../../../../context/miningKeys/MiningKeysContext";
import { useDispatch, useSelector } from "react-redux";
import { MiningActivatedContext } from "../../../../../context/miningActivated/MiningActivatedContext";
import { AuthContext } from "../../../../../context/auth/AuthContext";
import { addToFiresStoreUserId } from "../../../../../redux/features/thunk/thunkSlice";
import { selectedCoinMinerLoading } from "../../../../../redux/features/coinMiner/coinMinerSlice";
import { ClipLoader } from "react-spinners";
import useLazyLoading from "../../../../../hooks/useLazyLoading";

const MinerConversion = () => {
  const { usersDetails } = useContext(AuthContext);
  const coinMinerLoading = useSelector(selectedCoinMinerLoading);
  const { keys, getNewKeyState } = useContext(MiningKeysContext);
  const { formState, handleFormStateChange, errorformState, setFormState } =
    useFormState(
      {
        miningForm: "",
      },
      keys
    );
  const { coinslug } = useParams();
  const { coins, loading } = useContext(CoinsContext);
  const { saveValue, handleToggleId } = useContext(MiningActivatedContext);
  const { showLoading } = useLazyLoading(coinMinerLoading);

  const findSlug = coins?.find((coin) => coin.slug === coinslug);
  const price = findSlug?.availableBalance;
  const { daysLocked } = useDaysWithdrawal(price);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const coin = `Mining ${findSlug?.symbol}`;

  const activateMining = () => {
    if (formState.miningForm !== keys) return;
    getNewKeyState();
    const newState = {
      coinMiningSlug: findSlug?.slug,
      initialBalance: price,
      coinId: findSlug?.id,
      timeStamps: new Date().toISOString(),
    };
    setFormState((prevForm) => ({
      ...prevForm,
      miningForm: "",
    }));
    dispatch(
      addToFiresStoreUserId({
        uid: usersDetails?.uid,
        fieldName: "coinMiner",
        newState: newState,
      })
    );
    handleToggleId(findSlug?.id);
    navigate(`/earn/${findSlug?.slug}`, { replace: true });
  };

  if (saveValue[findSlug?.id]) {
    return <Navigate to={`/earn/${findSlug?.slug}`} replace />;
  }
  return (
    <>
      <>
        {!saveValue[findSlug?.id] && (
          <div className="h-screen px-5 py-4 wallet-container">
            <HeaderBack back details={coin} />
            <div>
              <label className="text-sm font-bold">Mining Key</label>
              <input
                type="text"
                value={formState.miningForm}
                name="miningForm"
                onChange={handleFormStateChange}
                className={clsx(
                  "w-full rounded-lg outline-none border border-customGray-200 px-1 border-opacity-30 mt-3 h-14",
                  errorformState.miningForm
                    ? "border border-customRed-100 focus:border-customRed-100"
                    : "border border-opacity-25 border-customGray-200 focus:border-customBlue-100"
                )}
              />
              {errorformState.miningForm && (
                <p className="mt-2 text-xs text-customRed-100">
                  {errorformState.miningForm}
                </p>
              )}
            </div>
            <ul className="py-5 mt-10 space-y-2 text-xs list-disc bg-customGray-300 px-7 rounded-xl">
              {earnsDetaisl.map((earn) => (
                <li key={earn}>{earn}</li>
              ))}
              <li>
                Withdrawals available approximately {daysLocked} days after
                deactivation
              </li>
            </ul>
            <div
              className="relative w-full h-full mt-5"
              style={{ height: "calc(100vh - 510px)" }}
            >
              <button
                disabled={formState.miningForm !== keys}
                className={clsx(
                  "absolute bottom-0 w-full transist h-[48px] rounded-full text-white tracking-wider font-bold allFlex2 gap-2",
                  formState.miningForm === keys
                    ? "bg-customPurple-100 cursor-pointer"
                    : "bg-customPurple-100 bg-opacity-50 cursor-not-allowed"
                )}
                onClick={activateMining}
              >
                Activate Mining
              </button>
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default MinerConversion;
