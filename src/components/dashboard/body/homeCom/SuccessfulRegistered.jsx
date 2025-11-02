import { useContext, useState } from "react";
import { FetchUserDataContext } from "../../../../context/fetchUserData/FetchUserDataContext";
import TrustLogoImg1 from "../../../../assets/registration/finalReg.svg";
import TrustLogoImg from "../../../../assets/registration/logo.svg";
import clsx from "clsx";
import { adminUpdateField } from "../../../../hooks/useAdminUpdateField";
import { ClipLoader } from "react-spinners";

const SuccessfulRegistered = () => {
  const { userInfo } = useContext(FetchUserDataContext);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!userInfo?.id) return;
    setLoading(true);
    try {
      await adminUpdateField(userInfo?.id, "successRegistered", true);
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
        <h3 className="font-bold text-[28px] mb-10">
          Brilliant <br /> your wallet is ready!
        </h3>
        <div className="w-[300px] -ml-16">
          <img
            src={TrustLogoImg1}
            alt=""
            className="object-cover rounded-none"
          />
        </div>
      </div>
      <div className="flex-col mt-6 allFlex2 customMiniTablet:hidden">
        <div className="w-[200px] mb-4">
          <img
            src={TrustLogoImg}
            alt=""
            className="object-cover rounded-none"
          />
        </div>
        <h3 className="font-bold text-[22px] ">
          Brilliant your wallet is ready!
        </h3>
      </div>
      <div className="flex-[3] px-5 customMiniTablet:px-[61px] mt-10 customMiniTablet:mt-0 flex justify-center flex-col items-center customMiniTablet:block h-[50vh] customMiniTablet:h-0">
        <h2 className="mb-10 text-2xl font-bold customMiniTablet:text-3xl ">
          Start exploring
        </h2>
        <div className="justify-end w-full customMiniTablet:flex">
          <button
            onClick={handleUpdate}
            className={clsx(
              "w-full customMiniTablet:w-1/2 text-white font-bold rounded-full h-[52px] mt-7  allFlex2 gap-1",
              loading
                ? "cursor-not-allowed bg-customBlue-100 bg-opacity-45"
                : "cursor-pointer bg-customBlue-100"
            )}
          >
            {loading ? "Loading..." : "Open my wallet"}
            {loading && <ClipLoader size={20} color="#fff" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulRegistered;
