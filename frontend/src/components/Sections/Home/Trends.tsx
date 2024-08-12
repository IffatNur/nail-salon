import { Link } from "react-router-dom";
import Container from "../../ui/Container";
import { Button } from "../../ui/button";

const Trends = () => {
  return (
    <Container>
      <div className="my-5 text-center">
        <p>Trends</p>
        <h1 className="font-libre font-bold text-4xl">Beauty & Cosmetics</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 h-screen">
        <div className="relative">
          <Button
            variant="ghost"
            className="bg-zinc-100 absolute top-5 left-5 rounded-none py-8 px-4"
          >
            <Link to="">
              <span className="font-semibold font-libre text-lg">24</span>
              <br />
              <span>April</span>
            </Link>
          </Button>
          <img
            className="h-3/4 mx-auto"
            src="https://i.ibb.co/vkbTJ7M/inner-2-img-3.jpg"
          />
          <div className="my-5">
            <p className="text-sm">BEAUTY.COSMETICS</p>
            <h1 className="font-libre font-bold text-xl my-2">
              The Best Face Masks
            </h1>
            <p className="text-sm">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic,
              incidunt.
            </p>
            <Button
              variant="link"
              className="border-b-2 rounded-none border-gray-500 text-gray-500 ps-0"
            >
              Read More
            </Button>
          </div>
        </div>
        <div className="relative">
          <Button
            variant="ghost"
            className="bg-zinc-100 absolute top-5 left-5 rounded-none py-8 px-4"
          >
            <Link to="">
              <span className="font-semibold font-libre text-lg">24</span>
              <br />
              <span>April</span>
            </Link>
          </Button>
          <img
            className="h-3/4 mx-auto"
            src="https://i.ibb.co/vkbTJ7M/inner-2-img-3.jpg"
          />
          <div className="my-5">
            <p className="text-sm">BEAUTY.COSMETICS</p>
            <h1 className="font-libre font-bold text-xl my-2">
              Sunscreen And Care
            </h1>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
              consequatur.
            </p>
            <Button
              variant="link"
              className="border-b-2 rounded-none border-gray-500 text-gray-500 ps-0"
            >
              Read More
            </Button>
          </div>
        </div>
        <div className="relative">
          <Button
            variant="ghost"
            className="bg-zinc-100 absolute top-5 left-5 rounded-none py-8 px-4"
          >
            <Link to="">
              <span className="font-semibold font-libre text-lg">24</span>
              <br />
              <span>April</span>
            </Link>
          </Button>
          <img
            className="h-3/4 mx-auto"
            src="https://i.ibb.co/vkbTJ7M/inner-2-img-3.jpg"
          />
          <div className="my-5">
            <p className="text-sm">BEAUTY.COSMETICS</p>
            <h1 className="font-libre font-bold text-xl my-2">
              Best Nail Care
            </h1>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos,
              velit?
            </p>
            <Button
              variant="link"
              className="border-b-2 rounded-none border-gray-500 text-gray-500 ps-0"
            >
              Read More
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Trends;
