import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AdminContext } from "../../../../context/admin/AdminContext";
import useGenerateKeys from "../../../../hooks/useGenerateKeys";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";
import useLazyLoading from "../../../../hooks/useLazyLoading";
import CopiedIcon from "../../../../reuseableCom/copiedIcon/CopiedIcon";
import { getUserInfo } from "../../authDetails";
import useFormatePrice from "../../../../hooks/useFormatePrice";
import Scrollbar from "../../../../reuseableCom/scrollbar/Scrollbar";
import BasicLoader from "../../../../reuseableCom/loading/BasicLoader";

const UsersInfo = () => {
  const { userId } = useParams();
  const { allUsers, loading } = useContext(AdminContext);
  const findUserId = allUsers?.find((user) => user.id === userId);
  const { showLoading } = useLazyLoading(loading);
  const { generateNewKeys } = useGenerateKeys();

  const handleNewKeys = async () => {
    const newKeys = generateNewKeys();
    try {
      const docref = doc(db, "users", findUserId?.id);
      await updateDoc(docref, {
        miningKeys: newKeys,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const data = new Date(findUserId?.createdAt);

  const createAt = data.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const copyIcon = () => {
    return (
      <div className="relative flex items-center space-x-2">
        <CopiedIcon
          addressCoins={findUserId?.miningKeys}
          className="absolute left-0 px-3 py-1 text-xs rounded-md shadow -top-12 bg-customGray-200 bg-opacity-5"
        />
        <button
          className="px-2 py-0.5 text-xs text-white rounded-full bg-customGray-400"
          onClick={handleNewKeys}
        >
          Generate
        </button>
      </div>
    );
  };
  const copyIconPhrase = () => {
    return (
      <div className="relative flex items-center">
        <CopiedIcon
          addressCoins={findUserId?.phrase}
          className="absolute left-0 px-3 py-1 text-xs rounded-md shadow -top-12 bg-customGray-200 bg-opacity-5"
        />
      </div>
    );
  };
  const transac = findUserId?.transactions?.map((transac) => transac);

  const available = transac?.reduce((acc, transac) => {
    if (transac.status === "Completed") {
      if (transac.type === "Receive") {
        return acc + Number(transac.totalAmount);
      } else if (transac.type === "Send") {
        return acc - Number(transac.totalAmount);
      }
    }
    return acc;
  }, 0);
  const { formatePrice } = useFormatePrice(available);
  const availableBalance = formatePrice(available);
  const pending = transac?.some((tran) => tran.status === "Pending");
  const getField = getUserInfo(
    findUserId,
    createAt,
    copyIcon(),
    availableBalance,
    copyIconPhrase(),
    pending
  );
  return (
    <div className="w-full px-2 mt-10 allFlex2">
      {showLoading ? (
        <BasicLoader />
      ) : (
        <Scrollbar maxSize="50px">
          <div className="w-full customTablet1:w-[600px] space-y-5 rounded-lg px-2 customMiniTablet:px-5 py-4 border-2 border-customGray-200">
            {getField?.map((gtF) => {
              return (
                <div className="flex items-center justify-between w-full pb-2 border-b border-customGray-200 last:border-none">
                  <h2 className="text-customGray-400">{gtF.label}:</h2>
                  <div className="flex items-center gap-1">
                    <p className="font-bold">{gtF.value}</p>
                    {gtF.copy && <p className="font-bold">{gtF.copy}</p>}
                    {gtF.pend && (
                      <p className="text-[10.5px] bg-orange-200 bg-opacity-40 px-3 rounded-full py-[1px] text-customYellow-100 font-bold mb-1">
                        {gtF.pend}
                      </p>
                    )}
                    {gtF.balance && <p className="font-bold">{gtF.balance}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </Scrollbar>
      )}
    </div>
  );
};

export default UsersInfo;
