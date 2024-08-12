import Footer from "@/components/Footer";
import Appointment from "@/components/Sections/Home/Appointment";
import BestSeller from "@/components/Sections/Home/BestSeller";
import Collection from "@/components/Sections/Home/Collection";
import Contact from "@/components/Sections/Home/Contact";
import ContactSalon from "@/components/Sections/Home/ContactSalon";
import HeroSection from "@/components/Sections/Home/HeroSection";
import Manicure from "@/components/Sections/Home/Manicure";
import Social from "@/components/Sections/Home/Social";
import Treatments from "@/components/Sections/Home/Treatments";
import Trends from "@/components/Sections/Home/Trends";

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <Appointment></Appointment>
      <BestSeller></BestSeller>
      <Manicure></Manicure>
      <Contact></Contact>
      <Trends></Trends>
      <Collection></Collection>
      <Treatments></Treatments>
      <Social></Social>
      <ContactSalon></ContactSalon>
      <Footer></Footer>
    </div>
  );
};

export default Home;
