import { useSelector } from "react-redux";
import {
  selectedTransactionLoading,
  selectedTransactions,
} from "../../../../redux/features/transactions/transactionSlice";
import useHistoryTransactions from "../../../../hooks/useHistoryTransactions";
import HistoryTransactions from "../../../../reuseableCom/historyTransactions/HistoryTransactions";
import Scrollbar from "../../../../reuseableCom/scrollbar/Scrollbar";
import { useContext } from "react";
import { FetchUserDataContext } from "../../../../context/fetchUserData/FetchUserDataContext";

const PerHistoryCoin = ({ slug, miningStrated }) => {
  const { usersInfo } = useContext(FetchUserDataContext);
  const transaction = useSelector(selectedTransactions);
  const loading = useSelector(selectedTransactionLoading);

  const filterCoinHistory = transaction.filter(
    (coin) => coin.coinSlug === slug
  );

  const { gropedByDate, sorteByDate } =
    useHistoryTransactions(filterCoinHistory);

  return (
    <div className="mt-6 space-y-8 border-t border-customGray-200 border-opacity-15">
      <Scrollbar maxSize={miningStrated ? "443px" : "333px"}>
        <div className="pr-2">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <HistoryTransactions
              filterCoinHistory={filterCoinHistory}
              gropedByDate={gropedByDate}
              sorteByDate={sorteByDate}
            />
          )}
        </div>
      </Scrollbar>
    </div>
  );
};

export default PerHistoryCoin;
