import Image from "next/image";
import { useEffect, useState } from "react";
import Logo from "../../assets/logo.svg";

interface Props {
  ConnectButton: () => JSX.Element;
}

const Navbar = ({ ConnectButton }: Props) => {
  const [navbarVisible, setNavbarVisible] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = window.addEventListener("scroll", handleScroll);
    return unsubscribe;
  });

  const handleScroll = () => {
    if (typeof document === "undefined") return;
    if (
      document.body.scrollTop > 150 ||
      document.documentElement.scrollTop > 150
    ) {
      document.getElementById("navbar")!.style.backgroundColor = "#191b1f";
    } else {
      document.getElementById("navbar")!.style.backgroundColor = "transparent";
    }
  };

  return (
    <div
      id="navbar"
      className="bg-[#191b1f] w-full fixed top-0 left-1/2 -translate-x-1/2 h-[70px] z-50 transition-all ease-in duration-300"
    >
      <div className="px-[16px] md:px-[32px] lg:px-[64px] max-w-[1440px] w-full mx-auto h-full flex items-center">
        <div className="flex flex-1 items-center justify-start">
          <Image src={Logo} alt="GMZilla" />
        </div>

        <div className="hidden lg:flex flex-1 items-center justify-end">
          <ConnectButton />
        </div>
        <div
          className="flex flex-col lg:hidden"
          onClick={() => setNavbarVisible(true)}
        >
          <span className="bg-white h-[4px] w-[30px] my-[2px]"></span>
          <span className="bg-white h-[4px] w-[30px] my-[2px]"></span>
          <span className="bg-white h-[4px] w-[30px] my-[2px]"></span>
        </div>
        {navbarVisible && (
          <div
            className="absolute text-white bg-[#000000B2] !z-10 top-0 left-0 px-[38px] py-[35px] h-screen w-full flex flex-col items-end"
            onClick={() => setNavbarVisible(false)}
          >
            <div
              onClick={() => setNavbarVisible(false)}
              className="text-[40px] text-white"
            >
              &times;
            </div>
            {/* <button className="text-black bg-[#FBD03B] uppercase px-[24px] py-[6px] rounded-[10px] my-[12px]">
              Connect
            </button> */}
            <ConnectButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
