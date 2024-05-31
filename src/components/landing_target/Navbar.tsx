import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import logo_eventownik from "../../assets/logo_eventownik.png";
import { Button } from "../ui_target/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
   <header className={`sticky top-0 w-full h-24 flex justify-between items-center z-10 transition-colors duration-300 ${isScrolled ? 'bg-gray-900 bg-opacity-75' : 'bg-transparent'}`}>
      <Link href="/home" className="ml-6">
        <Image alt="Logo eventownik" src={logo_eventownik}></Image>
      </Link>

      <div className="mr-12 text-primary-foreground text-base">
        <Link href="/home" className="ml-8">
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
        <Button variant="outline" className={'ml-8 rounded-md border bg-transparent border-primary-foreground px-3 py-2'}>Utwórz wydarzenie</Button>
      </div>
    </header>
  );
};

export default Navbar;
