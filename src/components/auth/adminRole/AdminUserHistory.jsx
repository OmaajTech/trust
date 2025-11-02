import { useParams } from "react-router-dom";
import { AdminContext } from "../../../context/admin/AdminContext";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import useHistoryTransactions from "../../../hooks/useHistoryTransactions";
import HistoryTransactions from "../../../reuseableCom/historyTransactions/HistoryTransactions";
import Scrollbar from "../../../reuseableCom/scrollbar/Scrollbar";
import { editInFireStore } from "../../../redux/features/transactions/transactionSlice";
import useLazyLoading from "../../../hooks/useLazyLoading";
import BasicLoader from "../../../reuseableCom/loading/BasicLoader";

const AdminUserHistory = () => {
  const { userId } = useParams();
  const { allUsers, loading } = useContext(AdminContext);
  const findUserId = allUsers?.filter((user) => user.id === userId);
  const findUser = allUsers?.find((user) => user.id === userId);
  const { showLoading } = useLazyLoading(loading);

  const mapInsideID = findUserId?.flatMap((transac) => transac.transactions);

  const transactionsss = mapInsideID.map((mapsin) => mapsin);

  const dispatch = useDispatch();
  const { sorteByDate, gropedByDate, formatDisplayDate } =
    useHistoryTransactions(transactionsss);

  const changeStatus = (transacaid) => {
    dispatch(
      editInFireStore({
        uid: findUser?.id,
        id: transacaid,
        updatedMiner: { status: "Completed" },
      })
    );
  };

  return (
    <>
      <div className="h-screen px-5 py-4 wallet-container">
        <h2 className="mb-3 text-lg font-bold text-center">History</h2>
        {showLoading ? (
          <BasicLoader />
        ) : (
          <Scrollbar maxSize="68px">
            <div className="pr-2 space-y-7">
              <HistoryTransactions
                filterCoinHistory={transactionsss}
                gropedByDate={gropedByDate}
                sorteByDate={sorteByDate}
                formatDisplayDate={formatDisplayDate}
                admin
                changeStatus={changeStatus}
              />
            </div>
          </Scrollbar>
        )}
      </div>
    </>
  );
};

export default AdminUserHistory;
