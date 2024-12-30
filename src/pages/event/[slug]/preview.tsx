import { useQuery } from "@tanstack/react-query";
import type { InferGetServerSidePropsType } from "next";
import type { GetServerSidePropsContext } from "nextjs-routes";
import { parseAsString, useQueryState } from "nuqs";
import { z } from "zod";

import { Layout } from "@/components/Layout";
import { PreviewBody } from "@/components/preview-body";
import { PreviewTopBar } from "@/components/preview-top-bar";
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
      <PreviewBody
        eventId={eventId}
        currentBlock={currentBlock}
        blockId={blockId}
        setBlockId={setBlockId}
        currentBlocks={currentBlocks}
        refetchAllBlocks={refetchAllBlocks}
      />
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
