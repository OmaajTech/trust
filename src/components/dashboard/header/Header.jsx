import { headerDetails } from "./headerDeatails";
import { NavLink } from "react-router-dom";
import { FileClock } from "lucide-react";
import clsx from "clsx";

const Header = () => {
  return (
    <>
      <header className="fixed bottom-0 flex items-center w-full h-20 bg-white bg-gray">
        <nav className="flex justify-around px-3.5 pt-2.5 border-t border-customGray-100 wallet-container">
          {headerDetails.map((navHeader) => {
            const { path, element, icon } = navHeader;
            return (
              <NavLink
                to={path}
                key={element}
                className={clsx(
                  "flex flex-col justify-center items-center text-xs font-semibold"
                )}
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={clsx(
                        "text-2xl",
                        isActive
                          ? "text-customBlue-100"
                          : "text-opacity-30 text-customGray-200"
                      )}
                    >
                      {element === "History" ? (
                        <FileClock size={24} />
                      ) : (
                        icon && icon()
                      )}
                    </div>
                    <h2
                      className={clsx(
                        "mt-[1px]",
                        isActive ? "text-customBlue-100" : "text-customGray-200"
                      )}
                    >
                      {element}
                    </h2>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </header>
    </>
  );
};

export default Header;
