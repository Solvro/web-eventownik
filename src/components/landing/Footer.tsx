import Image from "next/image";
import React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import facebook from "../../assets/facebook.svg";
import github from "../../assets/github.svg";
import linkedin from "../../assets/linkedin.svg";
import logo_solvro_normal from "../../assets/logo_solvro_normal.png";
import pwr_logo from "../../assets/pwr_logo.svg";
import w_4 from "../../assets/w4_logo.svg";

const Footer = () => {
  return (
    <footer className="bg-[#D9E8FF]">
      <div className="flex flex-col md:flex-row justify-between md:justify-between items-center px-12 py-20">
        <div className="flex flex-col mb-8 md:mb-0">
          <Image
            src={logo_solvro_normal}
            alt="Solvro logo"
            width={168}
            height={36}
            className="mb-2"
          />
          <a href="mailto:kn.solvro@pwr.edu.pl">kn.solvro@pwr.edu.pl</a>
        </div>

        <div className="relative md:absolute md:left-1/2 md:transform md:-translate-x-1/2 text-center mb-8 md:mb-0">
          <h3 className="uppercase mb-2">Obserwuj nas</h3>
          <a
            href="https://github.com/Solvro/web-eventownik"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "rounded-full bg-[#152959] p-2 mx-2 cursor-pointer hover:bg-[#274276]",
            )}
          >
            <Image alt="Github" src={github}></Image>
          </a>
          <a
            href="https://www.facebook.com/knsolvro"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "rounded-full bg-[#152959] p-2 mx-2 cursor-pointer hover:bg-[#274276]",
            )}
          >
            <Image alt="Facebook" src={facebook}></Image>
          </a>
          <a
            href="https://www.linkedin.com/company/knsolvro/"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "rounded-full bg-[#152959] p-2 mx-2 cursor-pointer hover:bg-[#274276]",
            )}
          >
            <Image alt="Linkedin" src={linkedin}></Image>
          </a>
        </div>
        <div className="flex flex-row">
          <Image src={w_4} alt="W4N logo" className="svg-black" />
          <Image src={pwr_logo} alt="Pwr logo" className="ml-5 svg-black" />
        </div>
      </div>
      <div className=" py-6 text-center bg-[#274276] text-primary-foreground">
        <h3>
          Made with ❤️ by{" "}
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://solvro.pwr.edu.pl"
            className=" hover:border-b-2"
          >
            Solvro
          </a>{" "}
          © {new Date().getFullYear()}
        </h3>
      </div>
    </footer>
  );
};

export default Footer;
