import { Link } from "react-router-dom";
import useActiveId from "../../../../../../hooks/useActiveId";
import { homeDetails } from "../../homeDetails";
import clsx from "clsx";
import { useContext, useState } from "react";
import Modal from "../../../../../../reuseableCom/modal/Modal";
import useOuterClick from "../../../../../../hooks/useOuterClick";
import FilterNetwork from "../homeModal/filterNetwork/FilterNetwork";
import { CoinsContext } from "../../../../../../context/coins/CoinsContext";
import AdminVisible from "../../../../../auth/adminRole/AdminVisible";

const NavHomeHeader = () => {
  const [single, setSingle] = useState(false);
  const [modal, setModal] = useState(false);
  const { loading, error, selectedItems, handleSelectedItems, handleAllCoins } =
    useContext(CoinsContext);
  const { activeId, handleActiveId } = useActiveId();
  const { mainStateRef } = useOuterClick(setModal);

  return (
    <>
      <div className="flex items-center gap-2">
        <AdminVisible>
          <Link to="/admin-list">
            <div
              className="w-[27.6px] h-[27.6px] rounded-full border border-dashed border-customGray-200  allFlex2 border-opacity-20"
              onMouseEnter={() => setSingle(true)}
              onMouseLeave={() => setSingle(false)}
            >
              <p className="w-2.5 h-2.5 rounded-full bg-customGray-200 bg-opacity-30"></p>
            </div>
            {single && (
              <div
                className={clsx(
                  "absolute top-full text-sm bg-customGray-200 bg-opacity-[0.07] px-3.5 p-1.5 left-4 rounded-lg shadow-md mt-2 z-[10000] customMiniTablet:left-20"
                )}
              >
                <p>We will show you your connected dApps here</p>
              </div>
            )}
          </Link>
        </AdminVisible>
        {homeDetails.map((home, i) => {
          const { id, path, icon, element } = home;
          return (
            <div key={i}>
              <div
                className="bg-customGray-200 bg-opacity-10 text-customGray-200 text-opacity-65 rounded-xl text-lg p-1.5 cursor-pointer "
                onMouseEnter={() => handleActiveId(id)}
                onMouseLeave={() => handleActiveId(null)}
              >
                {path ? (
                  <Link to={path}>
                    <div>
                      <div>{icon && icon()}</div>
                    </div>
                  </Link>
                ) : (
                  <div>
                    <div>
                      <div
                        onClick={() =>
                          element === "Filter networks" && setModal(true)
                        }
                        className="text-customGray-200"
                      >
                        {selectedItems ? (
                          <div className="w-5 h-5 ">
                            <img
                              src={selectedItems?.logo}
                              alt=""
                              className="w-full h-full rounded-full"
                            />
                          </div>
                        ) : (
                          <>{icon && icon()}</>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {activeId === id && element && (
                <div
                  className={clsx(
                    "absolute top-full text-sm bg-customGray-200 bg-opacity-[0.07] px-3.5 p-1.5 rounded-lg shadow-md mt-2 z-[10000] left-[17rem]",
                    (element === "Your addresses" ||
                      element === "Filter networks") &&
                      " left-[11rem] customMiniTablet:left-72"
                  )}
                >
                  <p>{element}</p>
                </div>
              )}
            </div>
          );
        })}
        <div ref={mainStateRef}>
          <Modal
            contentClass1="absolute left-0 top-0 w-full mt-11 border rounded-2xl bg-customGray-300 border-customGray-100 max-h-[250px] overflow-y-auto scrollbar-custom z-[999]"
            isOpen={modal}
            setIsOpen={setModal}
          >
            <FilterNetwork
              loading={loading}
              handleAllCoins={handleAllCoins}
              selectedItems={selectedItems}
              handleSelectedItems={handleSelectedItems}
              error={error}
              setModal={setModal}
            />
          </Modal>
        </div>
      </div>
    </>
  );
};

export default NavHomeHeader;
