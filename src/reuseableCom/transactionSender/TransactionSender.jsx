import HeaderBack from "../headerBack/HeaderBack";
import TransactionSenderForm from "./TransactionSenderForm";

const TransactionSender = ({
  headerName,
  handleSubmit,
  handleSendDetails,
  formState,
  handleFormStateChange,
  errorformState,
  coinAmount,
  coinNetwrokFee,
  symbol,
  isActiveForm,
  logo,
  name,
  receiver,
  handleMaxNumber,
  sideError,
  proceedNext,
  minerFeeSectiosName,
  sendCoins,
  adminALlReceiver,
}) => {
  return (
    <div className="px-5 py-4  wallet-container">
      <HeaderBack back="back" details={`${headerName} ${symbol}`} />
      <div className="flex flex-col items-center justify-center mb-2">
        <div className="w-9 h-9">
          <img src={logo} alt={name} />
        </div>
        <p
          className="text-sm text-opacity-60 text-customGray-200 mt-0.5
        "
        >
          on {name} Network
        </p>
      </div>
      <div>
        <TransactionSenderForm
          handleSubmit={handleSubmit}
          handleSendDetails={handleSendDetails}
          formState={formState}
          handleFormStateChange={handleFormStateChange}
          errorformState={errorformState}
          coinAmount={coinAmount}
          coinNetwrokFee={coinNetwrokFee}
          symbol={symbol}
          isActiveForm={isActiveForm}
          receiver={receiver}
          handleMaxNumber={handleMaxNumber}
          sideError={sideError}
          proceedNext={proceedNext}
          minerFeeSectiosName={minerFeeSectiosName}
          sendCoins={sendCoins}
          adminALlReceiver={adminALlReceiver}
        />
      </div>
    </div>
  );
};

export default TransactionSender;
