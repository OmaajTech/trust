import React from "react";
import { FaAngleRight } from "react-icons/fa6";
import { IoWallet } from "react-icons/io5";

const SwapFolder = ({
  loading,
  selectedCoin,
  thePay,
  inputs,
  error,
  name,
  wallet,
  balance,
  nosideCoins,
  coinDisable,
  noMoney,
}) => {
  return (
    <>
      <div className="w-full customMiniTablet:w-[400px] p-4 bg-customGray-300 rounded-2xl">
        <div className="mb-3 text-xs allFlex text-opacity-65 text-customGray-200">
          <h3>{name}</h3>
          {wallet ? (
            <p className="flex items-center gap-2">
              <IoWallet size={14} /> <span>0</span>
            </p>
          ) : (
            ""
          )}
        </div>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="allFlex">
              <div>
                <div className="gap-3 allFlex">
                  {nosideCoins ? (
                    <h3 className="w-10 h-10 text-3xl font-bold text-center bg-yellow-500 rounded-full leading-[38px]">
                      $
                    </h3>
                  ) : (
                    <div className="w-10 h-10">
                      <img src={selectedCoin?.logo} alt={selectedCoin?.name} />
                    </div>
                  )}
                  <div onClick={thePay}>
                    <div className="flex items-center gap-1 font-bold cursor-pointer">
                      <h3>{nosideCoins ? "USD" : selectedCoin?.symbol}</h3>
                      <p>
                        <FaAngleRight />
                      </p>
                    </div>
                    <p className="text-xs w-max text-customGray-200 text-opacity-60">
                      {selectedCoin?.name}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                {coinDisable ? (
                  <p></p>
                ) : (
                  <>
                    {inputs ? (
                      <input
                        type="text"
                        className="text-2xl w-[80px] outline-none bg-transparent text-end customMiniTablet:w-[160px] pl-2"
                        placeholder="0"
                      />
                    ) : (
                      <h3 className="text-2xl text-end">0</h3>
                    )}
                    {noMoney ? (
                      ""
                    ) : (
                      <>
                        {balance ? (
                          <p className="text-sm font-bold tracking-wide text-opacity-40 text-end text-customGray-200">
                            Balance 0 {selectedCoin?.symbol}
                          </p>
                        ) : (
                          <p className="text-xs text-end text-customGray-200 text-opacity-70">
                            $ 0.00
                          </p>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
          {error && <p>{error}</p>}
        </div>
      </div>
    </>
  );
};

export default SwapFolder;
