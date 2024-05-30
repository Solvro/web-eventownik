import Image from "next/image";
import React from "react";
import macbook_mockup from "../../assets/macbook_mockup.png";
import cube from "../../assets/cube.png";
import sphere from "../../assets/sphere.png";
import Button from "../ui_target/button";

const Hero = () => {
  return (
    <section >
      <div className="p-12 pb-40 flex justify-between items-center mt-24 ">
        <div>
          <h1 className="text-7xl text-primary-foreground mb-8 h-3/4 text">
            Eventownik - zróbmy razem
            <br />
            wydarzenie!
          </h1>
          <Button buttonText={"Utwórz wydarzenie"} href={"/home"} />
        </div>
       <div className="w-100 h-100 mr-80 relative">
        <Image alt="Laptop"  src={macbook_mockup} />
        <Image alt="Sphere" src={sphere} className="absolute top-0 -left-48"></Image>
        <Image alt="Cube" src={cube} className="absolute bottom-0 -right-48"></Image>
        </div>
      </div>
    </section>
  );
};

export default Hero;
