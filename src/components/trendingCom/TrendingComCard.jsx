import clsx from "clsx";
import useFormatePrice from "../../hooks/useFormatePrice";
import { useNavigate } from "react-router-dom";

const TrendingComCard = ({ coin }) => {
  const { logo, quote, name, symbol } = coin;
  const { market_cap, percent_change_24h, price, volume_24h } = quote.USD;
  const { formatePrice } = useFormatePrice();
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/assets/${coin?.slug}`)}>
      <div className="flex items-center w-full gap-5 py-3 cursor-pointer hover:bg-customGray-200 hover:bg-opacity-5">
        <div className="flex gap-2 items-center w-[161px] shrink-0">
          <div className="w-9 h-9">
            <img src={logo} alt={name} />
          </div>
          <div>
            <h1 className="font-bold">{symbol}</h1>
            <p className="text-sm text-opacity-40 text-customGray-200">
              {name}
            </p>
          </div>
        </div>
        <div className="w-[172px] shrink-0 text-end">
          <h3 className="">${formatePrice(price)}</h3>
          <p
            className={clsx(
              "text-sm",
              percent_change_24h > 0
                ? "text-customGreen-100"
                : "text-customRed-100"
            )}
          >
            {percent_change_24h > 0
              ? `+${formatePrice(percent_change_24h)}`
              : formatePrice(percent_change_24h)}
            %
          </p>
        </div>
        <h2 className="w-[146px] shrink-0 text-end">
          ${formatePrice(volume_24h)}
        </h2>
        <h2 className="w-[153px] shrink-0 text-end">
          ${formatePrice(market_cap)}
        </h2>
      </div>
    </div>
  );
};

export default TrendingComCard;
