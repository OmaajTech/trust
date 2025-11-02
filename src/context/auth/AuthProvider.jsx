import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { AuthContext } from "./AuthContext";
import FullLoader from "../../reuseableCom/loading/FullLoader";

const AuthProvider = ({ children }) => {
  const [usersDetails, setUsersDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUsersDetails(firebaseUser || null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    // Prevents router from loading prematurely
    return <FullLoader />;
  }

  return (
    <AuthContext.Provider value={{ usersDetails, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
