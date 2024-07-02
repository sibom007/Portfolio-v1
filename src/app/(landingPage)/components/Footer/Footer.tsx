import Image from "next/image";
import logo from "@/assets/icons/—Pngtree—letter s logo png_8280506.png";

const Footer = () => {
  return (
    <div className="mt-20  text-white">
      <div className="flex justify-center">
        <Image src={logo} alt="logo" width={100} height={100} />
      </div>
      <div className="text-white mt-2 text-center">
        <p className="text-2xl font-semibold text-white/90">
          sibomsaha77@gmail.com
        </p>
        <p className="text-2xl font-semibold text-primary">
          © 2024 All Rights Reserved by ThemeJunction
        </p>
      </div>
    </div>
  );
};

export default Footer;
