const YouPayCard = ({ coin, handleSelectedItems }) => {
  const { id, logo, symbol, name } = coin;

  return (
    <div
      className="px-2 cursor-pointer allFlex"
      onClick={() => handleSelectedItems(id)}
    >
      <div className="gap-3 allFlex2">
        <div className="w-9 h-9">
          <img src={logo} alt={name} />
        </div>
        <div>
          <h2 className="text-sm font-bold">{symbol}</h2>
          <p className="text-sm text-opacity-75 text-customGray-200">{name}</p>
        </div>
      </div>
      <div className="text-end">
        <h2 className="font-semibold">0</h2>
        <p className="text-sm text-customGray-200 text-opacity-70">$ 0.00</p>
      </div>
    </div>
  );
};

export default YouPayCard;
