import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo_eventownik from "../../assets/logo_eventownik.png";
import { Button } from "../ui/button";
import Toggle from "../ui/toggle";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };
    handleScroll(); 
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScrolling = () => {
      if (isMobileMenuOpen) {
        document.documentElement.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "auto";
      }
    };
    handleScrolling();
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`sticky top-0 w-full h-24 flex justify-between items-center z-10 transition-colors duration-300 ${isScrolled ? 'bg-gray-900 bg-opacity-75' : 'bg-transparent'}`}>
      <Link href="/home" className="ml-6">
        <Image alt="Logo eventownik" src={logo_eventownik} />
      </Link>

      <div className="hidden lg:flex lg:items-center lg:mr-12 text-primary-foreground  lg:text-base">
        <Link href="/home" className="ml-8 ">
          Home
        </Link>
        <Link href="/about" className="ml-8">
          O nas
        </Link>
        <Link href="/about-app" className="ml-8">
          O aplikacji
        </Link>
        <Link href="/contact" className="ml-8">
          Kontakt
        </Link>
        <Button variant="outline" className="ml-8 rounded-md border bg-transparent border-primary-foreground px-3 py-2">
          Utwórz wydarzenie
        </Button>
      </div>
      {!isMobileMenuOpen &&
      <div className="lg:hidden mr-6 ">
        <Toggle isOpen={isMobileMenuOpen} toggle={toggleMobileMenu} />
      </div>
}
      {isMobileMenuOpen && <MobileMenu onClose={toggleMobileMenu} isOpen={isMobileMenuOpen} />}
    </header>
  );
};

export default Navbar;
