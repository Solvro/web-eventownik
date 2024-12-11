import { useMutation } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";

export const DeleteDialog = ({
  children,
  blockId,
  onDelete,
}: {
  children: ReactNode;
  onDelete?: () => Promise<void> | void;
  blockId: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const deleteBlock = useMutation({
    mutationFn: async () => {
      const block = supabase.from("blocks");

      return block.delete().eq("blockId", blockId);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild={true}>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Usuń</DialogTitle>
        </DialogHeader>
        <p>Czy na pewno chcesz usunąć sekcje?</p>
        <DialogFooter>
          <Button
            onClick={() => {
              deleteBlock
                .mutateAsync()
                .then(async () => {
                  await onDelete?.();
                  setIsOpen(false);
                  toast("Usunięto sekcję");
                })
                .catch(() => {
                  setIsOpen(false);
                  toast("Nie udało się usunąć sekcji");
                });
            }}
          >
            Usuń sekcje
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
