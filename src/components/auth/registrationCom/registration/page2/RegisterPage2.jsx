import TrustLogoImg from "../../../../../assets/registration/logo.svg";
import TrustLogoImg1 from "../../../../../assets/registration/registerLogo1.svg";
import RegisterPageForm from "./RegisterPageForm";

const RegisterPage2 = ({ setIsCreatAcc }) => {
  return (
    <div className="items-center h-screen pt-2 customMiniTablet:flex customMiniTablet:pt-0">
      <div className="flex-[1.28] backIm customMiniTablet:flex justify-center pl-16 flex-col h-screen hidden ">
        <div className="w-[222px] mb-24">
          <img
            src={TrustLogoImg}
            alt=""
            className="object-cover rounded-none"
          />
        </div>
        <h3 className="font-bold text-[28px] mb-16">Secure your wallet</h3>
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
        <h3 className="font-bold text-[22px] ">Secure your wallet</h3>
      </div>
      <div className="flex-[3]">
        <RegisterPageForm setIsCreatAcc={setIsCreatAcc} />
      </div>
    </div>
  );
};

export default RegisterPage2;
