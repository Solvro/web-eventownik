import Image from "next/image";
import React from "react";

import solvro_circle_logo from "@/assets/solvro_circle_logo.png";
import { Button } from "@/components/ui/button";

export const AboutUs = () => {
  return (
    <section>
      <div className="flex flex-col px-12 xl:my-0  xl:flex-row ">
        <div className="flex justify-center xl:w-1/2 xl:justify-start">
          <Image
            src={solvro_circle_logo}
            alt="Solvro logo"
            className="order-1 mb-10 lg:order-1 xl:mb-0"
          />
        </div>

        <div className="order-2 mb-10 flex items-center text-primary-foreground xl:order-2 xl:my-0 xl:mb-0 xl:ml-10">
          <div>
            <h3 className="text-xs font-bold uppercase md:text-xl">O nas</h3>
            <h2 className="mb-10 text-2xl font-bold lg:text-4xl">
              Solvro to przestrzeń, w której spełniają się pomysły.
            </h2>
            <p className="mb-8">
              Koło Naukowe Solvro działa na Politechnice Wrocławskiej od wielu
              lat. Wielu nazwywa nas Politechnicznym
              <br /> Softwarehousem, no bo w sumie nim jesteśmy. W Solvro
              działamy na wielu frontach, eksplorując dzikie zakamarki
              <br /> kodu i tworząc innowacyjne projekty. Funkcjonujemy jak
              dynamiczny software house, ale bez sztywnych <br /> garniturów i
              bez korpo logiki - u nas liczy się pasja do kodowania i
              kreatywność!{" "}
            </p>
            <Button
              variant="secondary"
              className="rounded-md px-8 py-8 text-lg font-bold"
            >
              Poznaj nas
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
