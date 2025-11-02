const HeaderBox = ({ children, name }) => {
  return (
    <div className="container w-full pb-10 mx-auto bg-white rounded">
      <header className="px-6 border-b pt-7 border-b-customGray-200 border-opacity-10">
        <div>
          <p className="pb-2 font-bold border-b-[3px] border-customBlue-100 w-max">
            {name}
          </p>
        </div>
      </header>
      <div className="p-6 ">{children}</div>
    </div>
  );
};

export default HeaderBox;
