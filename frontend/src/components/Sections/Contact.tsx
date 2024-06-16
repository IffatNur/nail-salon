import Container from "../ui/Container";
import { Button } from "../ui/button";

const Contact = () => {
  return (
    <Container className="grid grid-cols-1 md:grid-cols-2 h-full gap-20 py-20">
      <div className="h-3/4 w-full">
        <img
          className="h-full mx-auto"
          src="https://i.ibb.co/CWPbhjm/h1-img-6-1.jpg"
        />
        <div className="my-5 text-center">
          <p>CONTACT . STORE</p>
          <h1 className="font-libre font-bold text-xl">Our Salon Place</h1>
          <Button
            variant="outline"
            className="mx-auto rounded-none border-gray-500 text-gray-500 px-20"
          >
            View More
          </Button>
        </div>
      </div>
      <div className="h-3/4 w-full">
        <img
          className="h-full mx-auto"
          src="https://i.ibb.co/vkbTJ7M/inner-2-img-3.jpg"
        />
        <div className="my-5 text-center">
          <p>SHADES.INSPIRED</p>
          <h1 className="font-libre font-bold text-xl">New Limited Edition</h1>
          <Button
            variant="outline"
            className="mx-auto rounded-none border-gray-500 text-gray-500 px-20"
          >
            View More
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Contact;
