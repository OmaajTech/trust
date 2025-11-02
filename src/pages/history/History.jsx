import { useSelector } from "react-redux";
import {
  selectedTransactionLoading,
  selectedTransactions,
} from "../../redux/features/transactions/transactionSlice";
import useHistoryTransactions from "../../hooks/useHistoryTransactions";
import HistoryTransactions from "../../reuseableCom/historyTransactions/HistoryTransactions";
import Scrollbar from "../../reuseableCom/scrollbar/Scrollbar";

const History = () => {
  const transactions = useSelector(selectedTransactions);
  const loading = useSelector(selectedTransactionLoading);
  const { sorteByDate, gropedByDate, formatDisplayDate } =
    useHistoryTransactions(transactions);

  return (
    <div className="h-screen px-5 py-4 wallet-container">
      <h2 className="mb-3 text-lg font-bold text-center">History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Scrollbar maxSize="68px">
          <div className="pr-2 space-y-7">
            <HistoryTransactions
              filterCoinHistory={transactions}
              gropedByDate={gropedByDate}
              sorteByDate={sorteByDate}
              formatDisplayDate={formatDisplayDate}
            />
          </div>
        </Scrollbar>
      )}
    </div>
  );
};

export default History;
