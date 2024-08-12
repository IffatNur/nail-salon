import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import BookingModal from "./BookingModal";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const BookingOption = ({ details, selected }) => {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState(null);
  const { id, service_category, service_name, time } = details;
  return (
    <div>
      <Card className="shadow-xl text-center">
        <CardHeader>
          <CardTitle>{service_category}</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{time.length > 0 ? time[0] : "No available slot"}</p>
          <p>{time.length && <span>{time.length} slots available</span>}</p>
        </CardContent>
        <CardFooter className="flex justify-center w-full">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                disabled={time.length === 0}
                onClick={() => setService(details)}
                className="w-full bg-gradient-to-r from-purple-500 via-rose-400 to-purple-500"
              >
                Book Appointment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <BookingModal
                service={service}
                selected={selected}
                setOpen={setOpen}
              ></BookingModal>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookingOption;