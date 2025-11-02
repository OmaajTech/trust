import { Link } from "react-router-dom";
import YouPay from "../../components/dashboard/body/swapCom/swapCoins/YouPay";
import HeaderBox from "../headerBack/HeaderBox";
import ModalPayment from "../modalPayment/ModalPayment";
import SwapFolder from "../swapFolder/SwapFolder";

const CoinsMachine = ({
  loading,
  selectedItems,
  findCoinSlug,
  handleOpenCoins,
  error,
  heaerName,
  sellCoin,
  setSellCoin,
  setSearchedSellCoin,
  searchedSellCoin,
  handleSelectedItems,
  action,
  interChange,
  currency,
}) => {
  const theAction = `I want to ${action}`;
  return (
    <>
      <HeaderBox name={heaerName}>
        <div className="mt-2 allFlex2">
          <div className="w-full customMiniTablet:w-max">
            <div className="w-full space-y-4 customMiniTablet:w-max">
              {interChange ? (
                <>
                  <SwapFolder name={currency} nosideCoins inputs noMoney />
                  <SwapFolder
                    name={theAction}
                    loading={loading}
                    selectedCoin={selectedItems ? selectedItems : findCoinSlug}
                    thePay={handleOpenCoins}
                    balance
                    error={error}
                    coinDisable
                  />
                </>
              ) : (
                <>
                  <SwapFolder
                    name={theAction}
                    loading={loading}
                    selectedCoin={selectedItems ? selectedItems : findCoinSlug}
                    thePay={handleOpenCoins}
                    inputs
                    balance
                    error={error}
                  />
                  <SwapFolder name="To take back" nosideCoins coinDisable />
                </>
              )}
            </div>
            <Link to="/receive">
              <button className="w-full bg-customPurple-100 h-[52px] rounded-full mt-7 text-white font-semibold ">
                {heaerName}{" "}
              </button>
            </Link>
          </div>
        </div>
      </HeaderBox>
      {sellCoin && (
        <ModalPayment allYou={sellCoin} setAllYou={setSellCoin}>
          <YouPay
            thePay={setSellCoin}
            handleSelectedItems={handleSelectedItems}
            searchedPay={searchedSellCoin}
            setSearchedPay={setSearchedSellCoin}
            name="Choose crypto"
          />
        </ModalPayment>
      )}
    </>
  );
};

export default CoinsMachine;
