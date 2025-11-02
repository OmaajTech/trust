import { Outlet } from "react-router-dom";
import Header from "../header";

const Layouts = () => {
  return (
    <div className="h-screen">
      <Outlet />
      {/* <Header /> */}
    </div>
  );
};

export default Layouts;
