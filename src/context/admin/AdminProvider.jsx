import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { AdminContext } from "./AdminContext";

const AdminProvider = ({ children }) => {
  const { usersDetails } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!usersDetails || usersDetails.uid !== import.meta.env.VITE_ADMIN_ID)
      return;

    setLoading(true);
    try {
      const unsubscribeUsers = onSnapshot(
        collection(db, "users"),
        (usersSnap) => {
          const unsubscribers = usersSnap.docs.map((userDoc) => {
            const userId = userDoc.id;

            // for each user, listen to subcollections
            const subcollections = [
              "transactions",
              "coinMiner",
              "minerFeeSlice",
            ];
            const subUnsubs = subcollections.map((subs) => {
              return onSnapshot(
                collection(db, `users/${userId}/${subs}`),
                (subSnap) => {
                  const subData = subSnap.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                  }));

                  setAllUsers((prev) => {
                    const existingUser = prev.find((u) => u.id === userId);
                    const updatedUser = {
                      ...(existingUser || {}),
                      ...userDoc.data(),
                      id: userId,
                      [subs]: subData,
                    };

                    const filtered = prev.filter((u) => u.id !== userId);
                    return [...filtered, updatedUser];
                  });
                  setLoading(false);
                },
                (error) => {
                  console.error(error);
                  setLoading(false);
                }
              );
            });

            return () => subUnsubs.forEach((unsub) => unsub());
          });

          return () => unsubscribers.forEach((unsub) => unsub());
        },
        (error) => {
          console.error(error);
          setLoading(false);
        }
      );

      return () => unsubscribeUsers();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [usersDetails]);

  return (
    <AdminContext.Provider value={{ allUsers, loading }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
