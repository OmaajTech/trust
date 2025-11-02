import clsx from "clsx";

const FilterNetworkCard = ({ coin, handleSelectedIndex, selectedItems }) => {
  const { id, name, logo } = coin;

  return (
    <div
      className="py-1.5 px-4 cursor-pointer hover:bg-customGray-200 hover:bg-opacity-10 hover:rounded-xl transist"
      onClick={() => handleSelectedIndex(id)}
    >
      <div className="allFlex">
        <div className="flex gap-2">
          <div className="w-6 h-6 ">
            <img src={logo} alt="" className="w-full h-full rounded-full" />
          </div>
          <h2 className="text-sm font-semibold">{name}</h2>
        </div>
        <div
          className={clsx(
            " border-[2.5px] h-5 w-5 rounded-full allFlex2",
            selectedItems?.id === id
              ? "border-customBlue-100"
              : "border-customGray-200 border-opacity-25"
          )}
        >
          {selectedItems?.id === id && (
            <p
              className={clsx("w-2.5 h-2.5 rounded-full bg-customBlue-100")}
            ></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterNetworkCard;
