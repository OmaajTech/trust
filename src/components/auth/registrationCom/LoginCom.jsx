import { Link } from "react-router-dom";
import LogoImg from "../../../assets/registration/plainLogo.svg";
import LoginPageForm from "./login/LoginPageForm";

const LoginCom = () => {
  return (
    <div className="flex-col h-screen px-4 allFlex2">
      <div className="flex-col mb-5 allFlex2">
        <div className="w-[58px] mb-4">
          <img src={LogoImg} alt="" className="object-cover rounded-none" />
        </div>
        <p className="font-bold text-center">
          Secure and trusted multi-chain crypto <br /> wallet
        </p>
      </div>
      <div>
        <LoginPageForm />
      </div>
      <div className="pt-5 mt-8 text-sm text-center border-t border-opacity-25 text-customGray-200 text-opacity-80 border-customGray-15">
        <p className="mb-4">
          Can't login? You can erase your current wallet and set up a new one
        </p>
        <Link to="/register" className="font-bold text-customBlue-100">
          Reset wallet
        </Link>
      </div>
    </div>
  );
};

export default LoginCom;
