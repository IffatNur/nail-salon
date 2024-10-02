import Mainlayout from "@/layout/Mainlayout";
import AboutUs from "@/pages/AboutUs";
import Booking from "@/pages/Booking";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import OurTeam from "@/pages/OurTeam";
import Services from "@/pages/Services";
import Shop from "@/pages/Shop";
import Signup from "@/pages/Signup";
import { createBrowserRouter } from "react-router-dom";
import Blog from "@/pages/Blog";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "@/layout/DashboardLayout";
import AdminRoute from "./AdminRoute";
import AddService from "@/pages/DashboardPages/Admin/AddService";
import ManageServices from "@/pages/DashboardPages/Admin/ManageServices";
import UpdateService from "@/pages/DashboardPages/Admin/UpdateService";
import MyAppointments from "@/pages/DashboardPages/User/MyAppointments";
import AllUsers from "@/pages/DashboardPages/Admin/AllUsers";
import Payment from "@/pages/DashboardPages/Payment/Payment";
import Dashboard from "@/pages/DashboardPages/Dashboard";
import PaymentHistory from "@/pages/DashboardPages/User/PaymentHistory";
import UserDashboard from "@/pages/DashboardPages/User/UserDashboard";
import AdminDashboard from "@/pages/DashboardPages/Admin/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout></Mainlayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/booking",
        element: <Booking></Booking>,
      },
      {
        path: "/our-team",
        element: <OurTeam></OurTeam>,
      },
      {
        path: "/services",
        element: <Services></Services>,
      },
      {
        path: "/about",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/shop",
        element: <Shop></Shop>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Signup></Signup>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "userdashboard",
        element: <UserDashboard></UserDashboard>,
      },
      {
        path: "admindashboard",
        element: (
          <AdminRoute>
            <AdminDashboard></AdminDashboard>
          </AdminRoute>
        ),
      },
      {
        path: "appointment/payment",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoute>
            <PaymentHistory></PaymentHistory>
          </PrivateRoute>
        ),
      },
      {
        path: "appointment",
        element: (
          <PrivateRoute>
            <MyAppointments></MyAppointments>
          </PrivateRoute>
        ),
      },
      // {
      //   path: "addreviews",
      //   element: (
      //     <PrivateRoute>
      //       <Dashboard></Dashboard>{" "}
      //     </PrivateRoute>
      //   ),
      // },
      {
        path: "users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "addservice",
        element: (
          <AdminRoute>
            <AddService></AddService>
          </AdminRoute>
        ),
      },
      {
        path: "manageservices",
        element: (
          <AdminRoute>
            <ManageServices></ManageServices>
          </AdminRoute>
        ),
      },
      {
        path: "updateservice/:id",
        element: (
          <AdminRoute>
            <UpdateService></UpdateService>
          </AdminRoute>
        ),
        loader: async ({ params }) =>
          fetch(`http://localhost:5002/services/${params.id}`),
      },
      // {
      //   path: "manageappointments",
      //   element: (
      //     <AdminRoute>
      //       <ManageServices></ManageServices>
      //     </AdminRoute>
      //   ),
      // },
    ],
  },
]);
