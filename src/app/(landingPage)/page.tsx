
import Particles from "@/components/Particles";
import { Navbar } from "@/feature/shared/components/navbar";
import { AboutView } from "@/feature/about/components/about-view";
import { SkillsView } from "@/feature/skills/components/skills-view";
import { ProjectView } from "@/feature/projects/components/project-view";
import { ContactUsView } from "@/feature/contact-us/components/contact-us-view";
import { HeroSection } from "@/feature/hero-section/components/hero-section";

const MainPage = () => {
  return (
    <div className="relative min-h-screen  overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/*  BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles
          particleColors={["#DCA06D"]}
          particleCount={800}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />

        {/* optional grid texture */}
        <div className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]" />
      </div>

      {/*  CONTENT LAYER */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <ProjectView />
        <SkillsView />
        <AboutView />
        <ContactUsView />
      </div>
    </div>
  );
};

export default MainPage;
