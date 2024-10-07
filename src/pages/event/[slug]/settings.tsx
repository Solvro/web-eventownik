import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import type { Value } from "@udecode/plate-common";
import { format } from "date-fns";
import type { InferGetServerSidePropsType } from "next";
import { type GetServerSidePropsContext, route } from "nextjs-routes";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { PlateEditor } from "@/components/Editor";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import { createSSRClient } from "@/lib/supabaseSSR";
import type { TablesUpdate } from "@/lib/types";
import { useEvent } from "@/lib/useEvent";
import { useIsClient } from "@/lib/useIsClient";
import { useZodForm } from "@/lib/useZodForm";
import { cn } from "@/lib/utils";

export default function Dashboard({
  ownersSlug,
  ...rest
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const event = useEvent(ownersSlug, {
    ...rest,
    ownersSlug,
  });

  const form = useZodForm({
    schema: z.object({
      name: z.string().min(1),
      eventDate: z.date(),
      description: z.array(z.unknown()),
      organizerName: z.string().min(1),
    }),
    reValidateMode: "onChange",
    defaultValues: {
      name: event.data?.name,
      eventDate:
        typeof event.data?.eventDate === "string"
          ? new Date(event.data.eventDate)
          : undefined,
      description: JSON.parse(event.data?.description ?? "[]") as Value,
      organizerName: event.data?.organizerName,
    },
  });

  const [tab, setTab] = useQueryState(
    "tab",
    parseAsString.withDefault("settings").withOptions({
      clearOnDefault: true,
    }),
  );

  useEffect(() => {
    form.reset({
      name: event.data?.name,
      eventDate:
        typeof event.data?.eventDate === "string"
          ? new Date(event.data.eventDate)
          : undefined,
      description: JSON.parse(event.data?.description ?? "[]") as Value,
      organizerName: event.data?.organizerName,
    });
  }, [event.data, form]);

  const updateEvent = useMutation({
    mutationFn: async (data: TablesUpdate<"events">) => {
      const updatedEvent = await supabase
        .from("events")
        .update(data)
        .eq("ownersSlug", ownersSlug)
        .single()
        .throwOnError();

      return updatedEvent;
    },
  });

  const isClient = useIsClient();

  return (
    <Layout ownersSlug={ownersSlug}>
      <Tabs
        defaultValue="settings"
        value={tab}
        onValueChange={(v) => void setTab(v)}
      >
        <TabsList>
          <TabsTrigger value="settings">Ogólne</TabsTrigger>
          <TabsTrigger value="sharing">Udostępnianie</TabsTrigger>
        </TabsList>
        <TabsContent value="settings">
          <Form {...form}>
            <form
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={form.handleSubmit(async (data) => {
                await updateEvent
                  .mutateAsync({
                    ...data,
                    description: JSON.stringify(data.description),
                    eventDate: data.eventDate.toISOString(),
                  })
                  .then(() => {
                    toast("Zapisano zmiany");
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
              <div className="mt-10 flex w-full max-w-screen-md flex-col gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <FormLabel htmlFor="name" className="text">
                          Nazwa wydarzenia
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="name"
                            placeholder="Bal inżyniera"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <hr />
                <FormField
                  control={form.control}
                  name="eventDate"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <FormLabel htmlFor="date">Data</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild={true}>
                              <Button
                                variant="outline"
                                id="date"
                                disabled={field.disabled}
                                className={cn(
                                  "justify-start text-left font-normal",
                                  !(field.value instanceof Date) &&
                                    "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value instanceof Date
                                  ? format(field.value, "PPP")
                                  : "Wybierz datę"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                              onBlur={field.onBlur}
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus={true}
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <hr />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid w-full items-center gap-1.5">
                        <FormLabel htmlFor="description">Opis</FormLabel>
                        <FormControl>
                          <PlateEditor
                            value={field.value as Value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <hr />
                <FormField
                  control={form.control}
                  name="organizerName"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <FormLabel htmlFor="organizer-name">
                          Nazwa organizatora
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="organizer-name"
                            placeholder="KN Solvro"
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
                className="ml-auto mt-8 w-fit"
              >
                {form.formState.isSubmitting ? (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Zapisz
              </Button>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="sharing">
          <div className="mt-10 flex w-full max-w-screen-md flex-col gap-5">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Link do wydarzenia</Label>
              <div className="flex w-full max-w-sm items-center space-x-2">
                {isClient ? (
                  <Input
                    type="url"
                    disabled={true}
                    className="cursor-copy"
                    value={`${window.location.origin}${route({
                      pathname: "/rejestracja/[participationSlug]",
                      query: {
                        participationSlug: encodeURIComponent(
                          event.data?.participantsSlug ?? "",
                        ),
                      },
                    })}`}
                  />
                ) : null}
                <Button
                  onClick={() => {
                    void navigator.clipboard
                      .writeText(
                        `${window.location.origin}${route({
                          pathname: "/rejestracja/[participationSlug]",
                          query: {
                            participationSlug: encodeURIComponent(
                              event.data?.participantsSlug ?? "",
                            ),
                          },
                        })}`,
                      )
                      .then(() => {
                        toast("Link skopiowany do schowka");
                      });
                  }}
                >
                  Skopiuj
                </Button>
              </div>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Link administratora</Label>
              <div className="flex w-full max-w-sm items-center space-x-2">
                {isClient ? (
                  <Input
                    type="url"
                    disabled={true}
                    className="cursor-copy"
                    value={`${window.location.origin}${route({
                      pathname: "/event/[slug]/preview",
                      query: {
                        slug: encodeURIComponent(event.data?.ownersSlug ?? ""),
                      },
                    })}`}
                  />
                ) : null}
                <Button
                  onClick={() => {
                    void navigator.clipboard
                      .writeText(
                        `${window.location.origin}${route({
                          pathname: "/event/[slug]/preview",
                          query: {
                            slug: encodeURIComponent(
                              event.data?.ownersSlug ?? "",
                            ),
                          },
                        })}`,
                      )
                      .then(() => {
                        toast("Link skopiowany do schowka");
                      });
                  }}
                >
                  Skopiuj
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext<"/event/[slug]/settings">,
) => {
  const slug = z.string().uuid().parse(ctx.params.slug);

  const event = await createSSRClient(ctx)
    .from("events")
    .select("*")
    .eq("ownersSlug", slug)
    .single()
    .throwOnError();

  if (!event.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { ...event.data },
  };
};
