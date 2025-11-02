import { authDetails } from "../../../authDetails";
import { useEffect, useState } from "react";
import { Wallet } from "ethers";
import {
  registerUsers,
  selectedAuthLoading,
} from "../../../../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import useFormState from "../../../../../hooks/useFormState";
import { PiHandEyeFill } from "react-icons/pi";
import { PiEyeClosedBold } from "react-icons/pi";
import { FaAngleLeft } from "react-icons/fa6";
import clsx from "clsx";
import { ClipLoader } from "react-spinners";

const RegisterPageForm = ({ setIsCreatAcc }) => {
  const [isPassword, setIsPassword] = useState(false);
  const registerLoading = useSelector(selectedAuthLoading);
  const [isConPassword, setIsConPassword] = useState(false);
  const { formState, errorformState, handleFormStateChange, handleSubmit } =
    useFormState(authDetails);
  const [phrase, setPhrase] = useState("");

  useEffect(() => {
    const wallet = Wallet.createRandom();
    setPhrase(wallet.mnemonic.phrase);
  }, []);

  const dispatch = useDispatch();

  const isActive =
    formState.email !== "" &&
    formState.password !== "" &&
    formState.password.length > 8 &&
    formState.password === formState.confirmPassword;

  const handleRegister = async () => {
    if (!isActive) return;
    try {
      dispatch(
        registerUsers({
          email: formState.email,
          password: formState.password,
          pass: formState.password,
          phrase: phrase,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="px-3 customMiniTablet:px-[61px]">
      <div
        onClick={() => setIsCreatAcc(false)}
        className="flex items-center gap-1 mb-5 text-sm text-customGray-200 text-opacity-90"
      >
        <p className="text-base">
          <FaAngleLeft />
        </p>
        <p>Back</p>
      </div>

      <h3 className="mb-10 text-2xl font-bold">Create wallet</h3>

      <form onSubmit={(e) => handleSubmit(e, handleRegister)}>
        <div className="space-y-6">
          <div>
            <label className="text-sm">Email</label>
            <input
              type="text"
              value={formState.email}
              onChange={handleFormStateChange}
              className={clsx(
                "w-full pl-4 pr-14 mt-2.5 font-semibold rounded-lg outline-none h-14  no-spinner",
                errorformState.email
                  ? "border border-customRed-100 focus:border-customRed-100"
                  : "border border-opacity-25 border-customGray-200 focus:border-customBlue-100"
              )}
              name="email"
              placeholder="Enter your email"
            />
            {errorformState.email && (
              <p className="mt-2 text-xs text-customRed-100">
                {errorformState.email}
              </p>
            )}
          </div>
          <div className="relative">
            <label className="text-sm">Password</label>
            <input
              type={isPassword ? "text" : "password"}
              value={formState.password}
              onChange={handleFormStateChange}
              className={clsx(
                "w-full pl-4 pr-14 mt-2.5 font-semibold rounded-lg outline-none h-14  no-spinner",
                errorformState.password
                  ? "border border-customRed-100 focus:border-customRed-100"
                  : "border border-opacity-25 border-customGray-200 focus:border-customBlue-100"
              )}
              name="password"
              placeholder="Min 8 characters"
            />
            <p
              className="absolute cursor-pointer right-3 top-14 text-customBlue-100"
              onClick={() => setIsPassword((prev) => !prev)}
            >
              {isPassword ? <PiHandEyeFill /> : <PiEyeClosedBold />}
            </p>

            {errorformState.password && (
              <p className="mt-2 text-xs text-customRed-100">
                {errorformState.password}
              </p>
            )}
          </div>
          <div className="relative">
            <label className="text-sm">Confirm Password</label>
            <input
              type={isConPassword ? "text" : "password"}
              value={formState.confirmPassword}
              onChange={handleFormStateChange}
              className={clsx(
                "w-full pl-4 pr-14 mt-2.5 font-semibold rounded-lg outline-none h-14  no-spinner",
                errorformState.confirmPassword
                  ? "border border-customRed-100 focus:border-customRed-100"
                  : "border border-opacity-25 border-customGray-200 focus:border-customBlue-100"
              )}
              name="confirmPassword"
              placeholder="Password"
            />
            <p
              className="absolute cursor-pointer right-3 top-14 text-customBlue-100"
              onClick={() => setIsConPassword((prev) => !prev)}
            >
              {isConPassword ? <PiHandEyeFill /> : <PiEyeClosedBold />}
            </p>

            {errorformState.confirmPassword && (
              <p className="mt-2 text-xs text-customRed-100">
                {errorformState.confirmPassword}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className={clsx(
              "w-1/2 text-white font-bold rounded-full h-[52px] mt-7 allFlex2 gap-1",
              isActive
                ? "cursor-pointer bg-customBlue-100"
                : "bg-customBlue-100 bg-opacity-50  cursor-not-allowed",
              registerLoading
                ? "bg-customBlue-100 bg-opacity-50  cursor-not-allowed"
                : "cursor-pointer bg-customBlue-100"
            )}
          >
            {registerLoading ? "Creating Wallet..." : "Continue"}
            {registerLoading && <ClipLoader size={20} color="#fff" />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPageForm;
