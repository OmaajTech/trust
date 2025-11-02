import { useContext, useState } from "react";
import { FetchUserDataContext } from "../../../context/fetchUserData/FetchUserDataContext";
import TrustLogoImg1 from "../../../assets/registration/laptop.svg";
import TrustLogoImg from "../../../assets/registration/logo.svg";
import { FaAngleLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import useFormState from "../../../hooks/useFormState";
import { keyPhrase } from "../authDetails";
import { adminUpdateField } from "../../../hooks/useAdminUpdateField";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/features/auth/authSlice";
import useLazyLoading from "../../../hooks/useLazyLoading";
import { AuthContext } from "../../../context/auth/AuthContext";
import BasicLoader from "../../../reuseableCom/loading/BasicLoader";
import FullLoader from "../../../reuseableCom/loading/FullLoader";
import { ClipLoader } from "react-spinners";

const VerifyKeyPhrase = () => {
  const { usersDetails } = useContext(AuthContext);
  const { userInfo, loading } = useContext(FetchUserDataContext);
  const [loadingButton, setLoadingButton] = useState(false);
  const keyPhra = userInfo?.phrase;
  const { formState, errorformState, handleFormStateChange, handleSubmit } =
    useFormState(keyPhrase, "", keyPhra);
  const { showLoading } = useLazyLoading(loading);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isActive =
    formState.keyPhrase !== "" && formState.keyPhrase === keyPhra;

  const handleChecked = async () => {
    if (!isActive) return;
    setLoadingButton(true);
    try {
      await adminUpdateField(userInfo?.id, "isVerified", true);
      navigate("/home");
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingButton(false);
    }
  };

  return (
    <>
      {showLoading ? (
        <FullLoader />
      ) : (
        <div className="items-center min-h-screen pt-2 customMiniTablet:pt-0 customMiniTablet:flex">
          <div className="flex-[1.28] backIm customMiniTablet:flex justify-center pl-16 flex-col min-h-screen  hidden ">
            <div className="w-[222px] mb-20">
              <img
                src={TrustLogoImg}
                alt=""
                className="object-cover rounded-none"
              />
            </div>
            <h3 className="font-bold text-[28px] mb-20">Import a wallet</h3>
            <p className="font-bold">
              Locate your Secret Phrase on Trust Wallet
            </p>
            <div className="w-[300px] -ml-12">
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
            <h3 className="font-bold text-[22px] ">Import a wallet</h3>
          </div>
          <div className="flex-[3] px-5 customMiniTablet:px-[61px] ">
            <div
              onClick={() => dispatch(logoutUser())}
              className="flex items-center gap-1 mb-5 text-sm cursor-pointer text-customGray-200 text-opacity-90"
            >
              <p className="text-base">
                <FaAngleLeft />
              </p>
              <p>Back</p>
            </div>

            <div>
              <h1 className="mb-6 text-2xl font-bold">
                Import with Secret Phrase or Private Key
              </h1>
              <form onSubmit={(e) => handleSubmit(e, handleChecked)}>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm">
                      Enter Secret Phrase or Private Key
                    </label>
                    <textarea
                      type="text"
                      value={formState.keyPhrase}
                      onChange={handleFormStateChange}
                      className={clsx(
                        "w-full pt-2 pl-4 pr-8 mt-2.5 font-semibold rounded-lg outline-none h-[135px]  no-spinner resize-none",
                        errorformState.keyPhrase
                          ? "border border-customRed-100 focus:border-customRed-100"
                          : "border border-opacity-25 border-customGray-200 focus:border-customBlue-100"
                      )}
                      name="keyPhrase"
                    />
                    {errorformState.keyPhrase && (
                      <p className="mt-2 text-xs text-customRed-100">
                        {errorformState.keyPhrase}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-customGray-200 text-opacity-70">
                      Secret Phrase is typically 12 (sometimes 18, 24) words
                      separated by single spaces{" "}
                      <br className="hidden customMiniTablet:block" /> Private
                      Key is a long alphanumeric code
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    className={clsx(
                      "w-1/2 text-white font-bold rounded-full h-[52px] mt-7 allFlex2 gap-1",
                      isActive
                        ? "cursor-pointer bg-customBlue-100"
                        : "bg-customBlue-100 bg-opacity-50  cursor-not-allowed",
                      loadingButton
                        ? "bg-customBlue-100 bg-opacity-50  cursor-not-allowed"
                        : "cursor-pointer bg-customBlue-100"
                    )}
                  >
                    {loadingButton ? "Importing..." : "Import"}
                    {loadingButton && <ClipLoader size={20} color="#fff" />}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VerifyKeyPhrase;
