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
import Dashboard from "@/pages/DashboardPages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "@/layout/DashboardLayout";
import MyAppointments from "@/pages/DashboardPages/MyAppointments";
import AllUsers from "@/pages/AllUsers";
import AdminRoute from "./AdminRoute";
import AddService from "@/pages/DashboardPages/AddService";
import ManageServices from "@/pages/DashboardPages/ManageServices";
import UpdateService from "@/pages/DashboardPages/UpdateService";

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
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>{" "}
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
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "addreviews",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>{" "}
          </PrivateRoute>
        ),
      },
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
        loader: async ({params}) => fetch(`http://localhost:5002/services/${params.id}`),
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
