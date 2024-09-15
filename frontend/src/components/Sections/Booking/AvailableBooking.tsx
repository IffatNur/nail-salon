import Container from "@/components/ui/Container";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import BookingOption from "./BookingOption";
import useAxiosPublic from "@/hooks/useAxiosPublic";

const AvailableBooking = ({ selected }) => {
  const [bookingOptions, setBookingOptions] = useState([]);
  const axiosPublic = useAxiosPublic()
  axiosPublic.get('/services')
  .then(res => setBookingOptions(res.data))
  // useEffect(() => {
  //   fetch("http://localhost:5002/services")
  //     .then((res) => res.json())
  //     .then((data) => setBookingOptions(data));
  // }, []);
  return (
    <Container className="bg-transparent w-full">
      <p className="font-semibold text-rose-400 flex justify-center">
        Available Booking Slots on {format(selected, "PP")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
        {bookingOptions.map((details, i) => (
          <BookingOption
            key={i}
            details={details}
            selected={selected}
          ></BookingOption>
        ))}
      </div>
    </Container>
  );
};

export default AvailableBooking;
