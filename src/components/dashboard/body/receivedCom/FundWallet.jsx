import { exchange } from "./receiveDetails";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";

const FundWallet = () => {
  return (
    <div className="mt-6 ">
      <div className="mb-3 text-sm font-semibold">
        <h2>Deposit from exchange</h2>
      </div>
      <div className="p-5 space-y-3 rounded-3xl bg-customGray-300">
        {exchange.map((exch) => {
          const { url, name, img } = exch;
          return (
            <Link to={url} key={name} className="allFlex">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10">
                  <img src={img} alt="" className="object-cover" />
                </div>
                <p className="text-sm font-semibold">Deposit from {name}</p>
              </div>
              <FaAngleRight />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FundWallet;
