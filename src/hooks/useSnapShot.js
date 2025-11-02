import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/auth/AuthContext";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import equal from "fast-deep-equal";

const useSnapShot = (initialValue, fieldName) => {
  const { usersDetails } = useContext(AuthContext);
  const [mainValue, setMainValue] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const lastValueRef = useRef(initialValue);

  const uid = usersDetails?.uid;

  useEffect(() => {
    if (!uid) return;

    const docRef = doc(db, "users", uid);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const nextValue = data[fieldName] || initialValue;

        // Only update if data actually changed
        if (!equal(lastValueRef.current, nextValue)) {
          lastValueRef.current = nextValue;
          setMainValue(nextValue);
        }
      } else {
        setMainValue(initialValue);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [uid, fieldName, initialValue]);

  const setValueFunc = useCallback(
    async (nextValue) => {
      try {
        if (!uid) return;

        // Only write if value changed
        if (equal(lastValueRef.current, nextValue)) return;

        lastValueRef.current = nextValue;
        const docRef = doc(db, "users", uid);
        await setDoc(docRef, { [fieldName]: nextValue }, { merge: true });
      } catch (error) {
        console.error("Firestore write error:", error);
      }
    },
    [uid, fieldName]
  );

  return {
    mainValue,
    loading,
    setMainValue,
    setValueFunc,
  };
};

export default useSnapShot;
