import { useDispatch } from "react-redux";
import useOuterClick from "../../hooks/useOuterClick";
import Modal from "../modal/Modal";

const ModalPayment = ({ children, allYou, setAllYou }) => {
  const dispatch = useDispatch();
  const handleClose = (initialPart) => {
    dispatch(setAllYou(initialPart));
  };
  const { mainStateRef } = useOuterClick(handleClose);

  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-full min-h-screen bg-black bg-opacity-10 backdrop-blur-sm">
        <div ref={mainStateRef}>
          <Modal
            isOpen={allYou}
            contentClass1="absolute left-2/4 top-2/4 absolute transform -translate-x-2/4 -translate-y-2/4 w-full customMiniTablet:w-max px-3"
          >
            {children}
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ModalPayment;
