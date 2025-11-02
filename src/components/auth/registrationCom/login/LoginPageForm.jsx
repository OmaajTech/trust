import { useDispatch, useSelector } from "react-redux";
import useFormState from "../../../../hooks/useFormState";
import { authLoginDetails } from "../../authDetails";
import {
  loginUsers,
  selectedAuthError,
  selectedAuthLoading,
} from "../../../../redux/features/auth/authSlice";
import clsx from "clsx";
import { useState } from "react";
import { PiEyeClosedBold, PiHandEyeFill } from "react-icons/pi";
import { ClipLoader } from "react-spinners";

const LoginPageForm = () => {
  const [isPassword, setIsPassword] = useState(false);
  const registerLoading = useSelector(selectedAuthLoading);
  const errorMessage = useSelector(selectedAuthError);
  const { formState, errorformState, handleFormStateChange, handleSubmit } =
    useFormState(authLoginDetails);

  const isActive = formState.email !== "" && formState.logpassword !== "";

  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!isActive) return;
    try {
      dispatch(
        loginUsers({
          email: formState.email,
          password: formState.logpassword,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, handleLogin)}>
      <div className="space-y-6">
        {errorMessage && (
          <p className="text-sm font-bold text-center text-customRed-100">
            Incorrect email and password
          </p>
        )}
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
            value={formState.logpassword}
            onChange={handleFormStateChange}
            className={clsx(
              "w-full pl-4 pr-14 mt-2.5 font-semibold rounded-lg outline-none h-14  no-spinner",
              errorformState.logpassword
                ? "border border-customRed-100 focus:border-customRed-100"
                : "border border-opacity-25 border-customGray-200 focus:border-customBlue-100"
            )}
            name="logpassword"
          />
          <p
            className="absolute cursor-pointer right-3 top-14 text-customBlue-100"
            onClick={() => setIsPassword((prev) => !prev)}
          >
            {isPassword ? <PiHandEyeFill /> : <PiEyeClosedBold />}
          </p>

          {errorformState.logpassword && (
            <p className="mt-2 text-xs text-customRed-100">
              {errorformState.logpassword}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className={clsx(
            "w-full text-white font-bold rounded-full h-[52px] mt-7 allFlex2 gap-1",
            isActive
              ? "cursor-pointer bg-customBlue-100"
              : "bg-customBlue-100 bg-opacity-50  cursor-not-allowed",
            registerLoading
              ? "bg-customBlue-100 bg-opacity-50  cursor-not-allowed"
              : "cursor-pointer bg-customBlue-100"
          )}
        >
          {registerLoading ? "Loading..." : "Continue"}
          {registerLoading && <ClipLoader size={20} color="#fff" />}
        </button>
      </div>
    </form>
  );
};

export default LoginPageForm;
