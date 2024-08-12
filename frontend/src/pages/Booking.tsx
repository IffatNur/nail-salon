import AvailableBooking from "@/components/Sections/Booking/AvailableBooking";
import BookingHero from "@/components/Sections/Booking/BookingHero";
import { useState } from "react";

const Booking = () => {
  const [selected, setSelected] = useState<Date>(new Date());

    return (
      <div>
        <BookingHero
          selected={selected}
          setSelected={setSelected}
        ></BookingHero>
        <AvailableBooking selected={selected}></AvailableBooking>
      </div>
    );
};

export default Booking;