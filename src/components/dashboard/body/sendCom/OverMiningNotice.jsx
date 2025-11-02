import { overMiningInstruc } from "./sendDetails";
import { FaTriangleExclamation } from "react-icons/fa6";

const OverMiningNotice = ({
  findCoinSlug,
  coinAmount,
  findTheOverPaidSlug,
}) => {
  return (
    <div className="bg-white p-4 rounded-3xl  customMiniTablet:w-[600px] w-full text-sm">
      <div className="space-y-4">
        <div className="flex gap-2">
          <h1 className="font-bold">Account Notice:</h1>
          <p>Mining Threshold Exceeded</p>
        </div>
        <div className="leading-6">
          Our system has detected that your mining account has exceeded the
          maximum profit threshold for this cycle (“Over-Mining” condition). To
          maintain account stability and validate your mining results, an
          additional{" "}
          <span className="font-bold">
            Initial Deposit of {coinAmount.toFixed(3)} {findCoinSlug?.symbol}{" "}
            <span>
              ($
              {findTheOverPaidSlug?.overPaidMining})
            </span>{" "}
          </span>
          is required to reactivate your mining wallet.
        </div>
        <div>
          <h2 className="font-bold">Required Action:</h2>
          <div className="leading-6">
            Please fund your{" "}
            <span className="font-bold">
              {findCoinSlug?.name} wallet address with{" "}
              <span>
                {coinAmount.toFixed(3)} {findCoinSlug?.symbol}{" "}
              </span>{" "}
              (${findTheOverPaidSlug?.overPaidMining})
            </span>{" "}
            to restore active mining status and enable withdrawal of your mined
            balance.
          </div>
        </div>
        <div className="my-4">
          <p className="flex gap-2 items-center mb-2 font- text-customYellow-100">
            <FaTriangleExclamation /> <span>Important:</span>
          </p>
          <ul className="bg-customGray-300 list-disc pr-2 pl-7  rounded-xl py-5 text-xs space-y-2">
            {overMiningInstruc.map((mini) => (
              <li key={mini}>{mini}</li>
            ))}
          </ul>
        </div>
        <p className="text-[10px] font-bold text-customGray-400">
          Thank you for your prompt attention and continued trust in Trust Alpha
          Mining.
        </p>
      </div>
    </div>
  );
};

export default OverMiningNotice;
