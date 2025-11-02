import TrustWalletImg from "../../assets/swap/swap.png";
import Header from "../../components/dashboard/header/Header";
import Scrollbar from "../scrollbar/Scrollbar";

const TrustBodyLogo = ({ children }) => {
  return (
    <>
      <div className="h-screen bg-customGray-300">
        <Scrollbar maxSize="65px">
          <div className="pt-16">
            <div className="allFlex2 ">
              <div className="w-[76px] h-[107px] mb-3">
                <img src={TrustWalletImg} alt="" className="rounded-none" />
              </div>
            </div>
            <div className="p-4">{children}</div>
          </div>
        </Scrollbar>
      </div>
      <Header />
    </>
  );
};

export default TrustBodyLogo;
