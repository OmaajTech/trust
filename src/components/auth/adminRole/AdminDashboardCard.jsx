import { Link } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import useGenerateKeys from "../../../hooks/useGenerateKeys";

const AdminDashboardCard = ({ user, index }) => {
  const { generateNewKeys } = useGenerateKeys();

  const handleGenerateKey = async () => {
    const newKey = generateNewKeys();

    try {
      const userDocRef = doc(db, "users", user.id);
      await updateDoc(userDocRef, {
        miningKeys: newKey,
      });
    } catch (error) {
      console.error("Error generating key:", error);
    }
  };

  const findAt = user?.email.indexOf("@");
  const uidCut = user?.id.slice(0, 10);
  const email = user?.email.slice(0, findAt);

  return (
    <Link
      to={`/admin-list/singleUser/${user.id}`}
      className="border-b-2 flex-[1]  border-customGray-200 allFlex last:border-none"
    >
      <h3 className="flex-[1]  border-customGray-200 text-center ">{index}</h3>
      <h3 className=" flex-[3] customMiniTablet:flex-[4] border-customGray-200 text-center border-x-2 py-2">
        {uidCut}
      </h3>
      <h2 className="flex-[4] text-center">{email}</h2>
    </Link>
  );
};

export default AdminDashboardCard;
