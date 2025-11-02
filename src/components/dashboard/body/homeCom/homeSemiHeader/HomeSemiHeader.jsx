import SemiHeaderBalance from "./SemiHeaderBody/SemiHeaderBalance";
import SemiHeaderFundingTools from "./SemiHeaderBody/SemiHeaderFundingTools";

const HomeSemiHeader = () => {
  return (
    <div className="mt-5">
      <SemiHeaderBalance />
      <SemiHeaderFundingTools />
    </div>
  );
};

export default HomeSemiHeader;
