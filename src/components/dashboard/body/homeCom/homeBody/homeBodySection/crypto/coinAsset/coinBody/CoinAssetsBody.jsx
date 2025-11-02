import { Link, useNavigate } from "react-router-dom";
import { coinAssets } from "../../../../../homeDetails";
import PerHistoryCoin from "../../../../../../historyCom/PerHistoryCoin";
import { useContext } from "react";
import SwitchPriceProvider from "../../../../../../../../../context/switchPrice/SwitchPriceProvider";
import { SwitchPriceContext } from "../../../../../../../../../context/switchPrice/SwitchPriceContext";
import { useSelector } from "react-redux";
import { selectedCoinMiner } from "../../../../../../../../../redux/features/coinMiner/coinMinerSlice";
import useConvertAmountToCoin from "../../../../../../../../../hooks/useConvertAmountToCoin";
import { MiningFeeContext } from "../../../../../../../../../context/miningFee/MiningFeeContext";
import { MiningContext } from "../../../../../../../../../context/mining/MiningContext";

const CoinAssetsBody = ({
  logo,
  symbol,
  slug,
  coinPrice,
  availableBalance,
  loading,
  usdPrice,
  id,
}) => {
  const coinMiner = useSelector(selectedCoinMiner);
  const { miningFeeValue } = useContext(MiningFeeContext);
  const { saveValue: miningStrated } = useContext(MiningContext);
  const { saveValue } = useContext(SwitchPriceContext);
  const findTheMainCoin = coinMiner?.find(
    (coin) => coin.coinMiningSlug === slug
  );
  const cleanBalance = String(availableBalance).replace(/,/g, "");
  const roi = Number(cleanBalance) - findTheMainCoin?.initialBalance;
  const { coinAmount } = useConvertAmountToCoin(roi, usdPrice);
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="w-12 h-12 mb-3">
          <img src={logo} alt={symbol} className="r" />
        </div>

        <div className="mb-6 text-center">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <h1 className="text-[32px] font-bold">
                {saveValue ? (
                  <p className="">..........</p>
                ) : (
                  <p>{coinPrice}</p>
                )}
              </h1>
              <div className="-mt-1 text-sm text-customGray-200 text-opacity-60">
                {saveValue ? (
                  <p className="">..........</p>
                ) : (
                  <p>${availableBalance}</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="px-5 mb-5 allFlex">
        {coinAssets.map((asse) => {
          const { id, icon, path, element } = asse;
          return (
            <Link key={id} to={`${path}/${slug}`}>
              <p className="w-10 h-10 mb-2 text-lg rounded-full allFlex2 bg-opacity-5 bg-customGray-200 text-customGray-200 text-opacity-80">
                {icon()}
              </p>
              <h3 className="text-sm font-bold text-center ">{element}</h3>
            </Link>
          );
        })}
      </div>
      {miningStrated && (
        <div className="px-4 py-3 border allFlex rounded-2xl bg-customGray-200 bg-opacity-5 border-customGray-100">
          <div>
            <h3 className="text-sm font-bold text-opacity-60 text-customGray-200">
              {findTheMainCoin
                ? miningFeeValue[id]
                  ? "Mining Completed"
                  : "Mining in progress"
                : "Alpha Mining"}
            </h3>
            <p className="text-lg font-bold">
              {findTheMainCoin ? coinAmount.toFixed(3) : "0"}{" "}
              <span>{symbol}</span>
            </p>
            {!findTheMainCoin && (
              <p className="text-xs text-customBlue-100">
                Get up to 30.58% APR
              </p>
            )}
          </div>
          <button
            onClick={() => navigate(`/earn/${slug}`)}
            className="p-4 text-white rounded-full bg-customBlue-100"
          >
            {findTheMainCoin
              ? miningFeeValue[id]
                ? "View Results"
                : "View Chart"
              : "Get started"}
          </button>
        </div>
      )}
      <div>
        <PerHistoryCoin slug={slug} miningStrated={miningStrated} />
      </div>
    </div>
  );
};

export default CoinAssetsBody;
