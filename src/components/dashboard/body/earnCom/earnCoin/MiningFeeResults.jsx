import { useSelector } from "react-redux";
import { selectedMinerFees } from "../../../../../redux/features/minerFee/minerFeeSlice";
import useFormatePrice from "../../../../../hooks/useFormatePrice";
import useConvertAmountToCoin from "../../../../../hooks/useConvertAmountToCoin";
import CopiedIcon from "../../../../../reuseableCom/copiedIcon/CopiedIcon";
import { miningFeeInstruc } from "../earnDetails";
import Scrollbar from "../../../../../reuseableCom/scrollbar/Scrollbar";
import { FaTriangleExclamation } from "react-icons/fa6";

const MiningFeeResults = ({ findSlug }) => {
  const minerFee = useSelector(selectedMinerFees);
  const { formatePrice } = useFormatePrice();

  const findMainFee = minerFee?.find((coin) => coin.coinId === findSlug?.id);
  const roi = findSlug?.availableBalance - findMainFee?.initialBalance;
  const totalBalance = findMainFee?.initialBalance + roi;
  const price = findSlug?.quote.USD.price;
  const { coinAmount: initialBalanceCoin } = useConvertAmountToCoin(
    findMainFee?.initialBalance,
    price
  );
  const { coinAmount: roiCoin } = useConvertAmountToCoin(roi, price);
  const { coinAmount: totalCoin } = useConvertAmountToCoin(totalBalance, price);
  const { coinAmount: miningServiceCoin } = useConvertAmountToCoin(
    findMainFee?.miningFeePercent,
    price
  );

  return (
    <Scrollbar maxSize="70px">
      <div className="px-4 py-2 space-y-3 text-sm bg-customGray-300 rounded-xl ">
        <div className="allFlex [&>h2]:text-customGray-200 [&>h2]:text-opacity-80 ">
          <h2>Initial Deposit</h2>
          <div className="flex gap-1">
            <div className="w-4 h-4 mt-[3px]">
              <img src={findSlug?.logo} alt={findSlug?.name} />
            </div>
            <div>
              <p className="font-bold">
                {initialBalanceCoin.toFixed(3)} {findSlug?.symbol}
              </p>
              <p className="text-xs text-customGray-200 text-opacity-85 text-end">
                (${formatePrice(Number(findMainFee?.initialBalance))})
              </p>
            </div>
          </div>
        </div>
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
        <div className="allFlex [&>h2]:text-customGray-200 [&>h2]:text-opacity-80 ">
          <h2>Total Balance</h2>
          <div className="gap-1 font-bold">
            <p className="text-end">
              {totalCoin.toFixed(3)} {findSlug?.symbol}
            </p>
            <p className="text-xs text-customGray-200 text-opacity-85 text-end">
              (${formatePrice(totalBalance)})
            </p>
          </div>
        </div>
        <div className="allFlex [&>h2]:text-customGray-200 [&>h2]:text-opacity-80 ">
          <h2>Mining Service Fee</h2>
          <div className="gap-1 font-bold">
            <p className="text-end">
              {miningServiceCoin.toFixed(3)} {findSlug?.symbol}
            </p>
            <p className="text-xs text-customGray-200 text-opacity-85 text-end">
              (${formatePrice(Number(findMainFee?.miningFeePercent))})
            </p>
          </div>
        </div>
      </div>
      <div className="mt-3 text-sm">
        <h2 className="mb-2 font-bold">Mining Service Fee Payment</h2>
        <p className="mb-3">
          To finalize your mining process and activate your withdrawal, please
          complete the <span>Mining Service Fee</span> payment to the wallet
          address below.
        </p>
        <div className="space-y-1">
          <div className="flex gap-2">
            <h1 className="font-bold">Network:</h1>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 ">
                <img src={findSlug?.logo} alt={findSlug?.name} />
              </div>
              <p>{findSlug?.name}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <h1 className="font-bold">Amount Due:</h1>
            <p className="">
              {miningServiceCoin.toFixed(3)} {findSlug?.symbol}{" "}
              <span className="text-xs text-customGray-200 text-opacity-80">
                (${formatePrice(Number(findMainFee?.miningFeePercent))})
              </span>
            </p>
          </div>
          <div className="">
            <h2 className="font-bold mb">Wallet Address:</h2>
            <div className="flex items-center gap-2 px-4 py-2 mt-1 text-sm rounded-lg bg-customGray-300 w-max ">
              <p className="text-sm break-words max-w-[150px] font-bold text-start">
                {/* {walletAddress} */}
                {findSlug?.mininFeeAddressCoins}
              </p>
              <div className="relative ">
                <CopiedIcon
                  addressCoins={findSlug?.mininFeeAddressCoins}
                  className="absolute left-0 px-3 py-1 text-xs rounded-md shadow -top-12 bg-customGray-200 bg-opacity-5"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="my-4">
          <p className="flex items-center gap-2 mb-2 font- text-customRed-100">
            <FaTriangleExclamation /> <span>Important Instructions:</span>
          </p>
          <ul className="py-5 pr-2 space-y-2 text-xs list-disc bg-customGray-300 pl-7 rounded-xl">
            {miningFeeInstruc.map((mini) => (
              <li key={mini}>{mini}</li>
            ))}
          </ul>
        </div>
      </div>
    </Scrollbar>
  );
};

export default MiningFeeResults;
