import Image from "next/image";
import React from "react";
import logo_solvro_normal from "../../assets/logo_solvro_normal.png";
import pwr_logo from "../../assets/pwr_logo.svg";
import w_4 from "../../assets/w4_logo.svg";
import linkedin from "../../assets/linkedin.svg";
import facebook from "../../assets/facebook.svg";
import github from "../../assets/github.svg";
import { Button } from "@/components/ui_target/button"

const Footer = () => {
  return (
    <footer className="bg-muted">
      <div className="flex flex-col md:flex-row justify-between md:justify-between items-center px-12 py-20">
        <div className="flex flex-col mb-8 md:mb-0">
          <Image src={logo_solvro_normal} alt="Solvro logo" width={168} height={36} className="mb-2" />
          <p>kn.solvro@pwr.edu.pl</p>
        </div>

        <div className="relative md:absolute md:left-1/2 md:transform md:-translate-x-1/2 text-center mb-8 md:mb-0">
          <h3 className="uppercase mb-2 ">Obserwuj nas</h3>
          <Button variant="secondary" className={'rounded-full bg-primary p-2 mx-2 hover:bg-accent'}  ><Image alt="Github" src={github}></Image></Button >
          <Button  variant="secondary" className={'rounded-full bg-primary p-2 mx-2 hover:bg-accent'} ><Image alt="Facebook" src={facebook}></Image></Button>
          <Button  variant="secondary" className={'rounded-full bg-primary p-2 mx-2 hover:bg-accent'} ><Image alt="Linkedin" src={linkedin}></Image></Button>
        </div>
        <div className="flex flex-row">
        <Image src={w_4} alt="W4N logo" className="svg-black" />
          <Image src={pwr_logo} alt="Pwr logo" className="ml-5 svg-black" />
        </div>
      </div>
      <div className=" py-6 text-center bg-accent text-primary-foreground">
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
