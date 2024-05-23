import Image from "next/image";

import pilot from "@/assets/logo_high.png";

import { Statistics } from "./Statistics";

export const About = () => {
  return (
    <section id="about" className="container py-24 sm:py-24">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <Image
            src={pilot}
            alt=""
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Coś o{" "}
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  Solvro
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                W Solvro działamy na wielu frontach, eksplorując dzikie
                zakamarki kodu i tworząc innowacyjne projekty. Funkcjonujemy jak
                dynamiczny software house, ale bez sztywnych garniturów i bez
                korpo logiki - u nas liczy się pasja do kodowania i kreatywność!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
