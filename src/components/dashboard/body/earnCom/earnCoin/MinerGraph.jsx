import { useContext } from "react";
import MinerDashboardBalance from "./MinerDashboardBalance";
import MiningCharts from "./MiningCharts";
import { MiningFeeContext } from "../../../../../context/miningFee/MiningFeeContext";

const MinerGraph = ({ findSlug }) => {
  const { miningFeeValue, handleId } = useContext(MiningFeeContext);

  const handleCloseGraph = () => {
    handleId(findSlug?.id, true);
  };

  return (
    <>
      {!miningFeeValue[findSlug?.id] && (
        <div className="w-full h-screen bg-opacity-100 customTablet1:flex bg-customGray-500">
          <div className="flex-[2] w-full customTablet1:h-screen ">
            <MinerDashboardBalance
              findSlug={findSlug}
              handleId={handleCloseGraph}
            />
          </div>
          <div className="flex-[4] w-full customTablet1:h-screen customTablet1:mt-0 mt-10">
            <MiningCharts findSlug={findSlug} />
          </div>
        </div>
      )}
    </>
  );
};

export default MinerGraph;
