import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import type { Tables } from "@/lib/types";

const formSchema = z.object({
  firstName: z.string().min(1, "Imię jest wymagane"),
  lastName: z.string().min(1, "Nazwisko jest wymagane"),
});

type FormValues = z.infer<typeof formSchema>;

export const reservationDialogAtom = atom<
  | (Pick<Tables<"reservations">, "blockId"> & { type: "create" })
  | (Tables<"reservations"> & { type: "edit" })
  | null
>(null);

const defaultCreateValues = {
  firstName: "",
  lastName: "",
};

export function ReservationDialog() {
  const [reservation, setReservation] = useAtom(reservationDialogAtom);
  const queryClient = useQueryClient();
  const isEditing = reservation?.type === "edit";

  const defaultValues = isEditing ? reservation : defaultCreateValues;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const mutateReservation = useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["reservations"],
      });
    },
    mutationFn: async (values: FormValues) => {
      if (isEditing) {
        return supabase
          .from("reservations")
          .update(values)
          .eq("reservationId", reservation.reservationId);
      }
      if (reservation?.type === "create") {
        return supabase.from("reservations").insert({
          ...values,
          blockId: reservation.blockId,
          order: 0,
        });
      }

      throw new Error("Invalid reservation type");
    },
  });

  const onSubmit = (values: FormValues) => {
    mutateReservation
      .mutateAsync(values)
      .then(() => {
        setReservation(null);
        form.reset({ firstName: "", lastName: "" });
        toast(
          isEditing
            ? "Uczestnik został zaktualizowany pomyślnie"
            : "Uczestnik został dodany pomyślnie",
        );
      })
      .catch(() => {
        toast(
          isEditing
            ? "Nie udało się zaktualizować uczestnika"
            : "Nie udało się dodać uczestnika",
        );
      });
  };

  return (
    <Dialog
      open={reservation !== null}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setReservation(null);
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edytuj uczestnika" : "Dodaj uczestnika"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imię</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwisko</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" loading={mutateReservation.isPending}>
                {isEditing ? "Zapisz" : "Dodaj"}
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  setReservation(null);
                  form.reset();
                }}
              >
                Anuluj
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
