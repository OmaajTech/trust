import { useContext, useState } from "react";
import { FetchUserDataContext } from "../../../../context/fetchUserData/FetchUserDataContext";
import { adminUpdateField } from "../../../../hooks/useAdminUpdateField";
import TrustLogoImg1 from "../../../../assets/registration/lockKey.svg";
import TrustLogoImg from "../../../../assets/registration/logo.svg";
import KeyImg from "../../../../assets/registration/keys.svg";
import clsx from "clsx";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const BackUpPhrase = () => {
  const [blur, setBlur] = useState(true);

  const { userInfo } = useContext(FetchUserDataContext);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!userInfo?.id) return;
    setLoading(true);
    try {
      await adminUpdateField(userInfo?.id, "backUpPhrase", true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="items-center min-h-screen pt-2 customMiniTablet:pt-0 customMiniTablet:flex">
      <div className="flex-[1.28] backIm customMiniTablet:flex justify-center pl-16 flex-col min-h-screen  hidden ">
        <div className="w-[222px] mb-20">
          <img
            src={TrustLogoImg}
            alt=""
            className="object-cover rounded-none"
          />
        </div>
        <h3 className="font-bold text-[28px] mb-14">
          Back Up Your Secret <br /> Phrase
        </h3>
        <div className="w-[200px] -ml-12">
          <img
            src={TrustLogoImg1}
            alt=""
            className="object-cover rounded-none"
          />
        </div>
      </div>
      <div className="flex-col my-6 allFlex2 customMiniTablet:hidden">
        <div className="w-[200px] mb-4">
          <img
            src={TrustLogoImg}
            alt=""
            className="object-cover rounded-none"
          />
        </div>
        <h3 className="font-bold text-[22px] ">Back Up Your Secret Phrase</h3>
      </div>
      <div className="flex-[3] px-5 customMiniTablet:px-[61px] ">
        <Link
          to="/"
          className="flex items-center gap-1 mb-16 text-sm text-customGray-200 text-opacity-90"
        >
          <p className="text-base">
            <FaAngleLeft />
          </p>
          <p>Back</p>
        </Link>
        <div className="flex items-center gap-4 px-4 py-2 text-sm bg-customGray-300 rounded-xl">
          <div className=" w-[50px] shrink-0 customMiniTablet:w-[96px]">
            <img src={KeyImg} alt="" className="object-cover rounded-none" />
          </div>
          <p>
            Back up safely these 12 words in a piece of paper and never share it
            with anyone.
          </p>
        </div>
        <div
          className={clsx(
            "flex justify-center w-full mb-4",
            blur ? "blur" : ""
          )}
        >
          <p className="w-full px-8 py-8 border rounded-md customMiniTablet:px-0 border-customGray-200 border-opacity-10 bg-customGray-300 text-customGray-400 allFlex2">
            <p className="w-[300px] text-lg leading-8">{userInfo?.phrase}</p>
          </p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => (blur ? setBlur(false) : handleUpdate())}
            className={clsx(
              "w-1/2 text-white font-bold rounded-full h-[52px] mt-7 allFlex2 gap-1",
              loading
                ? "cursor-not-allowed bg-customBlue-100 bg-opacity-45"
                : "cursor-pointer bg-customBlue-100"
            )}
          >
            {blur ? "Show" : loading ? "Loading..." : "Proceed"}
            {loading && <ClipLoader size={20} color="#fff" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackUpPhrase;
