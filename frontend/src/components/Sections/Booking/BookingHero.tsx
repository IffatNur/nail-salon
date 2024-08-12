
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

type TSelect = {
  selected?: Date | undefined,
  setSelected?: Date | undefined
}

const BookingHero = ({ selected, setSelected }: TSelect) => {
  const beforeMatcher = { before: new Date() };

  return (
    <div className="relative top-0">
      <div className="w-full h-[90vh] flex justify-center items-center">
        <DayPicker
          className="absolute bg-slate-300 z-40 p-5 opacity-80"
          mode="single"
          selected={selected}
          onSelect={setSelected}
          required
          disabled={beforeMatcher}
        ></DayPicker>
        <div className="absolute top-0 h-full w-full bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 z-10 opacity-25 "></div>
        <img
          className="-z-10 h-full w-full"
          src="https://i.ibb.co/Wv8zB0v/Booking-page-title-paralax-image-1.jpg"
        />
      </div>
    </div>
  );
};

export default BookingHero;
