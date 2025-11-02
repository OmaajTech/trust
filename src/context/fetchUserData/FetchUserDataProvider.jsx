import { useContext, useEffect, useState } from "react";
import { FetchUserDataContext } from "./FetchUserDataContext";
import { AuthContext } from "../auth/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const FetchUserDataProvider = ({ children }) => {
  const { usersDetails } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!usersDetails?.uid) return;
    setLoading(true);
    const collectionRef = doc(db, "users", usersDetails.uid);
    const unsubscribe = onSnapshot(
      collectionRef,
      (snapShot) => {
        if (snapShot.exists()) {
          const fethTheUser = {
            ...snapShot.data(),
            id: snapShot.id,
          };
          setUserInfo(fethTheUser);
          setLoading(false);
        } else {
          setUserInfo(null);
          setLoading(false);
        }
      },
      (error) => {
        console.error(error);
      }
    );

    return () => unsubscribe();
  }, [usersDetails]);

  return (
    <FetchUserDataContext.Provider value={{ userInfo, loading }}>
      {children}
    </FetchUserDataContext.Provider>
  );
};

export default FetchUserDataProvider;
