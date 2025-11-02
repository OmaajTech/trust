import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectedTransactions } from "../../../../redux/features/transactions/transactionSlice";
import { useMemo } from "react";
import ReceiptsCheck from "../../../../reuseableCom/receiptsCheck/ReceiptsCheck";

const HistoryCoinCom = () => {
  const { coinslug } = useParams();
  const transactions = useSelector(selectedTransactions);

  const newFindTransactionCoin = useMemo(() => {
    const findTransactionCoin = transactions?.find(
      (coin) => coin.id === coinslug
    );

    const sameCoinTransactions = transactions.filter(
      (coin) => coin.coinSlug === findTransactionCoin.coinSlug
    );

    const updateNouce = sameCoinTransactions.map((coin, index) => ({
      ...coin,
      nonce: index + 1,
    }));

    return updateNouce.find((transac) => transac.id === findTransactionCoin.id);
  }, [coinslug, transactions]);

  let fromOrTO = "";
  let informativeAddress = "";

  if (newFindTransactionCoin?.type === "Send") {
    fromOrTO = "Recipient";
    informativeAddress = `${newFindTransactionCoin.to.slice(
      0,
      7
    )}....${newFindTransactionCoin.to.slice(-6)}`;
  } else if (newFindTransactionCoin?.type === "Receive") {
    fromOrTO = "Sender";
    informativeAddress = `${newFindTransactionCoin.from.slice(
      0,
      7
    )}....${newFindTransactionCoin.from.slice(-6)}`;
  }

  return (
    <div className="h-screen px-5 py-4 wallet-container">
      <ReceiptsCheck
        saveValue={newFindTransactionCoin}
        assets="Date"
        from="Status"
        to={fromOrTO}
        maxTotal="Nonce"
        informativeAddress={informativeAddress}
        history
      />
    </div>
  );
};

export default HistoryCoinCom;
