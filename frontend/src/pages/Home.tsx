import Appointment from "@/components/Sections/Appointment";
import BestSeller from "@/components/Sections/BestSeller";
import Collection from "@/components/Sections/Collection";
import Contact from "@/components/Sections/Contact";
import HeroSection from "@/components/Sections/HeroSection";
import Manicure from "@/components/Sections/Manicure";
import Social from "@/components/Sections/Social";
import Treatments from "@/components/Sections/Treatments";
import Trends from "@/components/Sections/Trends";

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
    </div>
  );
};

export default Home;
