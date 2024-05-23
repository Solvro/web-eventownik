import type { StaticImageData } from "next/image";
import Image from "next/image";

import image from "@/assets/growth.png";
import image4 from "@/assets/looking-ahead.png";
import image3 from "@/assets/reflecting.png";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FeatureProps {
  title: string;
  description: string;
  image: StaticImageData;
}

const features: FeatureProps[] = [
  {
    title: "Tworzenie Wydarzeń ➕",
    description:
      "Organizatorzy mogą dostosować wydarzenie do swoich potrzeb, tworząc customowe układy sal, które odpowiadają specyfice danego eventu.",
    image: image4,
  },
  {
    title: "Generowanie Linków 🔗",
    description:
      "Uczestnicy mogą łatwo i szybko zapisać się na wybrane miejsca w wydarzeniu, co znacznie upraszcza proces rejestracji i redukuje czas potrzebny na organizację zapisów.",
    image: image3,
  },
  {
    title: "Eksport Danych z Zapisami 📖",
    description:
      "Można łatwo zarządzać danymi uczestników, przeprowadzać analizy oraz przygotowywać niezbędne raporty, co usprawnia zarządzanie wydarzeniem i komunikację z uczestnikami.",
    image: image,
  },
];

const featureList: string[] = [
  "Tworzenie zaproszeń",
  "Dodawanie uczestników",
  "Eksport do CSV",
  "Dynamiczne formularze",
  "Panel administracyjny",
];

export const Features = () => {
  return (
    <section id="features" className="container py-24 sm:py-32 space-y-8">
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Wszystko{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          w jednym miejscu
        </span>
      </h2>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge variant="secondary" className="text-sm">
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <Image
                src={image}
                alt="About feature"
                className="w-[200px] lg:w-[300px] mx-auto"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
