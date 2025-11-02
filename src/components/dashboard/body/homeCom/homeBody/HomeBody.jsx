import clsx from "clsx";
import useAlreadySelectedItems from "../../../../../hooks/useAlreadySelectedItems";
import { homeBodyCrypto } from "../homeDetails";
import { MdHistory } from "react-icons/md";
import { Link } from "react-router-dom";

const HomeBody = () => {
  const allCryptoNft = homeBodyCrypto.map((hombdy, i) => {
    return {
      ...hombdy,
      id: i + 1,
      pages: <hombdy.component />,
    };
  });
  const { singleSelectedItem, handleSingleSelectedItem } =
    useAlreadySelectedItems(allCryptoNft);

  const selectedCryptoNft = allCryptoNft[singleSelectedItem];

  return (
    <div className="mt-5">
      <div className="flex justify-between pl-5 pr-4 mb-5 border-b border-b-customGray-100">
        <div className="flex gap-16">
          {allCryptoNft.map((allcrypto) => (
            <div key={allcrypto.id}>
              <button
                onClick={() => handleSingleSelectedItem(allcrypto.id)}
                className={clsx(
                  "font-bold pb-2 tracking-wide",
                  selectedCryptoNft.id === allcrypto.id
                    ? "text-customGray-200"
                    : "text-customGray-200 text-opacity-40"
                )}
              >
                {allcrypto.name}
              </button>
              {selectedCryptoNft.id === allcrypto.id && (
                <p
                  className={clsx(
                    "bg-customBlue-100 max-w-full h-[3.64px] rounded-3xl"
                  )}
                ></p>
              )}
            </div>
          ))}
        </div>
        <Link
          to="/history"
          className="text-3xl text-customGray-200 text-opacity-35"
        >
          <MdHistory />
        </Link>
      </div>
      <div>{selectedCryptoNft.pages}</div>
    </div>
  );
};

export default HomeBody;
