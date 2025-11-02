import { useContext, useMemo, useState } from "react";
import AdminDashboardCard from "./AdminDashboardCard";
import { AdminContext } from "../../../context/admin/AdminContext";
import useLazyLoading from "../../../hooks/useLazyLoading";
import SearchBar from "../../../reuseableCom/searchBar/SearchBar";
import Scrollbar from "../../../reuseableCom/scrollbar/Scrollbar";
import { Link } from "react-router-dom";
import BasicLoader from "../../../reuseableCom/loading/BasicLoader";

const AdminDashboard = () => {
  const [userSearched, setUserSearched] = useState("");
  const { allUsers, loading } = useContext(AdminContext);
  const { showLoading } = useLazyLoading(loading);

  const filteredUsers = useMemo(() => {
    return allUsers
      ?.slice()
      .filter((allUse) =>
        allUse.email.toLowerCase().includes(userSearched.toLowerCase())
      )
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [allUsers, userSearched]);

  return (
    <div className="h-screen px-2 py-5 customMiniTablet:p-5 bg-opacity-5 bg-customGray-300">
      {showLoading ? (
        <BasicLoader />
      ) : (
        <div className="">
          <div className="flex-col w-full mb-4 text-lg allFlex2">
            <h1 className="mb-5 font-bold text-center uppercase customMiniTablet:text-2xl">
              <Link to="/home">Admin Control Room</Link>
            </h1>
            <div className="w-full customMiniTablet:w-[500px]">
              <SearchBar
                searchedCoin={userSearched}
                setSearchedCoin={setUserSearched}
                placeholder="Searched by Email"
              />
            </div>
          </div>
          <div className="font-bold bg-opacity-50 border-2 border-customGray-200 allFlex bg-customGray-400">
            <h2 className="flex-[1] border-r-2 border-customGray-200 text-center">
              #
            </h2>
            <h2 className="flex-[3] customMiniTablet:flex-[4] border-r-2 border-customGray-200 text-center">
              UID
            </h2>
            <h2 className="flex-[4] text-center">Email</h2>
          </div>
          <Scrollbar maxSize="189px">
            <div className="border-b-2 border-l-2 border-r-2 border-customGray-200">
              {filteredUsers && filteredUsers.length > 0 ? (
                filteredUsers?.map((user, index) => (
                  <AdminDashboardCard
                    key={user.id}
                    user={user}
                    index={index + 1}
                  />
                ))
              ) : (
                <p>No Users Registered</p>
              )}
            </div>
          </Scrollbar>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
