import Navbar from "@/components/Sections/Navbar";
import { Outlet } from "react-router-dom";

const Mainlayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default Mainlayout;
