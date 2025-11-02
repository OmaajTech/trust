import ToggleButton from "../../../../../../../reuseableCom/toggleButton/ToggleButton";

const ManageCryptoCard = ({ coin, handleActiveCoins, loading, saveValue }) => {
  const { name, logo, symbol } = coin;

  return (
    <div className="allFlex">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9">
          <img src={logo} alt={name} />
        </div>
        <div className="leading-[0.1]">
          <div className="flex items-center gap-1">
            <h2 className="font-bold">{symbol}</h2>
            <p className="py-[1px] px-2 rounded-full text-xs bg-customGray-200 bg-opacity-15">
              {name}
            </p>
          </div>
          <h3 className="text-sm">{name}</h3>
        </div>
      </div>
      {loading ? (
        <p>Loading</p>
      ) : (
        <ToggleButton
          saveValue={saveValue}
          coin={coin}
          handleActiveCoins={handleActiveCoins}
        />
      )}
    </div>
  );
};

export default ManageCryptoCard;
