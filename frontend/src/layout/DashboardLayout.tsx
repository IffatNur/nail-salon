
import DashboardNav from "@/components/DashboardNav";
import Container from "@/components/ui/Container";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
      <Container className="flex my-0 h-full">
        <div className="flex-none w-3/12 h-lvh">
          <DashboardNav></DashboardNav>
        </div>
        <div className="grow h-lvh ">
          <Toaster />
          <Outlet></Outlet>
        </div>
      </Container>
    );
};

export default DashboardLayout;