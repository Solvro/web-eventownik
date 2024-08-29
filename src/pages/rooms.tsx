import Link from "next/link";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";

export default function Rooms() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCard = (cardId: number) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className="flex flex-col">
      <h1 className="px-4 pb-3 pt-4 text-center text-lg font-bold">
        Rajd wiosenny W4
      </h1>
      <div className="mx-4 mt-2 flex items-center justify-between rounded bg-solvroblue p-3 text-xs font-bold">
        <div className="flex-shrink-0 pl-2">
          <Link href="/building">
            <FaArrowLeft size={16} />
          </Link>
        </div>
        <div className="flex-grow text-center">Budynek nr 1</div>
      </div>

      {/* Kontener dla kart */}
      <div className="relative grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((room) => (
          <div
            key={room}
            onClick={() => toggleCard(room)}
            className="relative flex flex-col overflow-hidden rounded-lg border border-black"
          >
            <div className="flex h-[200px] cursor-pointer flex-col items-center justify-center gap-4 p-4 text-center">
              <h2 className="text-base font-semibold">Pokój nr {room}</h2>
              <p className="text-sm">Miejsca: 4/{room > 4 ? room : 5}</p>
              <p className="text-xxs">Kliknij tutaj, aby zobaczyć szczegóły</p>
            </div>

            <div
              className={`duration-2000 absolute inset-0 flex flex-col items-center justify-center bg-white p-4 transition-all ${
                expandedCard === room
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0"
              }`}
            >
              <div className="cursor-pointer text-center">
                <p className="mb-2 text-xs">
                  Dodatkowe informacje o pokoju nr {room}.
                </p>
                <ul className="mb-2 list-inside list-disc text-xs">
                  <li>Imie Nazwisko</li>
                  <li>Imie Nazwisko</li>
                  <li>Imie Nazwisko</li>
                  <li>Imie Nazwisko</li>
                </ul>
                <p className="text-xs">Odklinij, aby zobaczyć mniej</p>
              </div>
            </div>

            <button
              className="absolute bottom-0 left-0 h-10 w-full rounded-t-none border-t border-black bg-solvroblue text-black"
              onClick={(e) => e.stopPropagation()}
            >
              Zapisz się do pokoju
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
