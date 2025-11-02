import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/auth/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { FetchUserDataContext } from "../../../context/fetchUserData/FetchUserDataContext";
import FullLoader from "../../../reuseableCom/loading/FullLoader";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

const RedirectAuth = () => {
  const { usersDetails, loading } = useContext(AuthContext);
  const [checking, setChecking] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const checkVerification = async () => {
      if (usersDetails?.uid) {
        const docRef = doc(db, "users", usersDetails?.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setIsVerified(docSnap.data().isVerified === true);
        }
      }
      setChecking(false);
    };

    checkVerification();
  }, [usersDetails]);

  if (loading || checking) return <FullLoader />;

  if (usersDetails && isVerified) return <Navigate to="/home" replace />;

  if (usersDetails && !isVerified)
    return <Navigate to="/import-wallet" replace />;

  return <Outlet />;
};

export default RedirectAuth;
