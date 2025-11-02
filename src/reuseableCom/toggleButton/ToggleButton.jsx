import clsx from "clsx";

const ToggleButton = ({ saveValue, coin, handleActiveCoins }) => {
  return (
    <div
      className={clsx(
        "w-10 h-6  rounded-full p-[2px] flex items-center transist1 cursor-pointer",
        saveValue[coin.id]
          ? "bg-customBlue-100 justify-end transist1"
          : "bg-customGray-200 bg-opacity-25 justify-start transist1"
      )}
      onClick={() => handleActiveCoins(coin.id)}
    >
      <p className="w-[19px] h-[19px] bg-white rounded-full p-[1px] transist1"></p>
    </div>
  );
};

export default ToggleButton;
