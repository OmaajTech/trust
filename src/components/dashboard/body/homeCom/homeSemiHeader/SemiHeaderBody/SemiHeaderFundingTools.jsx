import { Link } from "react-router-dom";
import { homeSubHeaderNavs } from "../../homeDetails";
import clsx from "clsx";

const SemiHeaderFundingTools = () => {
  return (
    <div className="flex justify-between w-full mt-4">
      <div className="flex justify-between w-full">
        {homeSubHeaderNavs.map((nav) => {
          const { id, path, element, icon } = nav;
          return (
            <div key={id}>
              <Link to={path}>
                <p
                  className={clsx(
                    "mb-2 rounded-xl h-14 w-14 flex justify-center text-customGray-200 items-center text-[26px] transist",
                    element === "Fund"
                      ? "bg-customBlue-100 text-white hover:bg-opacity-70"
                      : "bg-customGray-200 bg-opacity-[0.06] hover:bg-opacity-10"
                  )}
                >
                  {icon()}
                </p>
              </Link>
              <h3 className="text-sm font-semibold text-center">{element}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SemiHeaderFundingTools;
