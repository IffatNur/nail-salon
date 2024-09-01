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
import Dashboard from "@/pages/Dashboard";
import PrivateRoute from "./PrivateRoute";

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
    element: <Mainlayout></Mainlayout>,
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>{" "}
          </PrivateRoute>
        ),
      },
    ],
  },
]);
