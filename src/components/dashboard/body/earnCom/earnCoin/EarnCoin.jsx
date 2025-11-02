import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CoinsContext } from "../../../../../context/coins/CoinsContext";
import HeaderBack from "../../../../../reuseableCom/headerBack/HeaderBack";
import useConvertAmountToCoin from "../../../../../hooks/useConvertAmountToCoin";
import { FaChevronRight } from "react-icons/fa";
import clsx from "clsx";
import useDaysWithdrawal from "../../../../../hooks/useDaysWithdrawal";
import MinerGraph from "./MinerGraph";
import MiningFee from "./MiningFee";
import useFormatePrice from "../../../../../hooks/useFormatePrice";
import { useSelector } from "react-redux";
import { selectedCoinMiner } from "../../../../../redux/features/coinMiner/coinMinerSlice";
import { MiningActivatedContext } from "../../../../../context/miningActivated/MiningActivatedContext";
import { MiningFeeContext } from "../../../../../context/miningFee/MiningFeeContext";

const EarnCoin = () => {
  const { coinslug } = useParams();
  const { coins } = useContext(CoinsContext);
  const navigate = useNavigate();
  const coinMiner = useSelector(selectedCoinMiner);
  const { saveValue, loading } = useContext(MiningActivatedContext);
  const { miningFeeValue } = useContext(MiningFeeContext);
  const findSlug = coins?.find((coin) => coin.slug === coinslug);
  const findTimeId = coinMiner?.find((coin) => coin.coinId === findSlug?.id);
  const price = findSlug?.availableBalance;
  const priceCoin = findSlug?.quote.USD.price;
  const { daysLocked } = useDaysWithdrawal(price);
  const { formatePrice } = useFormatePrice();

  const roi = price * 2;
  const total = price + roi;
  const remainingBalance = 500 - price;
  const { coinAmount: available } = useConvertAmountToCoin(price, priceCoin);
  const { coinAmount: minimuAmount } = useConvertAmountToCoin(500, priceCoin);
  const { coinAmount: roiCoin } = useConvertAmountToCoin(roi, priceCoin);
  const { coinAmount: totalCoin } = useConvertAmountToCoin(total, priceCoin);
  const { coinAmount: remainingBalanceCoin } = useConvertAmountToCoin(
    remainingBalance,
    priceCoin
  );

  const coin = `Earn on ${findSlug?.symbol}`;
  const activated = price <= 499.99;

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : saveValue[findSlug?.id] ? (
        <>
          {miningFeeValue[findSlug?.id] ? (
            <MiningFee
              initialBalance={findTimeId?.initialBalance}
              findSlug={findSlug}
            />
          ) : (
            <MinerGraph findSlug={findSlug} />
          )}
        </>
      ) : (
        <div className="h-screen px-5 py-4 wallet-container">
          <HeaderBack back details={coin} />
          <div className="px-4 py-2 space-y-2 text-sm bg-customGray-300 rounded-xl ">
            <div className="allFlex  [&>h2]:text-customGray-200 [&>h2]:text-opacity-80">
              <h2>Available</h2>
              <div className="font-bold">
                {available > 0 ? available.toFixed(2) : "0"}
                <span className="pl-1">{findSlug?.symbol}</span>
              </div>
            </div>
            <div className="allFlex [&>h2]:text-customGray-200 [&>h2]:text-opacity-80">
              <h2>Minimum Amount</h2>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4">
                  <img src={findSlug?.logo} alt={findSlug?.name} />
                </div>
                <p className="font-bold">
                  {minimuAmount.toFixed(3)} {findSlug?.symbol}
                </p>
              </div>
            </div>
            {activated ? (
              <p className="py-3 text-center text font- text-customRed-100">
                Your balance is below the minimum required amount{" "}
                <span>
                  ({minimuAmount.toFixed(3)} {findSlug?.symbol} ($500))
                </span>
                . Please deposit ({remainingBalanceCoin.toFixed(3)}{" "}
                {findSlug?.symbol} (${remainingBalance.toFixed(2)})) to
                continue.
              </p>
            ) : (
              <>
                <div className="allFlex [&>h2]:text-customGray-200 [&>h2]:text-opacity-80 ">
                  <h2>ROI</h2>
                  <div className="gap-1 font-bold">
                    <p className="text-end">
                      {roiCoin.toFixed(3)} {findSlug?.symbol}
                    </p>
                    <p className="text-xs text-customGray-200 text-opacity-85 text-end">
                      (${formatePrice(roi)})
                    </p>
                  </div>
                </div>
                <div className="allFlex ">
                  <div className="flex items-center gap-1.5 [&>h2]:text-customGray-200 [&>h2]:text-opacity-80">
                    <h2>Lock Time</h2>
                  </div>
                  <p className="font-bold">~{daysLocked} days</p>
                </div>
                <div className="allFlex [&>h2]:text-customGray-200 [&>h2]:text-opacity-80">
                  <h2>Total (Initial + ROI)</h2>
                  <div className="gap-1 font-bold">
                    <p className="text-end">
                      {totalCoin.toFixed(3)} {findSlug?.symbol}
                    </p>
                    <p className="text-xs text-customGray-200 text-opacity-85 text-end">
                      (${formatePrice(total)})
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div
            className={clsx(
              "mt-7 allFlex pb-3 border-b border-customGray-200  border-opacity-10 cursor-pointer",
              activated
                ? "text-customBlue-100 text-opacity-45"
                : "text-customBlue-100"
            )}
            onClick={() =>
              !activated && navigate(`/earn/mining/${findSlug?.slug}`)
            }
          >
            <p className="text-sm font-bold tracking-wider">Activate Mining</p>
            <p className="text-xl">
              <FaChevronRight />
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default EarnCoin;
