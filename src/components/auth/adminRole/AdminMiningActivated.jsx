import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AdminContext } from "../../../context/admin/AdminContext";
import { CoinsContext } from "../../../context/coins/CoinsContext";
import { getActivatedMining } from "../authDetails";
import useLazyLoading from "../../../hooks/useLazyLoading";
import BasicLoader from "../../../reuseableCom/loading/BasicLoader";
import useFormatePrice from "../../../hooks/useFormatePrice";

const AdminMiningActivated = () => {
  const { userId } = useParams();
  const { allUsers, loading } = useContext(AdminContext);
  const { coins } = useContext(CoinsContext);
  const { showLoading } = useLazyLoading(loading);
  const { formatePrice } = useFormatePrice();

  const findUserId = allUsers?.find((user) => user.id === userId);

  // Object
  const getObject = (iniitailValue) =>
    Object.entries(iniitailValue || {})
      ?.filter(([_, val]) => val)
      .map(([key]) => Number(key));

  //   Arrays
  const getfindCoinMiner = (initiaValue) =>
    initiaValue?.map((coinMi) => coinMi.coinId);

  const getTheCoin = (valueMap) =>
    coins?.filter((coin) => valueMap?.includes(coin.id));

  const findMinerSlice = findUserId?.minerFeeSlice?.map((miner) => {
    return {
      coinId: miner.coinId,
      miningFeePrice: miner.miningFeePercent,
      overPaidMiningPrice: miner.overPaidMining,
    };
  });

  const justname = getTheCoin(getfindCoinMiner(findMinerSlice)).map(
    (jus) => jus.name
  );

  const nowUpdatedValue = findMinerSlice?.map((fiMi, i) => ({
    ...fiMi,
    coinName: justname[i],
  }));
  const activatedMining = getActivatedMining(
    getTheCoin(getObject(findUserId?.minningActivated)),
    getTheCoin(getfindCoinMiner(findUserId?.coinMiner)),
    getTheCoin(getObject(findUserId?.minningFee)),
    getTheCoin(getObject(findUserId?.miningFeeResults)),
    nowUpdatedValue
  );

  return (
    <>
      {showLoading ? (
        <BasicLoader />
      ) : (
        <div className="w-full px-4 mt-14 allFlex2">
          <div className="w-full customTablet1:w-[450px] space-y-5 rounded-lg px-2 customMiniTablet:px-5 py-4 border-2 border-customGray-200">
            {activatedMining.map((acti) => (
              <div
                className="flex justify-between pb-2 border-b-2 border-customGray-200 last:border-none"
                key={acti.label}
              >
                <h3 className="text-customGray-400">{acti.label} : </h3>
                <div>
                  {acti?.value && acti?.value?.length > 0 ? (
                    acti.value?.map((coin) => (
                      <h3
                        className="font-bold border-b border-customGray-200 last:border-none"
                        key={coin.name}
                      >
                        {coin.name}
                        {acti.label === "Mining OverPaid" && (
                          <div className="flex gap-2">
                            <p>{coin.coinName}:</p>
                            <div>
                              <p>
                                MiFe : $
                                {formatePrice(Number(coin.miningFeePrice))}
                              </p>
                              <p>
                                OveP : $
                                {formatePrice(Number(coin.overPaidMiningPrice))}
                              </p>
                            </div>
                          </div>
                        )}
                      </h3>
                    ))
                  ) : (
                    <p className="font-bold ">Not Activated</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminMiningActivated;
