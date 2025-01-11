import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import { type ReactNode } from "react";

import { BlockDialog } from "@/components/ui/block-dialog";
import { Button } from "@/components/ui/button";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { buildBreadcrumbs, cn } from "@/lib/utils";
import type { Block } from "@/types/Block";
import type { BlockWithReservations } from "@/types/block-with-reservations";

interface PreviewTopBarProps {
  eventId: string;
  eventName: string;
  blockId: string | null;
  setBlockId: (blockId: string | null) => Promise<URLSearchParams>;
  allBlocks: BlockWithReservations[] | null | undefined;
  currentBlock: BlockWithReservations | undefined;
  currentBlocks: BlockWithReservations[] | undefined;
  refetchAllBlocks: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<Block[] | null>>;
}

export function PreviewTopBar({
  eventId,
  eventName,
  blockId,
  setBlockId,
  allBlocks,
  currentBlock,
  currentBlocks,
  refetchAllBlocks,
}: PreviewTopBarProps): ReactNode {
  const breadcrumbs =
    typeof blockId === "string"
      ? buildBreadcrumbs(allBlocks ?? [], blockId)
      : null;

  const parentId = breadcrumbs?.[breadcrumbs.length - 2]?.blockId;

  const { totalCapacity, reservedSpotsCount } =
    (typeof currentBlock?.capacity !== "number"
      ? (blockId === null ? allBlocks : currentBlocks)?.reduce(
          (totals, block) => {
            totals.totalCapacity += block.capacity ?? 0;
            totals.reservedSpotsCount += block.reservations.length;
            return totals;
          },
          { totalCapacity: 0, reservedSpotsCount: 0 },
        )
      : {
          totalCapacity: currentBlock.capacity,
          reservedSpotsCount: currentBlock.reservations.length,
        }) ?? { totalCapacity: 0, reservedSpotsCount: 0 };

  return (
    <div className="flex h-14 items-center gap-4 rounded-sm border p-4 py-8">
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

          <div className="ml-auto flex items-center gap-4">
            <span>
              Ilość wolnych miejsc: {reservedSpotsCount}/{totalCapacity}
            </span>

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
                await refetchAllBlocks();
              }}
            >
              <Button variant="ghost">Edytuj</Button>
            </BlockDialog>

            <DeleteDialog
              blockId={blockId}
              onDelete={async () => {
                await refetchAllBlocks(); //na odwrót setBlockId i refetch, aby uniknąć mignięcia usuwanego blocku
                await setBlockId(parentId ?? null);
              }}
            >
              <Button variant="ghost">Usuń</Button>
            </DeleteDialog>
          </div>
        </>
      ) : (
        <>
          <span className="font-bold">{eventName}</span>
          <div className="ml-auto flex items-center gap-4">
            <span>
              Ilość wolnych miejsc: {reservedSpotsCount}/{totalCapacity}
            </span>

            <Button
              variant="ghost"
              onClick={() =>
                window.open(
                  `https://kmiyeqcynkremenbffvl.supabase.co/functions/v1/generate_event_excel?eventId=${eventId}`,
                )
              }
            >
              Export
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
