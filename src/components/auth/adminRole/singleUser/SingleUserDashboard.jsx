import { Outlet } from "react-router-dom";
import SingleUserHeader from "./SingleUserHeader";
import { AdminContext } from "../../../../context/admin/AdminContext";
import { useContext, useState } from "react";
import { FiMenu } from "react-icons/fi";
import clsx from "clsx";

const SingleUserDashboard = () => {
  const { loading } = useContext(AdminContext);
  const [toggleBar, setToggleBar] = useState(false);
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="relative flex w-full h-screen bg-red-500">
          <div className="z-30 block customMiniTablet:hidden">
            {toggleBar ? (
              <div
                className="absolute text-2xl text-customGray-200 left-3 top-5"
                onClick={() => setToggleBar(false)}
              >
                <FiMenu />
              </div>
            ) : (
              <div className={clsx("flex-[1.3] fixed top-0 h-full")}>
                <SingleUserHeader setToggleBar={setToggleBar} />
              </div>
            )}
          </div>
          <div
            className="flex-[3] bg-[#f5f5f5] block customMiniTablet:hidden"
            onClick={() => setToggleBar(true)}
          >
            <Outlet />
          </div>
          <div className="hidden customMiniTablet:block">
            <div className="flex-[1.3]  h-full">
              <SingleUserHeader setToggleBar={setToggleBar} />
            </div>
          </div>
          <div className="flex-[3] bg-[#f5f5f5] hidden customMiniTablet:block">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default SingleUserDashboard;
