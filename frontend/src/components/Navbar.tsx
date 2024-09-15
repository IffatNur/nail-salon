import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingCart } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthProvider";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SheetElements from "./SheetElements";
import useAppointment from "@/hooks/useAppointment";

const Navbar = () => {
  // const {logout, isAuthenticated,user} = useAuth0(); #Auth0
  const { SignOut, user } = useContext(AuthContext);
  const navigate = useNavigate()
  const [appointment] = useAppointment()
  const handleSignout = () =>{
    // logout(); #Auth0
    SignOut()
    navigate("/login");
  }
    const [header, setHeader] = useState(false);
    const handleScroll  = () =>{
      if(window.scrollY >= 90){
        setHeader(true)
      }else{
        setHeader(false)
      }
    }
    useEffect(()=>{
      window.addEventListener('scroll', handleScroll)
      return () =>{
        window.addEventListener('scroll', handleScroll)
      }
    },[])
    return (
      <div
        className={
          header
            ? "w-full bg-white fixed top-0 py-4 z-50"
            : "w-full bg-transparent py-5 absolute top-0 z-50 "
        }
      >
        <div className="grid grid-cols-3 justify-between items-center">
          <div className="mx-auto ">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "border-b-2 border-black" : ""
              }
            >
              <Button className="bg-transparent hover:bg-transparent text-black">
                Home
              </Button>
            </NavLink>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-transparent hover:bg-transparent text-black">
                  Pages
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Pages</DropdownMenuLabel>
                  <DropdownMenuSeparator></DropdownMenuSeparator>

                  <Link to="/our-team">
                    <DropdownMenuItem>Our Team</DropdownMenuItem>
                  </Link>
                  <Link to="/about">
                    <DropdownMenuItem>About Us</DropdownMenuItem>
                  </Link>
                  <Link to="/booking">
                    <DropdownMenuItem>Booking</DropdownMenuItem>
                  </Link>
                  <Link to="/services">
                    <DropdownMenuItem>Services & Prices</DropdownMenuItem>
                  </Link>
                  <Link to="/dashboard">
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  </Link>
                  <Link to="/login">
                    <DropdownMenuItem>Login</DropdownMenuItem>
                  </Link>
                  <Link to="/register">
                    <DropdownMenuItem>Sign Up</DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <NavLink
              to="blog"
              className={({ isActive }) =>
                isActive ? "border-b-2 border-black" : ""
              }
            >
              <Button className="bg-transparent hover:bg-transparent text-black">
                Blog
              </Button>
            </NavLink>

            <NavLink
              to="shop"
              className={({ isActive }) =>
                isActive ? "border-b-2 border-black" : ""
              }
            >
              <Button className="bg-transparent hover:bg-transparent text-black">
                Shop
              </Button>
            </NavLink>

            <NavLink
              to="contact"
              className={({ isActive }) =>
                isActive ? "border-b-2 border-black" : ""
              }
            >
              <Button className="bg-transparent hover:bg-transparent text-black">
                Contact
              </Button>
            </NavLink>
          </div>
          <div className="mx-auto">
            <h1 className="font-libre text-3xl">LEONIE</h1>
          </div>
          <div className="mx-auto flex justify-center items-center gap-4">
            <div>
              <Button className="bg-transparent text-black hover:bg-transparent">
                <NavLink
                  to=""
                  className={({ isActive }) =>
                    isActive ? "border-b-2 border-black" : ""
                  }
                >
                  Book Now
                </NavLink>
              </Button>
            </div>
            <div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="hover:bg-transparent">
                    <ShoppingCart />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetElements appointment={appointment}></SheetElements>
                </SheetContent>
              </Sheet>
            </div>
            <div>
              {user && (
                <div>
                  <Button
                    className="bg-rose-100 text-gray-500 opacity-80 hover:bg-rose-100"
                    onClick={() => handleSignout()}
                  >
                    Signout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          {user && (
            <p className="font-libre font-thin text-center text-sm">
              Welcome, {user?.displayName}
            </p>
          )}
        </div>
      </div>
    );
};

export default Navbar;