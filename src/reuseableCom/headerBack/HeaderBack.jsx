import { FaShareAlt } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const HeaderBack = ({ links, details, back, history }) => {
  const navigate = useNavigate();
  const handleGoback = () => {
    navigate(-1);
  };
  return (
    <div className="mb-6 allFlex">
      {back ? (
        <div
          onClick={handleGoback}
          className="text-2xl cursor-pointer text-opacity-70 text-customGray-200"
        >
          <FaArrowLeftLong />
        </div>
      ) : (
        <Link
          to={links}
          className="text-2xl text-opacity-70 text-customGray-200"
        >
          <FaArrowLeftLong />
        </Link>
      )}
      <h1 className="text-lg font-black -ml-6">{details}</h1>
      <p>{history && <FaShareAlt />}</p>
    </div>
  );
};

export default HeaderBack;
