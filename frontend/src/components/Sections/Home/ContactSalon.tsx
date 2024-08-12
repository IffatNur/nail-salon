import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

const ContactSalon = () => {
  return (
    <div className="grid grid-cols-2 gap-40 p-40 bg-gray-100">
      <div>
        <img src="https://i.ibb.co/frVgr45/main-img-1-2jpg.jpg" />
      </div>
      <div className="my-auto">
        <div className="my-5 text-center">
          <p>Contact</p>
          <h1 className="font-libre font-bold text-4xl">Contact Our Salon </h1>
        </div>
        <form action="" className="flex gap-5">
          <Input
            type="email"
            placeholder="Send Email"
            className=" w-full mx-auto border-0 border-b-2 rounded-none border-gray-500"
          />
          <Button
            className="mx-auto rounded-none border-gray-500 text-gray-500 px-20"
            variant="outline"
            type="submit"
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactSalon;
