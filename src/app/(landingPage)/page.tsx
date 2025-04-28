
import Banner from "@/Modules/heroSections/components/HeroSection/Banner";
import { Projects } from "@/Modules/Project/components/Projects";
import { Skills } from "@/Modules/skills/components/Skills";
import { About } from "@/Modules/about/components/About";
import { ContactUs } from "@/Modules/contact/components/ContactUs";
import Footer from "../../Modules/shared/Footer";



const MainPage = () => {
  return (
    <div>
      <Banner />
      <Projects />
      <Skills />
      <About />
      <ContactUs />
    </div>
  );
};

export default MainPage;
