import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import logo_eventownik from "@/assets/logo_eventownik.png";

import { Button } from "../ui/button";
import { Toggle } from "../ui/toggle";
import { MobileMenu } from "./MobileMenu";

export const Navbar = () => {
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
    <header
      className={`sticky top-0 z-10 flex h-24 w-full items-center justify-between transition-colors duration-300 ${isScrolled ? "bg-gray-900 bg-opacity-75" : "bg-transparent"}`}
    >
      <Link href="/" className="ml-6">
        <Image alt="Logo eventownik" src={logo_eventownik} />
      </Link>

      <div className="hidden text-primary-foreground lg:mr-12 lg:flex lg:items-center  lg:text-base">
        <Link href="/" className="ml-8 ">
          Home
        </Link>
        <Link href="/" className="ml-8">
          O nas
        </Link>
        <Link href="/" className="ml-8">
          O aplikacji
        </Link>
        <Link href="/" className="ml-8">
          Kontakt
        </Link>
        <Button
          variant="outline"
          className="ml-8 rounded-md border border-primary-foreground bg-transparent px-3 py-2"
        >
          Utwórz wydarzenie
        </Button>
      </div>
      {!isMobileMenuOpen && (
        <div className="mr-6 lg:hidden ">
          <Toggle
            pressed={isMobileMenuOpen}
            onPressedChange={toggleMobileMenu}
          />
        </div>
      )}
      {isMobileMenuOpen ? (
        <MobileMenu onClose={toggleMobileMenu} isOpen={isMobileMenuOpen} />
      ) : null}
    </header>
  );
};
