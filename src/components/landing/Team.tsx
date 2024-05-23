import { Facebook, Instagram, Linkedin } from "lucide-react";
import type { StaticImageData } from "next/image";
import Image from "next/image";

import Dawid from "@/assets/dawid.jpg";
import Marcin from "@/assets/marcin.jpg";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TeamProps {
  imageUrl: string | StaticImageData;
  name: string;
  position: string;
  socialNetworks: SociaNetworkslProps[];
}

interface SociaNetworkslProps {
  name: string;
  url: string;
}

const teamList: TeamProps[] = [
  {
    imageUrl:
      "https://cms.solvro.pl/assets/77255d90-0ec0-4219-9c81-707cc50babc4?key=member",
    name: "Dawid Linek",
    position: "Product Manager",
    socialNetworks: [
      { name: "Linkedin", url: "http://linkedin.com" },
      {
        name: "Facebook",
        url: "https://www.facebook.com/",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/",
      },
    ],
  },
  {
    imageUrl:
      "https://cms.solvro.pl/assets/a172cf47-33cb-481a-ad3f-118363286b5c?key=member",
    name: "Szymon Szymczewski",
    position: "Devops Engineer",
    socialNetworks: [
      { name: "Linkedin", url: "http://linkedin.com" },
      {
        name: "Facebook",
        url: "https://www.facebook.com/",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/",
      },
    ],
  },
  {
    imageUrl:
      "https://cms.solvro.pl/assets/9d659db2-a12d-400e-9b45-87a89065a415?key=member",
    name: "Bartosz Gotowski",
    position: "Frontend Developer",
    socialNetworks: [
      { name: "Linkedin", url: "http://linkedin.com" },

      {
        name: "Instagram",
        url: "https://www.instagram.com/",
      },
    ],
  },
  {
    imageUrl:
      "https://cms.solvro.pl/assets/52c20245-1811-4dd3-b389-f9be5948e642?key=member",
    name: "Jakub Karbowski",
    position: "Frontend Developer",
    socialNetworks: [
      { name: "Linkedin", url: "http://linkedin.com" },
      {
        name: "Facebook",
        url: "https://www.facebook.com/",
      },
    ],
  },
  {
    imageUrl: Dawid,
    name: "Dawid Błaszczyk",
    position: "Backend Developer",
    socialNetworks: [
      { name: "Linkedin", url: "http://linkedin.com" },
      {
        name: "Facebook",
        url: "https://www.facebook.com/",
      },
    ],
  },
  {
    imageUrl: Marcin,
    name: "Marcin Blicharski",
    position: "UI/UX designer",
    socialNetworks: [
      { name: "Linkedin", url: "http://linkedin.com" },
      {
        name: "Facebook",
        url: "https://www.facebook.com/",
      },
    ],
  },
];

export const Team = () => {
  const socialIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return <Linkedin size="20" />;

      case "Facebook":
        return <Facebook size="20" />;

      case "Instagram":
        return <Instagram size="20" />;
    }
  };

  return (
    <section id="team" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold">
        Nasz{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Zespół
        </span>
      </h2>

      <p className="mt-4 mb-10 text-xl text-muted-foreground">
        Nad Eventownikiem pracuje zgrany zespół pasjonatów, którzy kochają to co
        robią.
      </p>

      <div className="flex flex-wrap gap-8 gap-y-16">
        {teamList.map(
          ({ imageUrl, name, position, socialNetworks }: TeamProps) => (
            <Card
              key={name}
              className="bg-muted/50 flex-1 relative mt-8 flex flex-col justify-center items-center"
            >
              <CardHeader className="mt-8 flex justify-center items-center pb-2">
                <Image
                  src={imageUrl}
                  alt={`${name} ${position}`}
                  height={200}
                  width={200}
                  className="absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover"
                />
                <CardTitle className="text-center">{name}</CardTitle>
                <CardDescription className="text-primary">
                  {position}
                </CardDescription>
              </CardHeader>

              <CardFooter>
                {socialNetworks.map(({ name, url }: SociaNetworkslProps) => (
                  <div key={name}>
                    <a
                      rel="noreferrer noopener"
                      href={url}
                      target="_blank"
                      className={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                      })}
                    >
                      <span className="sr-only">{name} icon</span>
                      {socialIcon(name)}
                    </a>
                  </div>
                ))}
              </CardFooter>
            </Card>
          ),
        )}
      </div>
    </section>
  );
};
