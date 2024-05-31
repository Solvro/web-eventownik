import Image from "next/image";
import React from "react";
import solvro_circle_logo from "../../assets/solvro_circle_logo.png";
import { Button } from "@/components/ui/button"

const AboutUs = () => {
  return (
    <section>
      <div className="flex flex-col xl:flex-row px-12  xl:my-0 ">
       
      <div className="xl:w-1/2 flex justify-center xl:justify-start"> 
          <Image src={solvro_circle_logo} alt="Solvro logo" className="order-1 lg:order-1 mb-10 xl:mb-0"/>
        </div>
  
        <div className="text-primary-foreground flex items-center xl:ml-10 order-2 xl:order-2 mb-10 xl:mb-0 xl:my-0">
            <div>
          <h3 className="uppercase font-bold text-xs md:text-xl">O nas</h3>
          <h2 className="font-bold mb-10 text-2xl lg:text-4xl">
            Solvro to przestrzeń, w której spełniają się pomysły.
          </h2>
          <p className="mb-8">
            Koło Naukowe Solvro działa na Politechnice Wrocławskiej od wielu
            lat. Wielu nazwywa nas Politechnicznym<br/> Softwarehousem, no bo w sumie
            nim jesteśmy. W Solvro działamy na wielu frontach, eksplorując
            dzikie zakamarki<br/> kodu i tworząc innowacyjne projekty. Funkcjonujemy
            jak dynamiczny software house, ale bez sztywnych <br/> garniturów i bez
            korpo logiki - u nas liczy się pasja do kodowania i kreatywność!{" "}
          </p>
          <Button variant="secondary" className={'py-8 px-8 rounded-md font-bold text-lg'}>Poznaj nas</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
