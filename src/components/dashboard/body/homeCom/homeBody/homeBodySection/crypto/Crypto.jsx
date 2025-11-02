import { useContext, useMemo } from "react";
import { CoinsContext } from "../../../../../../../context/coins/CoinsContext";
import CryptoCards from "../../../../../../../reuseableCom/crypto/CryptoCards";
import { ActiveContext } from "../../../../../../../context/activeCoins/ActiveContext";
import SpaceImg from "../../../../../../../assets/home/space.svg";
import { Link } from "react-router-dom";
import Scrollbar from "../../../../../../../reuseableCom/scrollbar/Scrollbar";
import useLazyLoading from "../../../../../../../hooks/useLazyLoading";
import { FetchUserDataContext } from "../../../../../../../context/fetchUserData/FetchUserDataContext";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import SkelentonCard from "../../../../../../../reuseableCom/loading/SkelentonCard";

const Crypto = () => {
  const { error, selectedItems } = useContext(CoinsContext);
  const { allActiveCoins, loading } = useContext(ActiveContext);
  const { showLoading } = useLazyLoading(loading);
  const { userInfo } = useContext(FetchUserDataContext);

  const maxSize = userInfo?.backUpPhrase ? "" : "430px";

  const sortTheCoins = useMemo(() => {
    return allActiveCoins
      ?.slice()
      .sort(
        (a, b) =>
          b.availableBalance - a.availableBalance ||
          a.symbol.localeCompare(b.symbol)
      );
  }, [allActiveCoins]);

  const renderContent = () => {
    if (showLoading) {
      const count = sortTheCoins?.length > 0 ? sortTheCoins.length : 6;
      return (
        <>
          {/* render skeletons for each card */}
          {Array.from({ length: count }).map((_, i) => (
            // key should be stable for placeholders; index OK for placeholders
            <SkelentonCard key={`skeleton-${i}`} />
          ))}
        </>
      );
    }
    if (error) return <p className="text-red-500">{error}</p>;
    if (selectedItems)
      return <CryptoCards coin={selectedItems} path="assets" />;
    return sortTheCoins && sortTheCoins.length > 0 ? (
      <>
        {sortTheCoins?.map((coin) => (
          <CryptoCards key={coin.id} coin={coin} path="assets" />
        ))}
        <p className="pb-4 text-sm font-bold tracking-wider text-center text-customBlue-100">
          <Link to="/manage-crypto">Manage crypto</Link>
        </p>
      </>
    ) : (
      <Scrollbar maxSize={maxSize}>
        <div className="flex flex-col items-center justify-center w-full ">
          <div className="w-[150px] allFlex2">
            <img src={SpaceImg} alt="" className="object-cover rounded-none" />
          </div>
          <div>
            <p className="mb-2 font-bold tracking-wider text-center">
              No crypto activated
            </p>
            <button className="w-[212px] h-[52px] text-white bg-customBlue-100 tracking-wide rounded-full hover:bg-opacity-70 transist">
              <Link to="/manage-crypto"> Manage crypto</Link>
            </button>
          </div>
        </div>
      </Scrollbar>
    );
  };

  return (
    <>
      <Scrollbar maxSize="379px">
        <div className="pr-2 space-y-5">{renderContent()}</div>
      </Scrollbar>
    </>
  );
};

export default Crypto;
