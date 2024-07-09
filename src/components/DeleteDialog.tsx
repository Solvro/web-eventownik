import { useMutation, useQueryClient } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";
import type { Tables } from "@/lib/types";

export const deleteReservationAtom = atom<Tables<"reservations"> | null>(null);

export function DeleteReservation() {
  const [reservation, setReservation] = useAtom(deleteReservationAtom);
  const queryClient = useQueryClient();
  const deleteReservation = useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["reservations"],
      });
    },
    mutationFn: async ({ id }: { id: string }) => {
      return supabase.from("reservations").delete().eq("reservationId", id);
    },
  });

  return (
    <Dialog
      open={reservation !== null}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setReservation(null);
        }
      }}
    >
      {reservation === null ? null : (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Usuń uczestnika</DialogTitle>
          </DialogHeader>
          <div>
            <p>
              Czy na pewno chcesz usunąć {reservation.firstName}{" "}
              {reservation.lastName}?
            </p>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              loading={deleteReservation.isPending}
              onClick={() => {
                void deleteReservation
                  .mutateAsync({ id: reservation.reservationId })
                  .then(() => {
                    setReservation(null);
                  })
                  .catch(() => {
                    toast("Nie udało się usunąć uczestnika");
                  });
              }}
            >
              Tak
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setReservation(null);
              }}
            >
              Nie
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
