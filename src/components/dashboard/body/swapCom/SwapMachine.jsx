import { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import Modal from "../../../../reuseableCom/modal/Modal";
import SwapSettings from "./SwapSettings";
import useOuterClick from "../../../../hooks/useOuterClick";
import { AnimatePresence } from "framer-motion";
import SwapCoins from "./swapCoins/SwapCoins";
import HeaderBox from "../../../../reuseableCom/headerBack/HeaderBox";

const SwapMachine = ({ findCoinSlug }) => {
  const [swapModal, setSwapModal] = useState(false);
  const { mainStateRef } = useOuterClick(setSwapModal);

  return (
    <>
      <HeaderBox name="Swap">
        <p
          className="text-2xl cursor-pointer text-opacity-70 float-end text-customGray-200"
          onClick={() => setSwapModal(true)}
        >
          <IoSettingsSharp />
        </p>
        <AnimatePresence>
          {swapModal && (
            <div className="fixed top-0 left-0 z-50 w-full min-h-screen bg-black bg-opacity-10 backdrop-blur-sm">
              <div ref={mainStateRef}>
                <Modal
                  contentClass1="absolute left-2/4 top-2/4 absolute transform -translate-x-2/4 -translate-y-2/4 w-full customMiniTablet:w-max px-3"
                  isOpen={swapModal}
                  setIsOpen={setSwapModal}
                >
                  <SwapSettings setSwapModal={setSwapModal} />
                </Modal>
              </div>
            </div>
          )}
        </AnimatePresence>
        <div className="allFlex2 mt-14">
          <SwapCoins findCoinSlug={findCoinSlug} />
        </div>
      </HeaderBox>
    </>
  );
};

export default SwapMachine;
