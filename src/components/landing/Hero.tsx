import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

import { Button } from "@/components/ui/button";
import { useCreateEvent } from "@/lib/useCreateEvent";

import cube from "../../assets/cube.png";
import macbook_mockup from "../../assets/macbook_mockup.png";
import sphere from "../../assets/sphere.png";

const Hero = () => {
  const event = useCreateEvent();
  const router = useRouter();

  return (
    <section>
      <div className="p-12  pb-20 xl:pb-40 flex flex-col xl:flex-row xl:justify-between xl:items-center mt-8 xl:mt-24 ">
        <div className="mb-12 xl:mb-0">
          <h1 className="text-3xl md:text-5xl 2xl:text-7xl text-primary-foreground mb-8 h-3/4 text order-2 xl:order-1 ">
            Eventownik - zróbmy razem
            <br />
            wydarzenie!
          </h1>
          <Button
            onClick={() => {
              event.mutateAsync().then((event) => {
                router.push({
                  pathname: "/event/[slug]/settings",
                  query: { slug: event.ownersSlug },
                });
              });
            }}
            variant="secondary"
            disabled={event.isPending || event.isSuccess}
            className={"bg-secondary py-8 px-8 rounded-md font-bold text-lg"}
          >
            {event.isPending || event.isSuccess ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Utwórz wydarzenie
          </Button>
        </div>
        <div className="w-full xl:w-auto h-100 xl:h-auto mr-24 2xl:mr-56 order-1 xl:order-2 flex xl:flex-none items-center justify-center relative">
          <Image alt="Laptop" src={macbook_mockup} className="block" />
          <div className="xl:absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="xl:absolute top-0 -left-48">
              <Image alt="Sphere" src={sphere} className="hidden 2xl:block" />
            </div>
            <div className="xl:absolute bottom-0 -right-48">
              <Image alt="Cube" src={cube} className="hidden 2xl:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
