import clsx from "clsx";
import { FaSortDown } from "react-icons/fa";
import Modal from "../../../../../../reuseableCom/modal/Modal";
import MainWalletModal from "../homeModal/MainWalletModal";
import { useContext, useState } from "react";
import useOuterClick from "../../../../../../hooks/useOuterClick";
import { FetchUserDataContext } from "../../../../../../context/fetchUserData/FetchUserDataContext";

const MainWalletHeader = () => {
  const [modal, setModal] = useState(false);
  const { mainStateRef } = useOuterClick(setModal);
  const { userInfo } = useContext(FetchUserDataContext);

  return (
    <>
      <div ref={mainStateRef} className="overflow-hidden cursor-pointer w-max">
        <div onClick={() => setModal((prevModal) => !prevModal)}>
          <div className="flex gap-1">
            <h2 className="text-sm font-semibold">
              {userInfo?.backUpPhrase ? "Main Wallet" : "Seed Phrase"}{" "}
            </h2>
            <p
              className={clsx(
                "text-custom15px text-customGray-200 text-opacity-70 transist",
                modal ? "rotate-180" : "rotate-0"
              )}
            >
              <FaSortDown />
            </p>
          </div>
          <p className="text-sm text-opacity-50 text-customGray-200">
            Account 1
          </p>
        </div>
        <Modal
          contentClass2="absolute top-0 w-full mt-11 border rounded-2xl bg-customGray-300 border-customGray-100 z-[99]"
          isOpen={modal}
          setIsOpen={setModal}
        >
          <MainWalletModal backUp={userInfo?.backUpPhrase} id={userInfo} />
        </Modal>
      </div>
    </>
  );
};

export default MainWalletHeader;
