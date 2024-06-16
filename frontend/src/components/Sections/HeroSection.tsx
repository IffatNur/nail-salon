
import Slider from "react-slick";
const HeroSection = () => {
  const settings = {
    fade: true,
    infinite: true,
    speed: 150,
    autoplay: true,
    slidesToShow: 1,
    waitForAnimate: false,
    arrows: false,
  };
  return (
    // use framer motion 
    <div className="slider-container w-full relative top-0 -z-50 ">
      <Slider {...settings}>
        <div className="max-w-full h-[80vh]">
          <img src="https://i.ibb.co/j3Nb9Mp/h1-rev-img-01.jpg" />
        </div>
        <div className="max-w-full h-[80vh]">
          <img src="https://i.ibb.co/7ps5d0n/Main-Home-rev-img-02-paralax.jpg" />
        </div>
        <div className="max-w-full h-[80vh]">
          <img src="https://i.ibb.co/3k2fD8h/anna-kumpan-3-J5-K-Jb6-GRM-unsplash.jpg" />
        </div>
        <div className="max-w-full h-[80vh]">
          <img src="https://i.ibb.co/stPhTnT/designecologist-r-Ej0-NQm-Fl-Q-unsplash.jpg" />
        </div>
      </Slider>
    </div>
  );
};

export default HeroSection;
