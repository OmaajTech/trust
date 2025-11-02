import { Navigate } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <Navigate to="/home" replace />
    </div>
  );
};

export default NotFound;
