import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/auth/AuthContext";
import { FetchUserDataContext } from "../../../context/fetchUserData/FetchUserDataContext";
import { Navigate, Outlet } from "react-router-dom";
import FullLoader from "../../../reuseableCom/loading/FullLoader";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

const RedirectVerify = () => {
  const { usersDetails, loading } = useContext(AuthContext);
  const [checking, setChecking] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const fetchVerification = async () => {
      if (usersDetails?.uid) {
        const docRef = doc(db, "users", usersDetails.uid);
        const snap = await getDoc(docRef);
        const data = snap.data();
        setIsVerified(data?.isVerified === true);
      }
      setChecking(false);
    };
    fetchVerification();
  }, [usersDetails]);

  if (loading || checking) return <FullLoader />;

  if (!usersDetails) return <Navigate to="/login" replace />;

  if (isVerified) return <Navigate to="/home" replace />;

  return <Outlet />;
};

export default RedirectVerify;
