import { Link, NavLink, useParams } from "react-router-dom";
import { singleUserNav } from "../../authDetails";
import { useContext } from "react";
import { AdminContext } from "../../../../context/admin/AdminContext";
import clsx from "clsx";

const SingleUserHeader = ({ setToggleBar }) => {
  const { userId } = useParams();
  const { allUsers } = useContext(AdminContext);
  const findUserId = allUsers?.find((user) => user.id === userId);

  return (
    <>
      <header className="h-full bg-customGray-500">
        <div className="p-4 space-y-3 font-bold text-white bg-customGray-400">
          {!findUserId?.id ? (
            <p>Loading...</p>
          ) : (
            <Link to="/admin-list/" className="space-y-1">
              <h2>UID : {findUserId?.id}</h2>
              <h2>Email : {findUserId?.email}</h2>
            </Link>
          )}
        </div>
        <nav className="text-white ">
          {singleUserNav.map((single, i) => {
            const { path, element } = single;
            return (
              <NavLink
                className={clsx(
                  "flex flex-col border-b last:border-none transist"
                )}
                key={i}
                to={`/admin-list/singleUser/${findUserId?.id}${path}`}
                end
                onClick={() => setToggleBar(true)}
              >
                {({ isActive }) => {
                  return (
                    <div
                      className={clsx(
                        "px-4 py-5",
                        isActive
                          ? "text-customGray-200 bg-customGray-100 text-lg font-bold"
                          : ""
                      )}
                    >
                      <h3>{element}</h3>
                    </div>
                  );
                }}
              </NavLink>
            );
          })}
        </nav>
      </header>
    </>
  );
};

export default SingleUserHeader;
