import { useContext, useState } from "react";
import HeaderBack from "../../../../../reuseableCom/headerBack/HeaderBack";
import { HiMiniExclamationCircle } from "react-icons/hi2";
import clsx from "clsx";
import { FetchUserDataContext } from "../../../../../context/fetchUserData/FetchUserDataContext";

const WalletPhrase = () => {
  const [blur, setBlur] = useState(true);
  const { userInfo } = useContext(FetchUserDataContext);

  return (
    <div className="bg-white  w-full customMiniTablet:w-[450px] rounded-3xl p-4">
      <HeaderBack back details="View Secret Phrase" />
      <div
        className={clsx(
          "flex justify-center w-full mb-4",
          blur ? "blur-md" : ""
        )}
      >
        <p className="w-[300px] text-lg bg-customGray-300 p-4 rounded-md text-customGray-400 leading-8">
          {userInfo?.phrase}
        </p>
      </div>
      <div className="flex items-center gap-2 p-3 text-xs rounded-md mt-7 bg-opacity-15 bg-customYellow-100">
        <p className="text-base text-customYellow-100">
          <HiMiniExclamationCircle />
        </p>
        <p>
          Do <span className="underline">NOT</span> share your Secret Phrase.
          Anyone that has the Secret Phrase can steal all your funds.
        </p>
      </div>
      <button
        className="w-full mt-5 mb-3 "
        onClick={() => setBlur((prev) => !prev)}
      >
        {blur ? "Reveal" : "Hide"}
      </button>
    </div>
  );
};

export default WalletPhrase;
