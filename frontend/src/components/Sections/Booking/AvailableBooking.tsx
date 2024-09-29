import Container from "@/components/ui/Container";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import BookingOption from "./BookingOption";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useServices from "@/hooks/useServices";

const AvailableBooking = ({ selected }) => {
  const[services,refetch] = useServices()
  return (
    <Container className="bg-transparent w-full">
      <p className="font-semibold text-rose-400 flex justify-center">
        Available Booking Slots on {format(selected, "PP")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
        {services.map((details, i) => (
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
