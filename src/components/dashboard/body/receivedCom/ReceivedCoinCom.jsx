import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CoinsContext } from "../../../../context/coins/CoinsContext";
import HeaderBack from "../../../../reuseableCom/headerBack/HeaderBack";
import { TbExclamationCircleFilled } from "react-icons/tb";
import Qrcode from "./Qrcode";
import FundWallet from "./FundWallet";

const ReceivedCoinCom = () => {
  const { coinslug } = useParams();
  const { coins } = useContext(CoinsContext);

  const findCoinSlug = coins?.find((coin) => coin.slug === coinslug);

  return (
    <div className="h-screen px-5 py-4 wallet-container">
      <HeaderBack back="back" details={`Receive ${findCoinSlug?.symbol}`} />
      <div className="flex items-center gap-2 p-3 mb-6 -mt-2.5 text-xs rounded-lg bg-opacity-15 bg-customYellow-100">
        <p className="text-base text-customYellow-100">
          <TbExclamationCircleFilled />
        </p>
        <p>
          Only send {findCoinSlug?.name} ({findCoinSlug?.symbol}) assets to this
          address. Other assets will be lost forever.
        </p>
      </div>
      <Qrcode findCoinSlug={findCoinSlug} />
      <FundWallet slug={findCoinSlug?.slug} />
    </div>
  );
};

export default ReceivedCoinCom;
