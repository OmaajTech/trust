import { useContext } from "react";
import { AuthContext } from "../../../context/auth/AuthContext";

const AdminVisible = ({ children }) => {
  const { usersDetails } = useContext(AuthContext);

  if (usersDetails && usersDetails?.uid === import.meta.env.VITE_ADMIN_ID) {
    return children;
  }

  return null;
};

export default AdminVisible;
