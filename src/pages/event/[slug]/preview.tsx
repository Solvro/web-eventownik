import { useQuery } from "@tanstack/react-query";
import type { InferGetServerSidePropsType } from "next";
import type { GetServerSidePropsContext } from "nextjs-routes";
import { parseAsString, useQueryState } from "nuqs";
import { z } from "zod";

import { BlockCard } from "@/components/Block";
import { ReservationsTable } from "@/components/ContactTable";
import { Layout } from "@/components/Layout";
import { PreviewTopBar } from "@/components/preview-top-bar";
import { BlockDialog } from "@/components/ui/block-dialog";
import { supabase } from "@/lib/supabase";
import { createSSRClient } from "@/lib/supabaseSSR";
import { useEvent } from "@/lib/useEvent";

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

  const { data: allBlocks, refetch: refetchAllBlocks } = useQuery({
    queryKey: ["blocks", eventId],
    queryFn: async () => {
      const blocks = await supabase
        .from("blocks")
        .select("*, reservations (*)")
        .eq("eventId", eventId);

      return blocks.data;
    },
  });

  const currentBlocks = allBlocks
    ?.filter((block) => block.parentBlockId === blockId)
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  const currentBlock = allBlocks?.find((block) => block.blockId === blockId);

  return (
    <Layout ownersSlug={ownersSlug}>
      <PreviewTopBar
        eventId={eventId}
        blockId={blockId}
        setBlockId={setBlockId}
        allBlocks={allBlocks}
        currentBlock={currentBlock}
        refetchAllBlocks={refetchAllBlocks}
      />
      <div className="flex w-full flex-wrap items-start gap-4">
        {typeof currentBlock?.capacity !== "number" ||
        typeof blockId !== "string" ? (
          <BlockDialog
            eventId={eventId}
            parentBlockId={blockId ?? undefined}
            onSubmit={async () => {
              await refetchAllBlocks();
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
