import { useState } from "react";
import LogoImg from "../../../assets/registration/registrationVideo.svg";
import RegisterPage1 from "./registration/RegisterPage1";
import RegisterPage2 from "./registration/page2/RegisterPage2";

const RegisterCom = () => {
  const [isCreatAcc, setIsCreatAcc] = useState(false);
  return (
    <>
      {!isCreatAcc && (
        <div className="h-screen customMiniTablet:flex gap">
          <div className="hidden customMiniTablet:block flex-[3.5] -ml-48">
            <img
              src={LogoImg}
              alt=""
              className="object-cover w-screen rounded-none"
            />
          </div>
          <div className="flex-[1.8] bg-orange-0 p-8">
            <RegisterPage1 setIsCreatAcc={setIsCreatAcc} />
          </div>
        </div>
      )}
      {isCreatAcc && <RegisterPage2 setIsCreatAcc={setIsCreatAcc} />}
    </>
  );
};

export default RegisterCom;
