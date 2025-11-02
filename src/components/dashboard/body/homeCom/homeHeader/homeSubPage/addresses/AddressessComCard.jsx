import CopiedIcon from "../../../../../../../reuseableCom/copiedIcon/CopiedIcon";

const AddressessComCard = ({ coin }) => {
  const { logo, addressCoins, name } = coin;
  const shortendAddress = `${addressCoins.slice(0, 6)}...${addressCoins.slice(
    -6
  )}`;

  return (
    <div className="allFlex">
      <div className="flex justify-between gap-2.5">
        <div className="w-9 h-9">
          <img src={logo} alt={name} />
        </div>
        <div className="leading-[21px]">
          <h1>{name}</h1>
          <p className="text-sm font-semibold text-opacity-60 text-customGray-200 ">
            {shortendAddress}
          </p>
        </div>
      </div>
      <div className="relative">
        <CopiedIcon
          addressCoins={addressCoins}
          className="absolute px-3 py-1 text-xs rounded-md shadow bg-customGray-200 bg-opacity-5 -left-12 top-full"
        />
      </div>
    </div>
  );
};

export default AddressessComCard;
