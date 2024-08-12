import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";

const BookingModal = ({ service, selected,setOpen  }) => {
  const { service_category, service_name, time,cost } = service;
  const handleSubmit  = event =>{
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const address = event.target.address.value;
    const service = event.target.service.value;
    const time = event.target.time.value;
    const userDetails = {
        appointmentTime: format(selected,'PP'),
        clientName:name,
        email,
        address,
        serviceName: service,
        time
    }
    console.log(userDetails);
  }

  return (
    <div>
      {/* <DialogTrigger asChild>
        <Button onClick={()=>} className="w-full bg-gradient-to-r from-purple-500 via-rose-400 to-purple-500">
          Book Appointment
        </Button>
      </DialogTrigger> */}
      <DialogHeader>
        <DialogTitle>{service_category}</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
        <div>
          <Label htmlFor="date">Appointment Date</Label>
          <Input
            id="date"
            disabled
            value={format(selected, "PP")}
            className="bg-gray-200 text-gray-900 font-bold"
          ></Input>
        </div>
        <div>
          <Label htmlFor="cost">Service cost</Label>
          <Input
            id="cost"
            disabled
            value={cost}
            className="bg-gray-200 text-gray-900 font-bold"
          ></Input>
        </div>
        <div>
          <Select name="service">
            <SelectTrigger>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Service Name</SelectLabel>
                {service_name.map((service, i) => (
                  <SelectItem value={service} key={i}>
                    {service}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select name="time">
            <SelectTrigger>
              <SelectValue placeholder="Select service schedule" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Service Schedule</SelectLabel>
                {time.map((t, i) => (
                  <SelectItem value={t} key={i}>
                    {t}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Input
            type="text"
            id="name"
            className="bg-gray-200 text-gray-900 font-bold"
            placeholder="Your name"
          ></Input>
        </div>
        <div>
          <Input
            type="email"
            id="email"
            className="bg-gray-200 text-gray-900 font-bold"
            placeholder="Your email"
          ></Input>
        </div>
        <div>
          <Input
            type="text"
            id="address"
            className="bg-gray-200 text-gray-900 font-bold"
            placeholder="Your address"
          ></Input>
        </div>
        <Button
          className="w-full bg-gradient-to-r from-purple-700 via-rose-600 to-purple-700 mt-5"
          type="submit"
          onClick={() => setOpen(false )}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default BookingModal;