import Container from "../ui/Container";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Appointment = () => {
  return (
    <div>
      <Container>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  max-w-full gap-4 items-center ">
            <Input
              type="text"
              placeholder="Name"
              className=" w-full mx-auto border-0 border-b-2 rounded-none border-gray-500"
            />
            <Input
              type="email"
              placeholder="Email"
              className=" w-full mx-auto border-0 border-b-2 rounded-none border-gray-500"
            />
            <Input
              type="text"
              placeholder="Phone"
              className=" w-full mx-auto border-0 border-b-2 rounded-none border-gray-500"
            />
            <Button
              className=" w-full mx-auto rounded-none border-gray-500 text-gray-500 px-20"
              variant="outline"
              type="submit"
            >
              Book Appointment
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Appointment;
