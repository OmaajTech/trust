import { Link } from "react-router-dom";
import HeaderBack from "../../../../reuseableCom/headerBack/HeaderBack";
import { fundDetails } from "./fundDetails";
import { FaAngleRight } from "react-icons/fa6";
import clsx from "clsx";

const FundCom = () => {
  return (
    <div>
      <HeaderBack links="/" details="Fund your wallet" />
      <div className="py-6 pl-4 pr-5 space-y-10 rounded-2xl bg-customGray-300">
        {fundDetails.map((fund) => {
          const { id, icon, path, info, title } = fund;
          return (
            <Link to={path} key={id} className="allFlex">
              <div className="flex items-center gap-3">
                <div
                  className={clsx(
                    "w-10 h-10  rounded-full bg-opacity-15 allFlex2 text-customBlue-100 bg-customBlue-100",
                    title === "Deposit from an exchange" && "text-2xl",
                    title === "Buy crypto" && "text-lg"
                  )}
                >
                  {icon()}
                </div>
                <div className="leading-[1.3rem]">
                  <h1 className="font-bold">{title}</h1>
                  <p className="text-sm text-opacity-75 text-customGray-200">
                    {info}
                  </p>
                </div>
              </div>
              <p className="text-lg text-opacity-85 text-customGray-200">
                {" "}
                <FaAngleRight />
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FundCom;
