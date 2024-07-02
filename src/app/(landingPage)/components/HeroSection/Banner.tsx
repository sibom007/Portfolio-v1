import { AiFillGithub } from "react-icons/ai";
import { AiOutlineFacebook } from "react-icons/ai";
import { AiOutlineLinkedin } from "react-icons/ai";
import { AiOutlineDiscord } from "react-icons/ai";
import HISubbanner from "./HISubbanner";
import BannerImg from "./BannerImg";

const Banner = () => {
  return (
    <div className="px-16 ">
      <div className=" md:flex justify-between mt-2  md:mt-10 z-10">
        <div className="text-center  md:text-left">
          <p className="text-lg lg:text-4xl md:text-2xl font-bold text-white/80 ">
            I am sibom
          </p>
          <p
            className="text-3xl xl:text-7xl md:text-3xl lg:text-5xl leading-tight font-bold tracking-tighter 
          bg-clip-text text-transparent
         bg-gradient-to-r from-[#804ceb]  to-white/65">
            Fullstak +
            <br />
            web Developer
          </p>
          <p className="text-sm md:text-sm text-white/80 mt-2 md:mt-4">
            Certainly! A Full Stack Developer is a <br /> versatile professional
            skilled in both front-end and <br /> back-end development.
          </p>

          <div className="mt-5 md:mt-6 flex justify-center md:justify-normal mb-4 md:mb-0">
            <ul className="flex gap-2 md:gap-4 items-center">
              <button
                className="text-sm font-semibold bg-primary text-white px-2 py-1 md:px-7 md:py-4 md:text-base 
            rounded-full
            hover:bg-white/90 hover:text-primary duration-500
            ">
                Project
              </button>
              <p>
                <AiOutlineFacebook className=" size-6 lg:size-10 md:size-7 text-primary  border-2 rounded-full p-[3px] lg:p-2 md:p-1 border-primary  hover:text-white hover:bg-primary duration-500" />
              </p>
              <p>
                <AiOutlineDiscord className=" size-6 lg:size-10 md:size-7 text-primary  border-2 rounded-full p-[3px] lg:p-2 md:p-1 border-primary  hover:text-white hover:bg-primary duration-500" />
              </p>
              <p>
                <AiOutlineLinkedin className=" size-6 lg:size-10 md:size-7 text-primary  border-2 rounded-full p-[3px] lg:p-2 md:p-1 border-primary  hover:text-white hover:bg-primary duration-500" />
              </p>
              <p>
                <AiFillGithub className=" size-6 lg:size-10 md:size-7 text-primary  border-2 rounded-full p-[3px] lg:p-2 md:p-1 border-primary  hover:text-white hover:bg-primary duration-500" />
              </p>
            </ul>
          </div>
        </div>

        <div>
          <BannerImg />
        </div>
      </div>
      <HISubbanner />
    </div>
  );
};

export default Banner;
