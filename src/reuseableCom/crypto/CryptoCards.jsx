import clsx from "clsx";
import { Link } from "react-router-dom";
import CopiedIcon from "../copiedIcon/CopiedIcon";
import { useContext, useState } from "react";
import useFormatePrice from "../../hooks/useFormatePrice";
import useConvertAmountToCoin from "../../hooks/useConvertAmountToCoin";
import { SwitchPriceContext } from "../../context/switchPrice/SwitchPriceContext";

const CryptoCards = ({ coin, path }) => {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const { saveValue } = useContext(SwitchPriceContext);
  const { name, symbol, logo, quote, slug, addressCoins, availableBalance } =
    coin;
  const { formatePrice } = useFormatePrice();
  const { coinAmount } = useConvertAmountToCoin(
    availableBalance,
    quote.USD.price
  );

  const handleCopyClick = (e) => {
    e.preventDefault(); // prevent <Link> navigation
    e.stopPropagation(); // this also stops the Link from naviagating i mean the parent component which is the "<Link>"
  };

  return (
    <div>
      <Link
        to={`/${path}/${slug}`}
        className="flex justify-between cursor-pointer text-customGray-200"
        onMouseEnter={() => setIsDisplayed(true)}
        onMouseLeave={() => setIsDisplayed(false)}
      >
        <div className="flex gap-2">
          <div className="w-9 h-9">
            <img src={logo} alt={name} />
          </div>
          <div>
            <div className="flex items-center gap-1 font-bold">
              <h1>{symbol}</h1>
              <p className="px-2 py-[2px] text-xs bg-customGray-200 bg-opacity-10 rounded-2xl">
                {name}
              </p>
              {isDisplayed && (
                <div className="relative ml-3" onClick={handleCopyClick}>
                  <CopiedIcon
                    addressCoins={addressCoins}
                    className="absolute px-3 py-1 text-xs rounded-md shadow bg-customGray-200 bg-opacity-5 left-5 top-full"
                  />
                </div>
              )}
            </div>
            <div className="flex gap-1 text-sm text-opacity-75 text-customGray-200">
              <p>$ {formatePrice(quote.USD.price)}</p>
              <span
                className={clsx(
                  quote.USD.percent_change_24h >= 0
                    ? "text-customGreen-100"
                    : "text-customRed-100"
                )}
              >
                {quote.USD.percent_change_24h >= 0 ? (
                  <p>+{quote.USD.percent_change_24h.toFixed(2)}%</p>
                ) : (
                  <p>{quote.USD.percent_change_24h.toFixed(2)}%</p>
                )}
              </span>
            </div>
          </div>
        </div>
        <div>
          <h1 className="mb-0.5 text-customGray-200 text-end">
            {saveValue ? (
              <p className="text-lg font-bold">.....</p>
            ) : (
              <p> {coinAmount === 0 ? "0" : <> {coinAmount.toFixed(4)}</>}</p>
            )}
          </h1>
          <div className="text-sm text-opacity-75 text-customGray-200">
            {saveValue ? (
              <p className="text-lg font-bold text-end">.....</p>
            ) : (
              <p className="text-end"> ${formatePrice(availableBalance)}</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CryptoCards;
