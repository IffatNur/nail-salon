import { Link, NavLink } from "react-router-dom";
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
import { useEffect, useState } from "react";

const Navbar = () => {
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
            <Button variant="link">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-black" : ""
                }
              >
                Home
              </NavLink>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link">Pages</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Pages</DropdownMenuLabel>
                  <DropdownMenuSeparator></DropdownMenuSeparator>
                  <DropdownMenuItem>
                    <Link to="/our-team">Our Team</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/about">About Us</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/booking">Booking</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/services">Services & Prices</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/login">Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/register">Sign Up</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="link">
              <NavLink to="blog">Blog</NavLink>
            </Button>
            <Button variant="link">
              <NavLink to="shop">Shop</NavLink>
            </Button>
            <Button variant="link">
              <NavLink to="contact">Contact</NavLink>
            </Button>
          </div>
          <div className="mx-auto">
            <h1 className="font-libre text-3xl">LEONIE</h1>
          </div>
          <div className="mx-auto flex justify-center items-center">
            <Button variant="ghost">
              <NavLink
                to=""
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-black" : ""
                }
              >
                Book Now
              </NavLink>
            </Button>
            <Link to="">
              <ShoppingCart />
            </Link>
          </div>
        </div>
      </div>
    );
};

export default Navbar;