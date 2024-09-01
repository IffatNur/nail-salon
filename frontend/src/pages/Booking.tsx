import AvailableBooking from "@/components/Sections/Booking/AvailableBooking";
import BookingHero from "@/components/Sections/Booking/BookingHero";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Booking = () => {
  const [selected, setSelected] = useState<Date>(new Date());
  // const { user} = useAuth0()
  // if(user?.email) {
  //   toast.success('Login successfully');
  // }
    return (
      <div>
        <Toaster/>
        <BookingHero
          selected={selected}
          setSelected={setSelected}
        ></BookingHero>
        <AvailableBooking selected={selected}></AvailableBooking>
      </div>
    );
};

export default Booking;