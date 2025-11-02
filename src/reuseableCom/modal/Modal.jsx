import { AnimatePresence, motion } from "framer-motion";

const Modal = ({ isOpen, children, contentClass1, contentClass2 }) => {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={contentClass1}
            >
              <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 50 }}
                className={contentClass2}
              >
                {children}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;
