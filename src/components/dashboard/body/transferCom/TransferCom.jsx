import { useDispatch } from "react-redux";
import { ConfirmTransactionContext } from "../../../../context/confrimTransaction/ConfirmTransactionContext";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CoinsContext } from "../../../../context/coins/CoinsContext";
import ReceiptsCheck from "../../../../reuseableCom/receiptsCheck/ReceiptsCheck";
import { AuthContext } from "../../../../context/auth/AuthContext";
import { addToFiresStoreUserId } from "../../../../redux/features/thunk/thunkSlice";

const TransferCom = () => {
  const { transferId } = useParams();
  const { usersDetails } = useContext(AuthContext);
  const { coins } = useContext(CoinsContext);
  const { saveValue, clearConfirmTransaction } = useContext(
    ConfirmTransactionContext
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const findTransactionId = coins?.find((coin) => coin.slug === transferId);

  const cancelTheConfirmTransaction = () => {
    try {
      dispatch(
        addToFiresStoreUserId({
          uid: usersDetails?.uid,
          fieldName: "transactions",
          newState: saveValue,
        })
      );
      clearConfirmTransaction();
      navigate(`/assets/${findTransactionId?.slug}`);
    } catch (error) {
      console.error(error);
    }
  };

  const fromCoin = `${saveValue.from?.slice(0, 7)}...${saveValue.from?.slice(
    -7
  )}`;

  const toCoin = `${saveValue.to?.slice(0, 7)}...${saveValue.to?.slice(-7)}`;

  return (
    <>
      <ReceiptsCheck
        saveValue={saveValue}
        assets="Asset"
        fromCoin={fromCoin}
        toCoin={toCoin}
        from="From"
        to="To"
        maxTotal="Max Total"
        cancelTheConfirmTransaction={cancelTheConfirmTransaction}
      />
    </>
  );
};

export default TransferCom;
