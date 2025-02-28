import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { useAtom, useSetAtom } from "jotai";
import type { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import type { GetServerSidePropsContext, Route } from "nextjs-routes";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { toast } from "sonner";
import { z } from "zod";

import { userRegistrationsAtom } from "@/atoms/userRegistrations";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { createSSRClient } from "@/lib/supabaseSSR";
import { useZodForm } from "@/lib/useZodForm";

const DeleteDialog = ({
  reservationId,
  name,
  blockName,
}: {
  reservationId: string;
  name: string;
  blockName: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const setUserRegistrations = useSetAtom(userRegistrationsAtom);
  const router = useRouter();
  const removeReservation = useMutation({
    mutationFn: async () => {
      await supabase
        .from("reservations")
        .delete()
        .eq("reservationId", reservationId)
        .throwOnError();
    },
    onSuccess: async () => {
      await router.replace(router.asPath as unknown as Route);
      setUserRegistrations((prev) => prev.filter((id) => id !== reservationId));
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild={true}>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Wypisz
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Usuń uczestnika</DialogTitle>
        </DialogHeader>
        <div>
          <p>
            Czy na pewno chcesz usunąć {name} z {blockName}?
          </p>
        </div>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Nie
          </Button>
          <Button
            type="submit"
            loading={removeReservation.isPending}
            onClick={() => {
              void removeReservation.mutateAsync().then(() => {
                setIsOpen(false);
              });
            }}
          >
            Tak
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Submit = ({
  event,
  blockId,
  block,
  participationSlug,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const form = useZodForm({
    schema: z.object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
    }),
  });

  const [userRegistrations, setUserRegistrations] = useAtom(
    userRegistrationsAtom,
  );

  const addReservation = useMutation({
    mutationFn: async (data: { firstName: string; lastName: string }) => {
      const result = await supabase
        .from("reservations")
        .insert({
          blockId,
          firstName: data.firstName,
          lastName: data.lastName,
          order: 0,
        })
        .select("*")
        .single()
        .throwOnError();

      if (!result.data) {
        throw new Error("Błąd serwera");
      }

      return result.data;
    },
    onSuccess: async (data) => {
      await router.push({
        pathname: "/rejestracja/[participationSlug]/[blockId]/[reservationId]",
        query: {
          blockId,
          participationSlug,
          reservationId: data.reservationId,
        },
      });

      setUserRegistrations((prev) => [...prev, data.reservationId]);
    },
  });

  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col items-center justify-stretch">
      <div className="w-full bg-gray-200 pb-4 pt-8 text-center text-xl font-bold">
        {event.data?.name}
      </div>
      <div className="w-full max-w-sm px-4">
        <div className="mt-4 flex h-10 items-center rounded bg-blue-200 shadow-sm">
          <div className=" flex-shrink-0 pl-2">
            <Link
              href={{
                pathname: "/rejestracja/[participationSlug]",
                query: {
                  participationSlug,
                  ...(typeof block.parentBlockId === "string"
                    ? {
                        blockId: block.parentBlockId,
                      }
                    : {}),
                },
              }}
            >
              <FaArrowLeft size={16} />
            </Link>
          </div>
          <div className="flex-grow text-center">{block.name}</div>
        </div>
        <ul>
          <li className="mt-4">
            <span className="font-semibold">Miejsca:</span>{" "}
            {block.reservations.length}/{block.capacity}
          </li>
          <li className="mt-4">
            <span className="font-semibold">Rezerwacje:</span>
            <ul className="flex flex-col gap-2 text-sm">
              {block.reservations
                .sort((a, b) => {
                  return a.createdAt.localeCompare(b.createdAt) * -1;
                })
                .map((reservation) => (
                  <li
                    key={reservation.reservationId}
                    className="flex items-center justify-between"
                  >
                    <p>
                      {reservation.firstName} {reservation.lastName},{" "}
                      {formatDistanceToNow(new Date(reservation.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                    {userRegistrations.includes(reservation.reservationId) ? (
                      <DeleteDialog
                        name={`${reservation.firstName} ${reservation.lastName}`}
                        blockName={block.name}
                        reservationId={reservation.reservationId}
                      />
                    ) : null}
                  </li>
                ))}
            </ul>
          </li>
        </ul>
        <Form {...form}>
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={form.handleSubmit(async (data) => {
              await addReservation
                .mutateAsync({
                  ...data,
                })
                .catch((err) => {
                  if (err instanceof Error) {
                    toast(`Coś poszło nie tak, ${err.message}`);
                  } else {
                    toast("Coś poszło nie tak, spróbuj ponownie");
                  }
                });
            })}
          >
            <div className="mt-10 flex w-full flex-col gap-5">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <FormLabel htmlFor="firstName" className="text">
                        Imię
                      </FormLabel>
                      <FormControl>
                        <Input id="firstName" placeholder="Bartek" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <FormLabel htmlFor="lastName" className="text">
                        Nazwisko
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="lastName"
                          placeholder="Żelowski"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="ml-auto mt-8 w-full"
            >
              {form.formState.isSubmitting ? (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Zapisz się
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
export const getServerSideProps = async (
  ctx: GetServerSidePropsContext<"/rejestracja/[participationSlug]/[blockId]/formularz">,
) => {
  const blockId = z.string().uuid().parse(ctx.params.blockId);
  const participationSlug = z.string().parse(ctx.params.participationSlug);

  const event = await createSSRClient(ctx)
    .from("events")
    .select("*")
    .eq("participantsSlug", participationSlug)
    .single();

  const block = await createSSRClient(ctx)
    .from("blocks")
    .select("*, reservations(*)")
    .eq("blockId", blockId)
    .single()
    .throwOnError();

  if (!block.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event,
      blockId,
      block: block.data,
      participationSlug,
    },
  };
};

export default Submit;
