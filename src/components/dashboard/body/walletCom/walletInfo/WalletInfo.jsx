import { useContext, useState } from "react";
import HeaderBack from "../../../../../reuseableCom/headerBack/HeaderBack";
import { walletDetails } from "../walletDetails";
import ModalPayment from "../../../../../reuseableCom/modalPayment/ModalPayment";
import Modal from "../../../../../reuseableCom/modal/Modal";
import { FaChevronRight } from "react-icons/fa";
import useOuterClick from "../../../../../hooks/useOuterClick";
import useActiveId from "../../../../../hooks/useActiveId";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../../redux/features/auth/authSlice";
import { adminUpdateField } from "../../../../../hooks/useAdminUpdateField";
import { FetchUserDataContext } from "../../../../../context/fetchUserData/FetchUserDataContext";

const WalletInfo = () => {
  const { activeId, handleActiveId } = useActiveId();
  const [isOpen, setIsopen] = useState(false);
  const { mainStateRef } = useOuterClick(setIsopen);
  const dispatch = useDispatch();

  const handlebyId = (id) => {
    handleActiveId(id);
    setIsopen(true);
  };

  return (
    <>
      <div className="h-screen px-4 py-5 wallet-container">
        <HeaderBack back details="Wallet Accounts" />
        <div className="w-full px-5 pt-7 rounded-2xl bg-customGray-300 pb-9">
          <div className="px-4 mb-4">
            <h1 className="font-bold">Wallet Name</h1>
            <p className="text-sm text-customGray-200 text-opacity-60">
              Main wallet
            </p>
          </div>
          <div className="space-y-2">
            {walletDetails.map((wall) => (
              <div>
                <div
                  onClick={() => handlebyId(wall.id)}
                  className="px-4 py-4 cursor-pointer allFlex hover:bg-customGray-200 hover:bg-opacity-5 hover:rounded-lg"
                >
                  <h2 className="font-bold">{wall.label}</h2>
                  <p className="text-xl text-customGray-200 text-opacity-60">
                    <FaChevronRight />
                  </p>
                </div>
                {activeId === wall.id && isOpen && (
                  <div className="fixed top-0 left-0 z-50 w-full min-h-screen bg-black bg-opacity-10 backdrop-blur-sm">
                    <div ref={mainStateRef}>
                      <Modal
                        isOpen={isOpen}
                        contentClass1="absolute left-2/4 top-2/4 absolute transform -translate-x-2/4 -translate-y-2/4 w-full customMiniTablet:w-max px-3"
                      >
                        <wall.component />
                      </Modal>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <button
          className="bg-customRed-100 font-bold rounded-full w-full h-[52px] hover:bg-opacity-30 bg-opacity-20 mt-5 text-customRed-100"
          onClick={() => dispatch(logoutUser())}
        >
          Remove Wallet
        </button>
      </div>
    </>
  );
};

export default WalletInfo;
