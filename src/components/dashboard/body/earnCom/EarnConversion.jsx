import TrustWalletImg from "../../../../assets/earn/earn.png";
import TrustWalletImg1 from "../../../../assets/swap/swap.png";
import { RxDoubleArrowRight } from "react-icons/rx";

const EarnConversion = () => {
  return (
    <div className="bg-customGray-100 bg-opacity-60 mt-5 rounded-2xl pt-4 px-6 pb-8">
      <div>
        <h1 className="text-sm mb-6">Lock TWT, Earn TWM.</h1>
        <div className="flex items-center gap-24">
          <div className="flex items-center gap-3">
            <div className="w-10">
              <img
                src={TrustWalletImg1}
                alt=""
                className="rounded-none object-cover"
              />
            </div>
            <p className="text-sm font-semibold tracking-wider">TWT</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-2xl">
              <RxDoubleArrowRight />
            </p>
            <div className="flex items-center gap-4">
              <div className="w-11">
                <img
                  src={TrustWalletImg}
                  alt=""
                  className="rounded-none object-cover"
                />
              </div>
              <p className="text-sm font-semibold tracking-wider">TWM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarnConversion;
