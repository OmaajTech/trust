import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/auth/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { FetchUserDataContext } from "../../../context/fetchUserData/FetchUserDataContext";
import FullLoader from "../../../reuseableCom/loading/FullLoader";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

const RequireAuth = () => {
  const { usersDetails, loading } = useContext(AuthContext);
  const [checking, setChecking] = useState(true);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const checkingVerified = async () => {
      try {
        if (usersDetails?.uid) {
          const docRef = doc(db, "users", usersDetails?.uid);
          const docSnap = await getDoc(docRef);
          setIsActive(docSnap.exists() && docSnap.data().isVerified === true);
        }
      } catch (error) {
        console.error(error);
      }
      setChecking(false);
    };
    checkingVerified();
  }, [usersDetails]);

  if (loading || checking) return <FullLoader />;

  if (!usersDetails) return <Navigate to="/login" replace />;

  if (!isActive) return <Navigate to="/import-wallet" replace />;

  return <Outlet />;
};

export default RequireAuth;
