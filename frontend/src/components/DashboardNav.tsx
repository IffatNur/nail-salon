import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  BadgeDollarSign,
  BookmarkPlus,
  CopyPlus,
  HomeIcon,
  LayoutDashboard,
  Mail,
  MessageSquareDiff,
  Store,
  Warehouse,
  SquareKanban,
  Layers,
  Users,
} from "lucide-react";
import useAdmin from "@/hooks/useAdmin";


const DashboardNav = () => {
  const [isAdmin] = useAdmin()
    return (
      <div className="w-full bg-gradient-to-br from-purple-200 to-rose-200 h-screen">
        <div className="w-full text-center py-10">
          <h1 className="font-libre text-3xl ">LEONIE</h1>
          <p className="font-libre text-xs font-thin text-purple-500">
            <i>"Perfection at Your Fingertips."</i>
          </p>
        </div>
        <div className="px-6 pb-4">
          {isAdmin === true ? (
            <>
              <Link to="/dashboard">
                <Button className="w-full bg-transparent hover:bg-rose-50 text-black font-libre flex gap-2 justify-start items-center">
                  <span>
                    <HomeIcon />
                  </span>
                  <span className="text-sm">Admin Home</span>
                </Button>
              </Link>
              <Link to="/dashboard/addservice">
                <Button className="w-full bg-transparent hover:bg-rose-50 text-black font-libre flex gap-2 justify-start items-center">
                  <span>
                    <CopyPlus />
                  </span>
                  <span className="text-sm">Add Service</span>
                </Button>
              </Link>
              <Link to="/dashboard/manageservices">
                <Button className="w-full bg-transparent hover:bg-rose-50 text-black font-libre flex gap-2 justify-start items-center">
                  <span>
                    <SquareKanban />
                  </span>
                  <span className="text-sm">Manage Services</span>
                </Button>
              </Link>
              <Link to="/dashboard/manageappointments">
                <Button className="w-full bg-transparent hover:bg-rose-50 text-black font-libre flex gap-2 justify-start items-center">
                  <span>
                    <Layers />
                  </span>
                  <span className="text-sm">Manage Appointments</span>
                </Button>
              </Link>
              <Link to="/dashboard/users">
                <Button className="w-full bg-transparent hover:bg-rose-50 text-black font-libre flex gap-2 justify-start items-center">
                  <span>
                    <Users />
                  </span>
                  <span className="text-sm">All Users</span>
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">
                <Button className="w-full bg-transparent hover:bg-rose-50 text-black font-libre flex gap-2 justify-start items-center">
                  <span>
                    <HomeIcon />
                  </span>
                  <span className="text-sm">User Home</span>
                </Button>
              </Link>
              <Link to="/dashboard/appointment">
                <Button className="w-full bg-transparent hover:bg-rose-50 text-black font-libre flex gap-2 justify-start items-center">
                  <span>
                    <LayoutDashboard />
                  </span>
                  <span className="text-sm">My Appointment</span>
                </Button>
              </Link>
              <Link to="/dashboard/payment">
                <Button className="w-full bg-transparent hover:bg-rose-50 text-black font-libre flex gap-2 justify-start items-center">
                  <span>
                    <BadgeDollarSign />
                  </span>
                  <span className="text-sm">Payment History</span>
                </Button>
              </Link>
              <Link to="/dashboard/addreviews">
                <Button className="w-full bg-transparent hover:bg-rose-50 text-black font-libre flex gap-2 justify-start items-center">
                  <span>
                    <MessageSquareDiff />
                  </span>
                  <span className="text-sm">Add Reviews</span>
                </Button>
              </Link>
            </>
          )}
        </div>
        <hr />
        <div className="px-6 pt-4">
          <Link to="/">
            <Button className="w-full bg-transparent hover:bg-rose-50 text-black font-libre flex gap-2 justify-start items-center">
              <span>
                <Warehouse />
              </span>
              <span className="text-sm">Home</span>
            </Button>
          </Link>
          <Link to="/booking">
            <Button className="w-full bg-transparent hover:bg-rose-50 text-black font-libre flex gap-2 justify-start items-center">
              <span>
                <BookmarkPlus />
              </span>
              <span className="text-sm">Booking</span>
            </Button>
          </Link>
          <Link to="/shop">
            <Button className="w-full bg-transparent hover:bg-rose-50 text-black font-libre flex gap-2 justify-start items-center">
              <span>
                <Store />
              </span>
              <span className="text-sm">Shop</span>
            </Button>
          </Link>
          <Link to="/contact">
            <Button className="w-full bg-transparent hover:bg-rose-50 text-black font-libre flex gap-2 justify-start items-center">
              <span>
                <Mail />
              </span>
              <span className="text-sm">Contact</span>
            </Button>
          </Link>
        </div>
      </div>
    );
};

export default DashboardNav;