import Link from "next/link";
import React from "react";
import { Button } from "../ui_target/button";
import Toggle from "../ui_target/toggle";

interface MobileMenuProps {
  onClose: () => void;
  isOpen: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onClose, isOpen }) => {
  return (
    <>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-75 z-10" onClick={onClose}></div>
          <div className="fixed inset-y-0 right-0 w-2/3 bg-primary z-20 flex flex-col items-center justify-center text-primary-foreground text-xl">
            <Toggle isOpen={isOpen} toggle={onClose} className="absolute top-8 right-6" />

            <Link href="/home" className="mt-8" onClick={onClose}>
              Home
            </Link>
            <Link href="/about" className="mt-8" onClick={onClose}>
              O nas
            </Link>
            <Link href="/about-app" className="mt-8" onClick={onClose}>
              O aplikacji
            </Link>
            <Link href="/contact" className="mt-8" onClick={onClose}>
              Kontakt
            </Link>
            <Button variant="outline" className="mt-8 rounded-md border bg-transparent border-primary-foreground px-3 py-2" onClick={onClose}>
              Utwórz wydarzenie
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default MobileMenu;