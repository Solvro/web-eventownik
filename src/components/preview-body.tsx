import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import type { ReactNode } from "react";

import { BlockCard } from "@/components/Block";
import { ReservationsTable } from "@/components/ContactTable";
import { BlockDialog } from "@/components/ui/block-dialog";
import type { Block } from "@/types/Block";

interface PreviewBodyProps {
  eventId: string;
  currentBlock: Block | undefined;
  blockId: string | null;
  setBlockId: (blockId: string | null) => Promise<URLSearchParams>;
  currentBlocks: Block[] | undefined;
  refetchAllBlocks: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<Block[] | null>>;
}

export function PreviewBody({
  eventId,
  currentBlock,
  blockId,
  setBlockId,
  currentBlocks,
  refetchAllBlocks,
}: PreviewBodyProps): ReactNode {
  return (
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
  );
}
