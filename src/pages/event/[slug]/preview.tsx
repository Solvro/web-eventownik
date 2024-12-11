import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import type { InferGetServerSidePropsType } from "next";
import type { GetServerSidePropsContext } from "nextjs-routes";
import { parseAsString, useQueryState } from "nuqs";
import { type ReactNode } from "react";
import { z } from "zod";

import { BlockCard } from "@/components/Block";
import { ReservationsTable } from "@/components/ContactTable";
import { Layout } from "@/components/Layout";
import { BlockDialog } from "@/components/ui/block-dialog";
import { Button } from "@/components/ui/button";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { supabase } from "@/lib/supabase";
import { createSSRClient } from "@/lib/supabaseSSR";
import type { Tables } from "@/lib/types";
import { useEvent } from "@/lib/useEvent";
import { cn } from "@/lib/utils";

type Block = Tables<"blocks">;

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

const Preview = ({
  ownersSlug,
  ...rest
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const event = useEvent(ownersSlug, {
    ownersSlug,
    ...rest,
  });

  const eventId = event.data?.eventId ?? rest.eventId;

  const [blockId, setBlockId] = useQueryState(
    "blockId",
    parseAsString.withOptions({ history: "push" }),
  );

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

  return (
    <Layout ownersSlug={ownersSlug}>
      <div
        className={cn(
          "flex h-14 items-center gap-4 rounded-sm border  p-4 py-8",
          blockId === null && "pointer-events-none opacity-0",
        )}
      >
        {typeof blockId === "string" ? (
          <>
            <Button
              onClick={() => {
                void setBlockId(parentId ?? null);
              }}
              variant="outline"
              size="icon"
              className="mr-4"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <ol className="flex items-center gap-2">
              {breadcrumbs
                ?.slice(-4)
                .map((breadcrumb, index) => (
                  <button
                    key={index}
                    className={cn(
                      index === breadcrumbs.length - 1
                        ? "cursor-default font-bold"
                        : "text-gray-500 hover:text-gray-900",
                    )}
                    onClick={() => {
                      void setBlockId(breadcrumb.blockId);
                    }}
                  >
                    {breadcrumb.name}
                  </button>
                ))
                .reduce<ReactNode[]>((acc, el, i) => {
                  if (i === 0) {
                    return [...acc, el];
                  }
                  return [
                    ...acc,
                    <ChevronRightIcon key={i} className="mt-1 h-4 w-4" />,
                    el,
                  ];
                }, [])}
            </ol>

            <div className="ml-auto flex gap-4">
              <Button
                variant="ghost"
                onClick={() =>
                  window.open(
                    `https://kmiyeqcynkremenbffvl.supabase.co/functions/v1/generate_excel?section_uuid=${blockId}`,
                  )
                }
              >
                Export
              </Button>
              <BlockDialog
                eventId={eventId}
                blockId={blockId}
                defaultValues={{
                  name: currentBlock?.name,
                  capacity: currentBlock?.capacity ?? undefined,
                }}
                onSubmit={async () => {
                  await allBlocksQuery.refetch();
                }}
              >
                <Button variant="ghost">Edytuj</Button>
              </BlockDialog>

              <DeleteDialog
                blockId={blockId}
                onDelete={async () => {
                  await allBlocksQuery.refetch(); //na odwrót setBlockId i refetch, aby uniknąć mignięcia usuwanego blocku
                  await setBlockId(parentId ?? null);
                }}
              >
                <Button variant="ghost">Usuń</Button>
              </DeleteDialog>
            </div>
          </>
        ) : null}
      </div>
      <div className="flex w-full flex-wrap items-start gap-4">
        {typeof currentBlock?.capacity !== "number" ||
        typeof blockId !== "string" ? (
          <BlockDialog
            eventId={eventId}
            parentBlockId={blockId ?? undefined}
            onSubmit={async () => {
              await allBlocksQuery.refetch();
            }}
          >
            <button className="flex h-72 w-72 border-spacing-1 items-center justify-center rounded-md border border-dashed border-[#71717A] transition-all hover:scale-[1.02] hover:bg-slate-50 hover:shadow-md">
              Kliknij aby dodać sekcję
            </button>
          </BlockDialog>
        ) : (
          <div className="mx-auto flex w-full justify-center">
            <ReservationsTable blockId={blockId} />
          </div>
        )}

        {currentBlocks?.map((block) => (
          <BlockCard
            className="items-center justify-center hover:scale-[1.02]"
            key={block.blockId}
            onClick={() => {
              void setBlockId(block.blockId);
            }}
          >
            <div className="text-center">
              <h2 className="text-xl font-bold">{block.name}</h2>
              {typeof block.capacity === "number" ? (
                <p className="text-sm text-gray-500">
                  Liczba miejsc: {block.capacity}
                </p>
              ) : null}
            </div>
          </BlockCard>
        ))}
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext<"/event/[slug]/settings">,
) => {
  const slug = z.string().uuid().parse(ctx.params.slug);

  const event = await createSSRClient(ctx)
    .from("events")
    .select("*")
    .eq("ownersSlug", slug)
    .single();

  if (!event.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { ...event.data },
  };
};

export default Preview;
