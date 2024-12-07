import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { InferGetServerSidePropsType } from "next";
import type { GetServerSidePropsContext } from "nextjs-routes";
import { parseAsString, useQueryState } from "nuqs";
import React, { type ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { BlockCard } from "@/components/Block";
import { ReservationsTable } from "@/components/ContactTable";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { createSSRClient } from "@/lib/supabaseSSR";
import type { Tables, TablesInsert } from "@/lib/types";
import { useEvent } from "@/lib/useEvent";
import { useZodForm } from "@/lib/useZodForm";
import { cn } from "@/lib/utils";

const BlockDialog = ({
  children,
  eventId,
  blockId,
  parentBlockId,
  onSubmit,
  defaultValues,
}: {
  children: ReactNode;
  eventId: string;
  blockId?: string;
  parentBlockId?: string;
  onSubmit?: () => Promise<void> | void;
  defaultValues?: { name?: string; capacity?: number };
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useZodForm({
    schema: z.object({
      name: z.string().min(1).max(255).trim(),
      capacity: z.coerce.number().int().nonnegative().max(10000).optional(),
    }),
    reValidateMode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form, isOpen]);

  const isEdit = typeof blockId === "string";

  const createBlock = useMutation({
    mutationFn: async (data: TablesInsert<"blocks">) => {
      const block = supabase.from("blocks");

      return isEdit
        ? block.update(data).eq("blockId", blockId)
        : block.insert(data);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild={true}>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={form.handleSubmit(async (data) => {
              await createBlock
                .mutateAsync({
                  eventId,
                  parentBlockId,
                  name: data.name,
                  capacity: data.capacity,
                })
                .then(async () => {
                  await onSubmit?.();
                  setIsOpen(false);
                  toast(isEdit ? "Zaktualizowano sekcję" : "Dodano sekcję");
                })
                .catch(() => {
                  toast(
                    isEdit
                      ? "Nie udało się zaktualizować sekcji"
                      : "Nie udało się dodać sekcji",
                  );
                })
                .finally(() => {
                  form.reset();
                });
            })}
          >
            <DialogHeader>
              <DialogTitle>
                {isEdit ? "Edycja" : "Dodaj nową sekcję"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nazwa</FormLabel>
                      <FormControl>
                        <Input
                          required={true}
                          placeholder="Pokój nr 1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Liczba miejsc (opcjonalne)</FormLabel>
                      <FormControl>
                        <Input
                          id="number"
                          type="number"
                          placeholder="5"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Osoby będą mogły się do niej zapisać
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button disabled={form.formState.isSubmitting} type="submit">
                {form.formState.isSubmitting ? (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {isEdit ? "Zapisz" : "Dodaj"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const DeleteDialog = ({
  children,
  blockId,
  onDelete
}: {
  children: ReactNode;
  onDelete?: () => Promise<void> | void;
  blockId: string;
}) => {
	const [isOpen, setIsOpen] = useState(false);

  const deleteBlock = useMutation({
    mutationFn: async () => {
      const block = supabase.from("blocks");

      return block.delete().eq("blockId", blockId)
    },
  });

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild={true}>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Usuń
          </DialogTitle>
        </DialogHeader>
        <p>Czy na pewno chcesz usunąć sekcje?</p>
        <DialogFooter>
          <Button onClick=
            {async () => 
              await deleteBlock
                .mutateAsync()
                .then(() => {
                  onDelete?.()
                  setIsOpen(false);
                  toast("Usunięto sekcję");
                }).catch(() => {
                  setIsOpen(false);
                  toast("Nie udało się usunąć sekcji");
                })
            }
          >
            Usuń sekcje
          </Button>
        </DialogFooter>
      </DialogContent>
		</Dialog>
	)
};

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
                  setBlockId(parentId ? parentId : null)
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
