import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchedCoin, setSearchedCoin, placeholder }) => {
  return (
    <div className="bg-customGray-200 bg-opacity-5 flex items-center gap-2 px-2 py-1.5 rounded-2xl">
      <p className="text-opacity-70 text-customGray-200">
        <FaSearch size={18} />
      </p>
      <input
        autoFocus
        type="text"
        value={searchedCoin}
        onChange={(e) => setSearchedCoin(e.target.value)}
        className="w-full text-sm font-semibold bg-transparent outline-none text-customGray-200"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
