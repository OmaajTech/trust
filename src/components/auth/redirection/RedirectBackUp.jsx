import { useContext } from "react";
import { FetchUserDataContext } from "../../../context/fetchUserData/FetchUserDataContext";
import { Navigate, Outlet } from "react-router-dom";

const RedirectBackUp = () => {
  const { userInfo, loading } = useContext(FetchUserDataContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  return userInfo?.backUpPhrase ? <Navigate to="/" replace /> : <Outlet />;
};

export default RedirectBackUp;
