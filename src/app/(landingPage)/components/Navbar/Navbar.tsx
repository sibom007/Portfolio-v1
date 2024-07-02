import Image from "next/image";
import Links from "./DestopMenu/Links";
import MobileMenu from "./MobileMenu/MobileMenu";
import logo from "@/assets/icons/—Pngtree—letter s logo png_8280506.png";

const Navbar = () => {
  return (
    <div className="py-7 mt-3 text-white px-16">
      {/* destop view */}
      <div className="hidden md:block">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <p className="text-2xl text-nowrap">
              <Image src={logo} alt="logo" width={50} height={50} />
            </p>
            <p className="text-2xl text-nowrap">Sibom saha</p>
          </div>
          <div>
            <Links />
          </div>
        </div>
      </div>

      {/* Mobial view */}
      <div className="md:hidden">
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
