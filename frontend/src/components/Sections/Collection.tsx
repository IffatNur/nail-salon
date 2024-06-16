import Slider from "react-slick";
import Container from "../ui/Container";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Collection = () => {
    const settings = {
      infinite: true,
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1500,
      pauseOnHover: true,
    };
    return (
      <Container className="py-10 text-center">
        <div className="my-5 text-center">
          <p>LIMITED . EDITION</p>
          <h1 className="font-libre font-bold text-4xl">
            Let It Ripple Collection
          </h1>
        </div>
        <div className="slider-container my-16">
          <Slider {...settings}>
            <div>
              <img
                className="mx-auto"
                src="https://i.ibb.co/s3s5x4y/h1-img-8.jpg"
              />
            </div>
            <div>
              <img
                className="mx-auto"
                src="https://i.ibb.co/jW5d0hG/h1-img-9.jpg"
              />
            </div>
            <div>
              <img
                className="mx-auto"
                src="https://i.ibb.co/M1B8245/h1-img-10.jpg"
              />
            </div>
            <div>
              <img
                className="mx-auto"
                src="https://i.ibb.co/x3k3NxS/h1-img-11.jpg"
              />
            </div>
            <div>
              <img
                className="mx-auto"
                src="https://i.ibb.co/wBW6Vwx/h1-img-12.jpg"
              />
            </div>
            <div>
              <img
                className="mx-auto"
                src="https://i.ibb.co/P6Kd0Qz/h1-img-13.jpg"
              />
            </div>
            <div>
              <img
                className="mx-auto"
                src="https://i.ibb.co/tL1hckK/h1-img-14.jpg"
              />
            </div>
            <div>
              <img
                className="mx-auto"
                src="https://i.ibb.co/61RwB9d/h1-img-15.jpg"
              />
            </div>
          </Slider>
        </div>
        <div >
          <Link to="">
          <Button
            variant="outline"
            className="w-72 rounded-none border-2 border-gray-400"
          >
            Shop Now
          </Button>
          </Link>
        </div>
      </Container>
    );
};

export default Collection;