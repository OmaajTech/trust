import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { CoinsContext } from "../../../../../../../../context/coins/CoinsContext";
import { FaArrowLeftLong } from "react-icons/fa6";
import CoinAssetsBody from "./coinBody/CoinAssetsBody";
import HeaderBack from "../../../../../../../../reuseableCom/headerBack/HeaderBack";
import useConvertAmountToCoin from "../../../../../../../../hooks/useConvertAmountToCoin";
import useFormatePrice from "../../../../../../../../hooks/useFormatePrice";
import { MdLocalGasStation } from "react-icons/md";
import { NetworkFeeContext } from "../../../../../../../../context/networkFee/NetworkFeeContext";
import { useSelector } from "react-redux";
import { selectedTransactionLoading } from "../../../../../../../../redux/features/transactions/transactionSlice";

const CoinAsset = () => {
  const { coinslug } = useParams();
  const { coins } = useContext(CoinsContext);
  const loading = useSelector(selectedTransactionLoading);
  const { networkFee: netWorkFee } = useContext(NetworkFeeContext);
  const { formatePrice } = useFormatePrice();

  const findCoinSlug = coins?.find((coin) => coin.slug === coinslug);

  const { coinAmount } = useConvertAmountToCoin(
    findCoinSlug?.availableBalance,
    findCoinSlug?.quote.USD.price
  );

  const fixation = coinAmount > 0 ? coinAmount.toFixed(4) : "0";

  return (
    <div className="px-5 py-4">
      <HeaderBack details={findCoinSlug?.symbol} links="/" />
      <div className="flex items-center gap-0.5 -mt-2">
        <p className="text-customGreen-100">
          <MdLocalGasStation />
        </p>
        <span className="text-xs text-customGray-200 text-opacity-80">
          ${netWorkFee.toFixed(2)}
        </span>
      </div>
      <CoinAssetsBody
        logo={findCoinSlug?.logo}
        symbol={findCoinSlug?.symbol}
        slug={findCoinSlug?.slug}
        availableBalance={formatePrice(Number(findCoinSlug?.availableBalance))}
        coinPrice={fixation}
        loading={loading}
        usdPrice={findCoinSlug?.quote.USD.price}
        id={findCoinSlug?.id}
      />
    </div>
  );
};

export default CoinAsset;
