import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Kiedy Eventownik będzie dostępny?",
    answer:
      "MVP (Minimum Viable Product) Eventownika planowane jest na wrzesień 2024 roku, aby mogło zostać wykorzystane na obozie letnim.",
    value: "item-1",
  },
  {
    question: "Kto może korzystać z Eventownika?",
    answer:
      "Eventownik jest przeznaczony dla organizatorów wydarzeń, takich jak Wydziałowe Rady Samorządu Studenckiego, Samorząd Główny oraz wszyscy organizatorzy wydarzeń na Politechnice Wrocławskiej. Użytkownikami końcowymi będą uczestnicy tych wydarzeń.",
    value: "item-2",
  },
  {
    question: "Co to jest Eventownik?",
    answer:
      "Eventownik to nowoczesna aplikacja, która ułatwia organizację zapisów na wydarzenia. Skierowana jest głównie do organizatorów wydarzeń, którzy chcą zautomatyzować proces rejestracji uczestników na różne aktywności, takie jak pokoje, autobusy, stoliki czy gry zespołowe.",
    value: "item-3",
  },
  {
    question: "Jakie są wymagania techniczne do korzystania z Eventownika?",
    answer:
      "Aby korzystać z Eventownika, potrzebny jest dostęp do internetu oraz urządzenie z przeglądarką internetową. Dodatkowo, organizatorzy wydarzeń muszą mieć dostęp do serwera, na którym będzie hostowana aplikacja.",
    value: "item-4",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Często zadawane{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Pytania
        </span>
      </h2>

      <Accordion type="single" collapsible className="w-full AccordionRoot">
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Nadal masz pytania?{" "}
        <a
          rel="noreferrer noopener"
          href="https://solvro.pwr.edu.pl/contact"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Skontaktuj się
        </a>
      </h3>
    </section>
  );
};
