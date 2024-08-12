import { Link } from "react-router-dom";

const Footer = () => {
    return (
      <div className="grid grid-cols-3 gap-10 bg-zinc-100 text-center">
        <div>
          <h1 className="font-libre">LEONIE</h1>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <div>
          <h6 className="font-lg font-bold">Our Salon</h6>
          <Link to="">Locaiton & Favourite place</Link><br />
          <Link to="">History</Link>l<Link to="">Contact</Link><br />
          <Link to="">FAQ</Link>
        </div>
        <div>
          <h6 className="font-lg font-bold">Working Hour</h6>
          <p>
            <span>Monday-Friday</span>
            <br />
            <span>9:00-22:00</span>
          </p>
          <p>
            <span>Saturday-Sunday</span>
            <br />
            <span>11:00-00:00</span>
          </p>
        </div>
      </div>
    );
};

export default Footer;