import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";

import cube from "../../assets/cube.png";
import visionImage from "../../assets/landing_vision.png";
import sphere from "../../assets/sphere.png";
import { MacbookScroll } from "../ui/macbook-scroll";

const Hero = () => {
  return (
    <section>
      <div className="p-12 pb-0 flex flex-col xl:flex-row xl:justify-between  mt-8 xl:mt-24 ">
        <div className="xl:mb-0">
          <div>
            <h1 className="text-3xl md:text-5xl 2xl:text-7xl text-primary-foreground mb-8 h-3/4 text order-2 xl:order-1 ">
              Eventownik - zróbmy razem
              <br />
              wydarzenie!
            </h1>
            <Button
              variant="secondary"
              className={"bg-secondary py-8 px-8 rounded-md font-bold text-lg"}
            >
              Utwórz wydarzenie
            </Button>
          </div>
        </div>
        <div>
          <MacbookScroll src={visionImage.src} />
        </div>
        <div className="relative">
          <div className="xl:absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="xl:absolute top-0 -left-48">
              <Image alt="Sphere" src={sphere} className="hidden 2xl:block" />
            </div>
            <div className="xl:absolute top-48" style={{ left: "-80rem" }}>
              <Image alt="Cube" src={cube} className="hidden 2xl:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
