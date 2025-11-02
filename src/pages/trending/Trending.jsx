import Header from "../../components/dashboard/header/Header";
import TrendingCom from "../../components/trendingCom/TrendingCom";

const Trending = () => {
  return (
    <>
      <div className="h-screen px-4 py-5 wallet-container">
        <TrendingCom />
      </div>
      <Header />
    </>
  );
};

export default Trending;
