import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import type { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import type { GetServerSidePropsContext } from "nextjs-routes";
import { parseAsString, useQueryState } from "nuqs";
import * as React from "react";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { z } from "zod";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { createSSRClient } from "@/lib/supabaseSSR";
import { useUserEvent } from "@/lib/useUserEvent";
import type { Block } from "@/types/Block";

function buildBreadcrumbs(blocks: Block[], currentBlockId: string) {
  const blockMap: { [key: string]: Block } = {};
  blocks.forEach((block) => {
    blockMap[block.blockId] = block;
  });

  const breadcrumbs: Block[] = [];
  let currentBlock: Block | undefined = blockMap[currentBlockId];

  while (currentBlock) {
    breadcrumbs.unshift(currentBlock);
    if (currentBlock.parentBlockId !== null) {
      currentBlock = blockMap[currentBlock.parentBlockId];
    } else {
      currentBlock = undefined;
    }
  }

  return breadcrumbs;
}

export default function Building({
  participantsSlug,
  ...rest
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const event = useUserEvent(participantsSlug);

  const eventId = event.data?.eventId ?? rest.eventId;

  const [queryBlockId, setBlockId] = useQueryState(
    "blockId",
    parseAsString.withOptions({ history: "push" }),
  );

  const blockId =
    queryBlockId === "" || queryBlockId === null ? null : queryBlockId;

  const allBlocksQuery = useQuery({
    queryKey: ["blocks", eventId],
    queryFn: async () => {
      const blocks = await supabase
        .from("blocks")
        .select("*, reservations (*)")
        .eq("eventId", eventId);

      return blocks.data;
    },
  });

  const currentBlocks = allBlocksQuery.data
    ?.filter((block) => block.parentBlockId === blockId)
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  const breadcrumbs =
    typeof blockId === "string"
      ? buildBreadcrumbs(allBlocksQuery.data ?? [], blockId)
      : null;

  const currentBlock = allBlocksQuery.data?.find(
    (block) => block.blockId === blockId,
  );

  const parentId = breadcrumbs?.[breadcrumbs.length - 2]?.blockId;
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="w-full bg-blue-100 pb-4 pt-8 text-center text-xl font-medium">
        {event.data?.name}
      </div>
      <div className="w-full max-w-screen-sm">
        <div className="mx-4 mt-4 flex h-10 items-center rounded bg-blue-200">
          <div className=" flex-shrink-0 pl-2">
            {typeof currentBlock !== "undefined" ? (
              <button
                onClick={() => {
                  void setBlockId(parentId ?? null);
                }}
              >
                <FaArrowLeft size={16} />
              </button>
            ) : (
              <div className="w-4" />
            )}
          </div>
          <div className="flex-grow text-center">{currentBlock?.name}</div>
        </div>

        <motion.div
          layout={true}
          key={blockId}
          className="flex flex-wrap justify-evenly gap-4 px-4 pb-6 pt-3 sm:px-6"
        >
          {currentBlocks?.map((block) =>
            typeof block.capacity === "number" ? (
              <Card
                onClick={() => {
                  toggleCard(block.blockId);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    toggleCard(block.blockId);
                  }
                }}
                tabIndex={0}
                key={block.blockId}
                className="flex aspect-square flex-shrink-0 cursor-pointer flex-col items-center justify-center rounded-lg border-black transition-all duration-300 ease-in-out hover:shadow-md"
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-base">{block.name}</CardTitle>
                  <p className="text-sm">
                    {" "}
                    {typeof block.capacity === "number" ? (
                      <p className="text-sm text-gray-500">
                        Miejsca: {block.reservations.length}/{block.capacity}
                      </p>
                    ) : null}
                  </p>
                  <CardDescription className="text-center text-xxs">
                    <span>
                      {" "}
                      {expandedCard !== block.blockId
                        ? "Kliknij w sekcję, aby wyświetlić szczegóły"
                        : "Odklinij, aby wyświetlić mniej szczegółów"}{" "}
                    </span>

                    <div
                      className={` absolute inset-0 flex flex-col items-center justify-center bg-white ${
                        expandedCard === block.blockId
                          ? "translate-y-0 opacity-100"
                          : "translate-y-full opacity-0"
                      }
                        ${
                          expandedCard === block.blockId
                            ? "relative"
                            : "absolute"
                        }`}
                    >
                      <div className="cursor-pointer text-center">
                        <ul className="mb-2 max-h-20 list-inside list-decimal overflow-y-auto p-2 text-xs">
                          {block.reservations.map((reservation) => (
                            <li key={reservation.reservationId}>
                              {reservation.firstName} {reservation.lastName}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {block.reservations.length < block.capacity ? (
                        <Link
                          href={{
                            pathname:
                              "/rejestracja/[participationSlug]/[blockId]/formularz",
                            query: {
                              participationSlug: participantsSlug,
                              blockId: block.blockId,
                            },
                          }}
                          className={buttonVariants({
                            className:
                              "mt-auto w-full self-end justify-self-end",
                          })}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          Zapisz się
                        </Link>
                      ) : (
                        <p className="text-center">Brak miejsc</p>
                      )}
                    </div>
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <Card
                onClick={() => {
                  void setBlockId(block.blockId);
                }}
                key={block.blockId}
                className="flex aspect-square flex-shrink-0 cursor-pointer flex-col items-center justify-center rounded-lg border-black transition-all duration-300 ease-in-out hover:shadow-md"
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-base">{block.name}</CardTitle>
                  <CardDescription className="text-xxs">
                    Kliknij w sekcję, aby wyświetlić szczegóły
                  </CardDescription>
                </CardHeader>
              </Card>
            ),
          )}
        </motion.div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext<"/rejestracja/[participationSlug]">,
) => {
  const slug = z.string().parse(ctx.params.participationSlug);

  const event = await createSSRClient(ctx)
    .from("events")
    .select("*")
    .eq("participantsSlug", slug)
    .single();

  if (!event.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      participantsSlug: slug,
      eventId: event.data.eventId,
    } satisfies Partial<(typeof event)["data"]>,
  };
};
