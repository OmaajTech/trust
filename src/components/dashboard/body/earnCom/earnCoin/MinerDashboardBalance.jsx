import clsx from "clsx";
import useFormatePrice from "../../../../../hooks/useFormatePrice";

const MinerDashboardBalance = ({ findSlug }) => {
  const { formatePrice, formateFigures } = useFormatePrice();

  const coinsUsd = findSlug?.quote.USD;

  return (
    <div className="px-4 pt-5 customTablet1:border-r customTablet1:h-screen customTablet1:pt-10">
      <div className="flex items-center gap-1 mb-2">
        <div className="w-6 h-6">
          <img src={findSlug?.logo} alt={findSlug?.name} />
        </div>
        <div className="flex items-center gap-1">
          <h1 className="text-lg font-bold text-white">{findSlug?.name}</h1>
          <p className="mt-1 text-xs text-customGray-300 text-opacity-85">
            {findSlug?.symbol}{" "}
            <span className="text-[10px] bg-customGray-300 bg-opacity-10 ml-1 px-2 py-[1px] rounded-full">
              #{findSlug?.cmc_rank}
            </span>
          </p>
        </div>
      </div>
      <div className="mb-2">
        <p className="text-xs text-customGray-300 text-opacity-85">
          Available Balance
        </p>
        <h2 className="text-[32px] text-white font-bold">
          ${formatePrice(findSlug?.availableBalance)}
        </h2>
      </div>
      <div className="w-full">
        <div className="py-3 mb-3 text-center border border-customGray-100 rounded-xl border-opacity-80">
          <p className="mb-1 text-xs text-customGray-300 text-opacity-85">
            {findSlug?.symbol} price today
          </p>
          <div className="gap-2 allFlex2">
            <h3 className="text-xl font-bold text-white">
              ${formatePrice(coinsUsd.price)}
            </h3>
            <p
              className={clsx(
                "text-xs font-bold",
                coinsUsd.percent_change_30d > 0
                  ? "text-customGreen-100"
                  : "text-customRed-100"
              )}
            >
              {coinsUsd.percent_change_30d.toFixed(2)}% (1mo)
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="py-2 text-center border border-customGray-100 rounded-xl border-opacity-80">
            <p className="mb-1 text-xs text-customGray-300 text-opacity-85">
              Market cap
            </p>
            <div className="gap-2 allFlex2">
              <h3 className="text-sm font-bold text-white">
                ${formateFigures(coinsUsd.market_cap)}
              </h3>
              <p
                className={clsx(
                  "text-xs font-bold",
                  coinsUsd.percent_change_24h > 0
                    ? "text-customGreen-100"
                    : "text-customRed-100"
                )}
              >
                {coinsUsd.percent_change_24h > 0 && "+"}
                {coinsUsd.percent_change_24h.toFixed(2)}%
              </p>
            </div>
          </div>
          <div className="py-2 text-center border border-customGray-100 rounded-xl border-opacity-80">
            <p className="mb-1 text-xs text-customGray-300 text-opacity-85">
              Volume (24h)
            </p>
            <div className="gap-2 allFlex2">
              <h3 className="text-sm font-bold text-white">
                ${formateFigures(coinsUsd.volume_24h)}
              </h3>
              <p
                className={clsx(
                  "text-xs font-bold",
                  coinsUsd.volume_change_24h > 0
                    ? "text-customGreen-100"
                    : "text-customRed-100"
                )}
              >
                {coinsUsd.volume_change_24h > 0 && "+"}
                {coinsUsd.volume_change_24h.toFixed(2)}%
              </p>
            </div>
          </div>
          <div className="py-2 text-center border border-customGray-100 rounded-xl border-opacity-80">
            <p className="mb-1 text-xs text-customGray-300 text-opacity-85">
              FDV
            </p>
            <h3 className="text-sm font-bold text-white">
              ${formateFigures(coinsUsd.fully_diluted_market_cap)}
            </h3>
          </div>
          <div className="py-2 text-center border border-customGray-100 rounded-xl border-opacity-80">
            <p className="mb-1 text-xs text-customGray-300 text-opacity-85">
              Vol/Mkt Cap (24h)
            </p>
            <h3 className="text-sm font-bold text-white">
              {coinsUsd.percent_change_24h.toFixed(2)}%
            </h3>
          </div>
          <div className="py-2 text-center border border-customGray-100 rounded-xl border-opacity-80">
            <p className="mb-1 text-xs text-customGray-300 text-opacity-85">
              Total supply
            </p>
            <h3 className="text-sm font-bold text-white">
              {formateFigures(findSlug?.total_supply)} {findSlug?.symbol}
            </h3>
          </div>
          <div className="py-2 text-center border border-customGray-100 rounded-xl border-opacity-80">
            <p className="mb-1 text-xs text-customGray-300 text-opacity-85">
              Max. supply
            </p>
            <h3 className="text-sm font-bold text-white">
              {formateFigures(findSlug?.max_supply)} {findSlug?.symbol}
            </h3>
          </div>
          <div className="py-2 text-center border border-customGray-100 rounded-xl border-opacity-80">
            <p className="mb-1 text-xs text-customGray-300 text-opacity-85">
              Circulating supply
            </p>
            <h3 className="text-sm font-bold text-white">
              {formateFigures(findSlug?.circulating_supply)} {findSlug?.symbol}
            </h3>
          </div>
          <div className="py-2 text-center border border-customGray-100 rounded-xl border-opacity-80">
            <p className="mb-1 text-xs text-customGray-300 text-opacity-85">
              Market Pairs
            </p>
            <h3 className="text-sm font-bold text-white">
              {formateFigures(findSlug?.num_market_pairs)} {findSlug?.symbol}
            </h3>
          </div>
        </div>
      </div>
      {/* <button
        className="w-full py-2 mt-10 text-center text-white border border-customGray-100 rounded-xl border-opacity-80"
        onClick={handleId}
      >
        End
      </button> */}
    </div>
  );
};

export default MinerDashboardBalance;
