import { Link, useNavigate } from "react-router-dom";
import TrustLogoImg from "../../../../assets/registration/logo.svg";
import { MdPhoneAndroid } from "react-icons/md";
import { PiCheckBold } from "react-icons/pi";
import { useState } from "react";
import clsx from "clsx";

const RegisterPage1 = ({ setIsCreatAcc }) => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="w-[266px] mb-16">
        <Link to="https://trustwallet.com/">
          <img src={TrustLogoImg} alt="" className="rounded-none" />
        </Link>
      </div>
      <div className="mb-10 text-[28px] font-extrabold  leading-9">
        <h2>
          Join 200M users in <br /> securing their financial future
        </h2>{" "}
      </div>
      <div className="flex items-center gap-2 mb-12 text-sm font-bold text-opacity-70 text-customGray-200">
        <p
          className={clsx(
            "w-5 h-5 shrink-0 border-[2px] rounded-md  items-center flex justify-center cursor-pointer",
            isChecked
              ? "text-white bg-customBlue-100 border-none"
              : "border-customGray-200 border-opacity-30"
          )}
          onClick={() => setIsChecked((prev) => !prev)}
        >
          {isChecked && <PiCheckBold />}
        </p>
        <p>
          I have read and agree to the{" "}
          <Link
            to="https://trustwallet.com/terms-of-service"
            className="text-customBlue-100"
          >
            Terms of Use
          </Link>{" "}
          and{" "}
          <Link
            to="https://trustwallet.com/privacy-notice"
            className="text-customBlue-100"
          >
            Privacy Policy
          </Link>{" "}
        </p>
      </div>
      <div className="space-y-4 ">
        <button
          className={clsx(
            "w-full text-white font-bold rounded-full h-[52px]",
            isChecked
              ? "cursor-pointer bg-customBlue-100"
              : "bg-customBlue-100 bg-opacity-50  cursor-not-allowed"
          )}
          onClick={() => isChecked && navigate("/login")}
        >
          I already have a wallet
        </button>

        <button
          className={clsx(
            "w-full  font-bold rounded-full h-[52px]",
            isChecked
              ? "cursor-pointer bg-customGray-200 bg-opacity-10 text-customGray-200 text-opacity-60"
              : "bg-customGray-200 bg-opacity-[0.05] text-customGray-200 cursor-not-allowed text-opacity-30"
          )}
          onClick={() => isChecked && setIsCreatAcc(true)}
        >
          Create new wallet
        </button>
      </div>
      <div className="gap-3 mt-12 allFlex2">
        <p className="hidden customMiniTablet:block w-[98px] h-[2px] bg-customGray-100"></p>
        <div>
          <p className="flex items-center gap-1 text-sm text-customGray-200 text-opacity-70">
            Have the Trust Wallet mobile app?{" "}
            <span className="text-2xl">
              <MdPhoneAndroid />
            </span>
          </p>
        </div>
        <p className="hidden customMiniTablet:block w-[98px] h-[2px] bg-customGray-100"></p>
      </div>
    </div>
  );
};

export default RegisterPage1;
