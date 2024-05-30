import Image from "next/image";
import React from "react";
import solvro_circle_logo from "../../assets/solvro_circle_logo.png";
import Button from "../ui_target/button";

const AboutUs = () => {
  return (
    <section>
      <div className="flex px-12 ">
       
          <Image src={solvro_circle_logo} alt="Solvro logo"/>
  
        <div className="text-primary-foreground flex items-center ml-10 ">
            <div>
          <h3 className="uppercase font-bold">O nas</h3>
          <h2 className="text-4xl font-bold mb-10">
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
          <Button buttonText={"Poznaj nas"} href={"/home"} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
