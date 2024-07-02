import Banner from "@/app/(landingPage)/components/HeroSection/Banner";
import Skills from "./components/skills/Skills";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import Contact from "./components/ContactMe/Contact";
import Blog from "./components/Blog/Blog";

const MainPage = () => {
  return (
    <div>
      <Banner />
      <Projects />
      <Skills />
      <Blog />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default MainPage;
