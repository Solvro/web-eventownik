import Link from "next/link";
import type React from "react";

import { Button } from "../ui/button";
import { Toggle } from "../ui/toggle";

interface MobileMenuProps {
  onClose: () => void;
  isOpen: boolean;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ onClose, isOpen }) => {
  return isOpen ? (
    <>
      <button
        className="fixed inset-0 z-10 bg-black opacity-75"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 z-20 flex w-2/3 flex-col items-center justify-center bg-primary text-xl text-primary-foreground">
        <Toggle
          isOpen={isOpen}
          toggle={onClose}
          className="absolute right-6 top-8"
        />

        <Link
          href={{
            hash: "#",
          }}
          className="mt-8"
          onClick={onClose}
        >
          Home
        </Link>
        <Link
          href={{
            hash: "#",
          }}
          className="mt-8"
          onClick={onClose}
        >
          O nas
        </Link>
        <Link
          href={{
            hash: "#",
          }}
          className="mt-8"
          onClick={onClose}
        >
          O aplikacji
        </Link>
        <Link
          href={{
            hash: "#",
          }}
          className="mt-8"
          onClick={onClose}
        >
          Kontakt
        </Link>
        <Button
          variant="outline"
          className="mt-8 rounded-md border border-primary-foreground bg-transparent px-3 py-2"
          onClick={onClose}
        >
          Utwórz wydarzenie
        </Button>
      </div>
    </>
  ) : null;
};
