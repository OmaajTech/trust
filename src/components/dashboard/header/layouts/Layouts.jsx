import { Outlet } from "react-router-dom";

const Layouts = () => {
  return (
    <div className="h-screen">
      <Outlet />
    </div>
  );
};

export default Layouts;
