import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Social = () => {
    return (
      <div className="my-20 relative w-full h-screen flex justify-center items-center">
          <div className="mx-auto text-center flex-col justify-center items-center w-8/12 md:w-5/12 bg-zinc-200 px-6 py-32 absolute top-60">
              <h1 className="absolute top-20 md:top-32 lg:top-24 left-4 md:left-56 font-seaweed font-thin text-3xl lg:text-6xl text-zinc-400 opacity-50 -skew-y-12">
                {" "}
                <i>Insta</i>{" "}
              </h1>
              <Instagram className="mx-auto" />
              <p className="text-5xl">Follow Our Socials</p>
          </div>
        <div className="grid grid-cols-3 md:grid-cols-5 h-screen w-full ">
          <div className="w-full h-60 md:h-96">
            <Link to="">
              <img
                className="h-full w-full"
                src="https://i.ibb.co/S3pcS7v/blog-list-feature-img1-1.jpg"
              />
            </Link>
          </div>
          <div className="w-full h-60 md:h-96">
            <Link to="">
              <img
                className="h-full w-full"
                src="https://i.ibb.co/YX8JQvB/blog-list-feature-img-2-1.jpg"
              />
            </Link>
          </div>
          <div className="w-full h-60 md:h-96">
            <Link to="">
              <img
                className="h-full w-full"
                src="https://i.ibb.co/yn2yHRN/h1-img-16.jpg"
              />
            </Link>
          </div>
          <div className="w-full h-60 md:h-96">
            <Link to="">
              <img
                className="h-full w-full"
                src="https://i.ibb.co/L5Nv8Xs/176009764-2923694844543154-586644538386171798-n.jpg"
              />
            </Link>
          </div>
          <div className="w-full h-60 md:h-96">
            <Link to="">
              <img
                className="h-full w-full"
                src="https://i.ibb.co/sH6SzH9/176597342-287909172918166-8186905381893320009-n.jpg"
              />
            </Link>
          </div>
          <div className="w-full h-60 md:h-96">
            <Link to="">
              <img
                className="h-full w-full"
                src="https://i.ibb.co/9htjXs4/175999242-2754391338206523-1469667115591637150-n.jpg"
              />
            </Link>
          </div>
          <div className="w-full h-60 md:h-96">
            <Link to="">
              <img
                className="h-full w-full"
                src="https://i.ibb.co/jH2yP3J/176042962-458543075428318-8723982801523979490-n.jpg"
              />
            </Link>
          </div>
          <div className="w-full h-60 md:h-96">
            <Link to="">
              <img
                className="h-full w-full"
                src="https://i.ibb.co/1G92nH4/176143397-453496075939392-2030180564152725859-n.jpg"
              />
            </Link>
          </div>
          <div className="w-full h-60 md:h-96">
            <Link to="">
              <img
                className="h-full w-full"
                src="https://i.ibb.co/h8mSk95/inner-2-img-4.jpg"
              />
            </Link>
          </div>
          <div className="w-full h-60 md:h-96">
            <Link to="">
              <img
                className="h-full w-full"
                src="https://i.ibb.co/wMzXjG4/inner-2-img-2.jpg"
              />
            </Link>
          </div>
        </div>
      </div>
    );
};

export default Social;