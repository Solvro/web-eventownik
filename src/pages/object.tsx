import * as React from "react";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Event() {
  const [selectedObject, setselectedObject] = useState<number | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCard = (cardId: number) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const goBackToObjects = () => {
    setselectedObject(null);
    setExpandedCard(null);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="px-4 pb-3 pt-4 text-center text-lg font-bold">
        Rajd wiosenny W4
      </h1>
      {selectedObject === null ? (
        <>
          <div className="flex w-11/12 items-center justify-center rounded bg-solvroblue p-3 text-center text-xs font-bold">
            <div className="text-center">Wysiwyg</div>
          </div>

          <div className="grid grid-cols-2 gap-4 px-4 pb-6 pt-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((building) => (
              <div
                key={building}
                onClick={() => {
                  setselectedObject(building);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setselectedObject(building);
                  }
                }}
                role="button"
                tabIndex={0}
                className="cursor-pointer"
              >
                <Card className="flex aspect-square flex-shrink-0 flex-col items-center justify-center rounded-lg border-black">
                  <CardHeader className="text-center">
                    <CardTitle className="text-base">
                      Budynek {building}
                    </CardTitle>
                    <CardDescription className="text-xxs">
                      Kliknij w sekcję, aby wyświetlić szczegóły
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex w-11/12 items-center justify-center rounded bg-solvroblue p-3 text-center text-xs font-bold">
            <div className="flex-shrink-0 pl-2">
              <div
                onClick={() => {
                  goBackToObjects();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    goBackToObjects();
                  }
                }}
                role="button"
                tabIndex={0}
                className="cursor-pointer"
              >
                <FaArrowLeft size={16} />
              </div>
            </div>
            <div className="flex-grow text-center">
              Budynek nr {selectedObject}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((room) => (
              <div
                key={room}
                onClick={() => {
                  toggleCard(room);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    toggleCard(room);
                  }
                }}
                tabIndex={0}
                className="relative flex aspect-square flex-col overflow-hidden rounded-lg border border-black"
                role="button"
              >
                <div className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-4 p-4 text-center">
                  <h2 className="text-base font-semibold">Pokój nr {room}</h2>
                  <p className="text-sm">Miejsca: 4/{room > 4 ? room : 5}</p>
                  <p className="text-xxs">
                    Kliknij tutaj, aby zobaczyć szczegóły
                  </p>
                </div>

                <div
                  className={`duration-2000 absolute inset-0 flex flex-col items-center justify-center bg-white p-4 transition-all ${
                    expandedCard === room
                      ? "translate-y-0 opacity-100"
                      : "translate-y-full opacity-0"
                  }`}
                >
                  <div className="cursor-pointer text-center">
                    <p className="mb-2 text-lg">Pokój nr {room} (4/5)</p>
                    <ul className="mb-2 max-h-24 list-inside list-decimal overflow-y-auto text-xs">
                      <li>Imie Nazwisko 1</li>
                      <li>Imie Nazwisko 2</li>
                      <li>Imie Nazwisko 3</li>
                      <li>Imie Nazwisko 4</li>
                      <li>Imie Nazwisko 5</li>
                      <li>Imie Nazwisko 6</li>
                      <li>Imie Nazwisko 7</li>
                      <li>Imie Nazwisko 8</li>
                    </ul>
                    <p className="text-xs">Odklinij, aby zobaczyć mniej</p>
                  </div>
                  <button
                    className="absolute bottom-0 left-0 h-10 w-full rounded-t-none bg-solvroblue text-black"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Zapisz się
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
