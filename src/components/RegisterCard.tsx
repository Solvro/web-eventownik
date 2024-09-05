import { useAtom } from "jotai";
import { atomWithReset } from "jotai/utils";
import React from "react";

import type { Block } from "@/types/Block";

const expandedCardAtom = atomWithReset<string | null>(null);

export const RegisterCard = ({
  blockId,
  name,
  currentReservations,
  capacity,
}: Block & { currentReservations: string[] }) => {
  const [expandedCard, setExpandedCard] = useAtom(expandedCardAtom);

  const isExpanded = expandedCard === blockId;

  const toggleCard = () => {
    setExpandedCard((prev) => (prev === blockId ? null : blockId));
  };

  return (
    <div
      onClick={() => {
        toggleCard();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          toggleCard();
        }
      }}
      tabIndex={0}
      className="relative flex flex-col overflow-hidden rounded-lg border border-black"
      role="button"
    >
      <div className="flex h-[200px] cursor-pointer flex-col items-center justify-center gap-4 p-4 text-center">
        <h2 className="text-base font-semibold">{name}</h2>
        <p className="text-sm">
          Miejsca: {currentReservations.length}/{capacity}
        </p>
        <p className="text-xxs">Kliknij tutaj, aby zobaczyć szczegóły</p>
      </div>

      <div
        className={`duration-2000 absolute inset-0 flex flex-col items-center justify-center bg-white p-4 transition-all ${
          isExpanded
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0"
        }`}
      >
        <div className="cursor-pointer text-center">
          <p className="mb-2 text-xs">Rezerwacje</p>
          <ul className="mb-2 list-inside list-disc text-xs">
            {currentReservations.map((reservation) => (
              <li key={reservation}>{reservation}</li>
            ))}
          </ul>
          <p className="text-xs">Odklinij, aby zobaczyć mniej</p>
        </div>
      </div>

      <button
        className="absolute bottom-0 left-0 h-10 w-full rounded-t-none border-t border-black bg-solvroblue text-black"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        Zapisz się do pokoju
      </button>
    </div>
  );
};
