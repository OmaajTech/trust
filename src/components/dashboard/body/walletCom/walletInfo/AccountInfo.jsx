import { useSelector } from "react-redux";
import DisplayImg from "../../../../../assets/home/Accounts.svg";
import { selectedTotalPrice } from "../../../../../redux/features/transactions/transactionSlice";
import useFormatePrice from "../../../../../hooks/useFormatePrice";

const AccountInfo = () => {
  const totalBalance = useSelector(selectedTotalPrice);
  const { formatePrice } = useFormatePrice();
  return (
    <div className="w-full customMiniTablet:w-[400px] bg-customGray-300 rounded-3xl p-4 ">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9">
          <img src={DisplayImg} alt="" />
        </div>
        <div>
          <h2 className="font-bold">Account</h2>
          <p>${formatePrice(totalBalance)}</p>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
