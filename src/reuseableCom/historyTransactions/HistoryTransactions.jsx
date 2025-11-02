import clsx from "clsx";
import {
  FaArrowDownLong,
  FaArrowsRotate,
  FaArrowUpLong,
} from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import HistoryImg from "../../assets/home/space.svg";
import useFormatePrice from "../../hooks/useFormatePrice";

const HistoryTransactions = ({
  filterCoinHistory,
  sorteByDate,
  gropedByDate,
  admin,
  changeStatus,
}) => {
  const navigate = useNavigate();
  const { formatePrice } = useFormatePrice();
  return (
    <>
      {filterCoinHistory && filterCoinHistory.length > 0 ? (
        sorteByDate.map((sortedDate) => (
          <div key={sortedDate}>
            <h1 className="mt-3 mb-4 text-sm text-customGray-200 text-opacity-70">
              {sortedDate}
            </h1>
            <div className="space-y-6">
              {gropedByDate[sortedDate]
                .slice()
                .sort((a, b) => b.timeStamps.localeCompare(a.timeStamps))
                .map((coinHistory) => {
                  const {
                    type,
                    to,
                    coinSymbol,
                    totalAmountCoin,
                    id,
                    from,
                    status,
                    amount,
                  } = coinHistory;

                  let icons = "";

                  if (type === "Send") icons = <FaArrowUpLong />;
                  if (type === "Receive") icons = <FaArrowDownLong />;
                  if (type === "Swap") icons = <FaArrowsRotate />;

                  let coinSlice = "";

                  if (type === "Send")
                    coinSlice = `${to.slice(0, 7)}...${to.slice(-7)}`;
                  if (type === "Receive")
                    coinSlice = `${from.slice(0, 7)}...${from.slice(-7)}`;
                  if (type === "Swap") coinSlice = <FaArrowsRotate />;

                  return (
                    <div key={coinHistory.id}>
                      <div
                        onClick={() => !admin && navigate(`/history/${id}`)}
                        className="text-sm cursor-pointer allFlex"
                      >
                        <div className="flex items-center gap-3">
                          <p className="text-xl rounded-full bg-customGray-200 bg-opacity-10 text-customGray-200 text-opacity-65 w-9 h-9 allFlex2">
                            {icons}
                          </p>
                          <div>
                            <div className="flex items-center gap-1">
                              <h1 className="mb-1 font-bold">{type}</h1>
                              {status === "Pending" && (
                                <>
                                  <p className="text-[10.5px] bg-orange-200 bg-opacity-40 px-3 rounded-full py-[1px] text-customYellow-100 font-bold mb-1">
                                    Pending
                                  </p>
                                  {admin && (
                                    <button onClick={() => changeStatus(id)}>
                                      Change Status
                                    </button>
                                  )}
                                </>
                              )}
                            </div>
                            <div className="font-light text-customGray-200 text-opacity-70">
                              {type === "Send" ? "To:" : "From:"}
                              <span>{coinSlice}</span>
                            </div>
                          </div>
                        </div>
                        <div
                          className={clsx(
                            "font-bold",
                            type === "Send" ? "" : "text-customGreen-100"
                          )}
                        >
                          {type === "Send" ? "-" : "+"}
                          {totalAmountCoin.toFixed(6)} <span>{coinSymbol}</span>
                          {admin && (
                            <p className="text-end">
                              ${formatePrice(Number(amount))}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))
      ) : (
        <div className="flex-col mt-4 allFlex2 ">
          <div className="w-40 h-40 mb-5">
            <img
              src={HistoryImg}
              alt=""
              className="object-cover rounded-none"
            />
          </div>
          <h1 className="text-xl font-bold tracking-wider">
            No transactions found
          </h1>
        </div>
      )}
    </>
  );
};

export default HistoryTransactions;
