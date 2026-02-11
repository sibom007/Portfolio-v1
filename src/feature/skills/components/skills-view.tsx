import {
  SiExpress,
  SiMongodb,
  SiPrisma,
  SiRedux,
  SiShadcnui,
} from "react-icons/si";
import React from "react";
import { BiLogoPostgresql } from "react-icons/bi";
import ScrollVelocity from "@/components/scroll-velocity";
import { FaGithub, FaNodeJs, FaReact } from "react-icons/fa6";
import { RiNextjsLine, RiTailwindCssLine, RiVercelLine } from "react-icons/ri";

export function SkillsView() {
  return (
    <section className="my-56">
      {/* ROW 1 – Frontend */}
      <ScrollVelocity
        velocity={60}
        className="modern-scroll-text"
        texts={[
          <React.Fragment key="react">
            <FaReact className="size-16 text-sky-500 ml-8" />
            <span className="text-foreground text-2xl">React</span>

            <RiNextjsLine className="size-16 text-gray-500 ml-8" />
            <span className="text-foreground text-2xl">Next.js</span>

            <RiTailwindCssLine className="size-16 text-sky-500 ml-8" />
            <span className="text-foreground text-2xl">Tailwind CSS</span>

            <SiShadcnui className="size-16 text-gray-500 ml-8" />
            <span className="text-foreground text-2xl">Shadcn UI</span>

            <SiRedux className="size-16 text-violet-500 ml-8" />
            <span className="text-foreground text-2xl">Redux</span>
          </React.Fragment>,
        ]}
      />

      {/* ROW 2 – Backend + Tools */}
      <ScrollVelocity
        velocity={-60}
        className="modern-scroll-text"
        texts={[
          <React.Fragment key="react">
            <FaNodeJs className="size-16 text-green-500 ml-8" />
            <span className="text-foreground text-2xl">Node.js</span>

            <SiExpress className="size-16 text-yellow-500 ml-8" />
            <span className="text-foreground text-2xl">Express.js</span>

            <SiMongodb className="size-16 text-emerald-500 ml-8" />
            <span className="text-foreground text-2xl">MongoDB</span>

            <BiLogoPostgresql className="size-16 text-sky-500 ml-8" />
            <span className="text-foreground text-2xl">PostgreSQL</span>

            <SiPrisma className="size-16 text-blue-900 ml-8" />
            <span className="text-foreground text-2xl">Prisma</span>

            <FaGithub className="size-16 text-white ml-8" />
            <span className="text-foreground text-2xl">Git & GitHub</span>

            <RiVercelLine className="size-16  ml-8" />
            <span className="text-foreground text-2xl">Vercel</span>
          </React.Fragment>,
        ]}
      />
    </section>
  );
}
