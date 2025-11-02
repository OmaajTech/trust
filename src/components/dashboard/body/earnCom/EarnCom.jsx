import { useContext, useState } from "react";
import HeaderBack from "../../../../reuseableCom/headerBack/HeaderBack";
import Scrollbar from "../../../../reuseableCom/scrollbar/Scrollbar";
import Header from "../../header/Header";
import EarnConversion from "./EarnConversion";
import { MiningContext } from "../../../../context/mining/MiningContext";
import EarnCoinCom from "./earnCoin/EarnCoinCom";
import BasicLoader from "../../../../reuseableCom/loading/BasicLoader";

const EarnCom = () => {
  const [miningSearched, setMiningSearched] = useState("");
  const { saveValue, handleMining, loading } = useContext(MiningContext);
  return (
    <div>
      <div className="h-screen px-5 py-4 wallet-container">
        <HeaderBack links="/" details="Trust Alpha Mining" />
        {loading ? (
          <BasicLoader />
        ) : saveValue ? (
          <EarnCoinCom
            miningSearched={miningSearched}
            setMiningSearched={setMiningSearched}
          />
        ) : (
          <Scrollbar maxSize="145px">
            <div className="pr-2 ">
              <div className="mb-5 border-b pb-7 border-b-customGray-200 ">
                <h1 className="mb-1 text-lg font-bold">
                  Earn More with Trust Alpha Minning
                </h1>
                <p className="text-sm leading-[23px] text-black">
                  Trust Alpha Mining is your gateway to financial innovation and
                  digital independence. It transforms your computing power into
                  real, measurable rewards while securing the global blockchain
                  network. Beyond just earning passive income, mining positions
                  you at the heart of the digital economy — a space where
                  technology, opportunity, and financial growth intersect. Trust
                  Alpha Mining can build long-term digital assets, generate
                  consistent crypto rewards, and take part in shaping the future
                  of decentralized finance.
                </p>
              </div>
              <EarnConversion />
              <button
                onClick={handleMining}
                className="w-full h-12 mt-5 mb-5 text-sm font-bold tracking-wider text-white rounded-full bg-customPurple-100"
              >
                Get Started
              </button>
            </div>
          </Scrollbar>
        )}
      </div>
      <Header />
    </div>
  );
};

export default EarnCom;
