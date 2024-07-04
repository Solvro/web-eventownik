import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

import cube from "@/assets/cube.png";
import sphere from "@/assets/sphere.png";
import { Button } from "@/components/ui/button";
import { useCreateEvent } from "@/lib/useCreateEvent";

import { MacbookScroll } from "../ui/macbook-scroll";
import visionImage from "@/assets/landing_vision.png";

export const Hero = () => {
  const event = useCreateEvent();
  const router = useRouter();

  return (
    <section>
      <div className="mt-8  flex flex-col p-12 pb-20 xl:mt-24 xl:flex-row xl:items-center xl:justify-between xl:pb-40 ">
        <div className="mb-12 xl:mb-0">
          <h1 className="text order-2 mb-8 h-3/4 text-3xl text-primary-foreground md:text-5xl xl:order-1 2xl:text-7xl ">
            Eventownik - zróbmy razem
            <br />
            wydarzenie!
          </h1>
          <Button
            onClick={() => {
              void event.mutateAsync().then((data) => {
                void router.push({
                  pathname: "/event/[slug]/settings",
                  query: { slug: data.ownersSlug },
                });
              });
            }}
            variant="secondary"
            disabled={event.isPending || event.isSuccess}
            className="rounded-md bg-secondary px-8 py-8 text-lg font-bold"
          >
            {event.isPending || event.isSuccess ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Utwórz wydarzenie
          </Button>
        </div>
        <div className="h-100 relative order-1 mr-24 flex w-full items-center justify-center xl:order-2 xl:h-auto xl:w-auto xl:flex-none 2xl:mr-56">
          <Image alt="Laptop" src={macbook_mockup} className="block" />
          <div className="bottom-0 left-0 right-0 top-0 flex items-center justify-center xl:absolute">
            <div className="-left-48 top-0 xl:absolute">
              <Image alt="Sphere" src={sphere} className="hidden 2xl:block" />
            </div>
            <div className="-right-48 bottom-0 xl:absolute">
              <Image alt="Cube" src={cube} className="hidden 2xl:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
