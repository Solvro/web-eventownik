import { CircleCheck } from "lucide-react";
import type { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import type { GetServerSidePropsContext } from "nextjs-routes";
import React from "react";
import { z } from "zod";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createSSRClient } from "@/lib/supabaseSSR";

const Success = ({
  block,
  reservation,
  event,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-stretch">
      <div className="w-full bg-gray-200 pb-4 pt-8 text-center text-xl font-bold">
        {event.name}
      </div>
      <div className="mt-8 flex flex-col items-center gap-4">
        <CircleCheck strokeWidth={1.25} className="h-24 w-24 text-green-500" />
        <div className="flex justify-center">
          <div className="minimal-tiptap-editor">
            <div
              className="ProseMirror my-4"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: event.messageAfterRegistration ?? "",
              }}
            />
          </div>
        </div>
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Zapisano!</CardTitle>
            <CardDescription>Podgląd zapisanych informacji</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p>{block.name}</p>
            <hr />
            <p>
              {reservation.firstName} {reservation.lastName}
            </p>
          </CardContent>
        </Card>
        <Link
          className={buttonVariants({ className: "w-full" })}
          href={{
            pathname: "/rejestracja/[participationSlug]",
            query: {
              participationSlug: event.participantsSlug,
              blockId: block.parentBlockId ?? undefined,
            },
          }}
        >
          Powrót
        </Link>
      </div>
    </div>
  );
};

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext<"/rejestracja/[participationSlug]/[blockId]/[reservationId]">,
) => {
  const blockId = z.string().parse(ctx.params.blockId);
  const participationSlug = z.string().parse(ctx.params.participationSlug);
  const reservationId = z.string().parse(ctx.params.reservationId);

  const block = await createSSRClient(ctx)
    .from("blocks")
    .select("*")
    .eq("blockId", blockId)
    .single()
    .throwOnError();

  const event = await createSSRClient(ctx)
    .from("events")
    .select("*")
    .eq("participantsSlug", participationSlug)
    .single()
    .throwOnError();

  const reservation = await createSSRClient(ctx)
    .from("reservations")
    .select("*")
    .eq("reservationId", reservationId)
    .single()
    .throwOnError();

  if (!block.data || !event.data || !reservation.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      block: block.data,
      blockId,
      event: event.data,
      reservation: reservation.data,
      participationSlug,
    },
  };
};

export default Success;
