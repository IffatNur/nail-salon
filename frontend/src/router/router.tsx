import Mainlayout from "@/layout/Mainlayout";
import AboutUs from "@/pages/AboutUs";
import Booking from "@/pages/Booking";
import Home from "@/pages/Home";
import OurTeam from "@/pages/OurTeam";
import Services from "@/pages/Services";
import Shop from "@/pages/Shop";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Mainlayout></Mainlayout>,
        children:[
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: '/booking',
                element: <Booking></Booking>
            },
            {
                path: '/our-team',
                element: <OurTeam></OurTeam>
            },
            {
                path: '/services',
                element: <Services></Services>
            },
            {
                path: '/about',
                element: <AboutUs></AboutUs>
            },
            {
                path: '/shop',
                element: <Shop></Shop>
            },
        ]
    }
])