
import DashboardNav from "@/components/DashboardNav";
import Container from "@/components/ui/Container";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
      <Container className="flex w-full my-0">
        <div className="flex-none w-3/12 h-screen">
          <DashboardNav></DashboardNav>
        </div>
        <div className="grow h-screen ">
          <Outlet></Outlet>
        </div>
      </Container>
    );
};

export default DashboardLayout;