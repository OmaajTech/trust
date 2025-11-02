import { useContext } from "react";
import HomeBody from "./homeBody/HomeBody";
import HomeHeader from "./homeHeader/HomeHeader";
import HomeSemiHeader from "./homeSemiHeader/HomeSemiHeader";
import SuccessfulRegistered from "./SuccessfulRegistered";
import { FetchUserDataContext } from "../../../../context/fetchUserData/FetchUserDataContext";
import { HiMiniExclamationCircle } from "react-icons/hi2";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../../header/Header";

const HomeCom = () => {
  const { userInfo, loading } = useContext(FetchUserDataContext);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : userInfo?.successRegistered ? (
        <div>
          <div className="p-4 wallet-container">
            {!userInfo?.backUpPhrase && (
              <Link
                to="/backup-phrase"
                className="flex items-center gap-2 p-3 mb-2 text-xs rounded-md bg-opacity-15 bg-customYellow-100"
              >
                <p className="text-base text-customYellow-100">
                  <HiMiniExclamationCircle />
                </p>
                <div className="w-full allFlex">
                  <p>Backup your Secret Phrase now</p>
                  <p className="text-base text-customYellow-100">
                    <FaAngleRight />
                  </p>
                </div>
              </Link>
            )}
            <HomeHeader />
            <HomeSemiHeader />
            <HomeBody />
          </div>
          <Header />
        </div>
      ) : (
        <SuccessfulRegistered />
      )}
    </>
  );
};

export default HomeCom;
