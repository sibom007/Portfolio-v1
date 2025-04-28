import Banner from "@/app/(landingPage)/components/HeroSection/Banner";
import Footer from "./components/Footer/Footer";

import { Projects } from "@/Modules/Project/components/Projects";
import Skills from "@/Modules/skills/components/Skills";
import { About } from "@/Modules/about/components/About";
// import Skills from "@/Modules/skills/components/Skills";



const MainPage = () => {
  return (
    <div>
      <Banner />
      <Projects />
      <Skills />
      <About />

      {/* <Projects />
      <Skills />
      <Blog /> */}
      {/* <About />
      <Contact /> */}
      <Footer />
    </div>
  );
};

export default MainPage;
