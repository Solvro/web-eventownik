import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { type ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

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
import type { TablesInsert } from "@/lib/types";
import { useZodForm } from "@/lib/useZodForm";

export const BlockDialog = ({
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
