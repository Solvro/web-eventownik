import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import type { InferGetServerSidePropsType } from "next";
import { type GetServerSidePropsContext, route } from "nextjs-routes";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Layout } from "@/components/Layout";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
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
      description: z.string(),
      messageAfterRegistration: z.string(),
      organizerName: z.string().min(1),
    }),
    reValidateMode: "onChange",
    defaultValues: {
      name: event.data?.name,
      eventDate:
        typeof event.data?.eventDate === "string"
          ? new Date(event.data.eventDate)
          : undefined,
      description: event.data?.description ?? "",
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
      description: event.data?.description ?? "",
      organizerName: event.data?.organizerName,
      messageAfterRegistration: event.data?.messageAfterRegistration ?? "",
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
          <TabsTrigger value="customisation">Personalizacja</TabsTrigger>
        </TabsList>
        <TabsContent value="settings">
          <Form {...form}>
            <form
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={form.handleSubmit(async (data) => {
                await updateEvent
                  .mutateAsync({
                    ...data,
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

                <FormField
                  control={form.control}
                  name="eventDate"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <FormLabel htmlFor="date">
                          Data rozpoczęcia wydarzenia
                        </FormLabel>
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

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <FormLabel htmlFor="description">Opis</FormLabel>
                        <FormControl>
                          <MinimalTiptapEditor
                            className="w-full"
                            editorContentClassName="p-5"
                            output="html"
                            placeholder="Bal inżyniera to wydarzenie, które odbywa się co roku w naszej uczelni. W tym roku mamy dla Was wiele niespodzianek!"
                            editable={true}
                            editorClassName="focus:outline-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

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
                <FormField
                  control={form.control}
                  name="messageAfterRegistration"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <FormLabel htmlFor="description">
                          Wiadomość po rejestracji
                        </FormLabel>
                        <FormControl>
                          <MinimalTiptapEditor
                            className="w-full"
                            editorContentClassName="p-5"
                            output="html"
                            placeholder="Dzięki za zapisanie się!"
                            editable={true}
                            editorClassName="focus:outline-none"
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
            {/* <hr /> */}
            {/* <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Data i godz. otwarcia zapisów</Label>
              <DateTimePicker />
            </div>
            <hr />
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Data i godz. zamknięcia zapisów</Label>
              <DateTimePicker />
            </div>
            <hr />
            <div className="grid w-full max-w-sm items-center gap-5">
              <Label htmlFor="people-limit-per-link">Limit osób na link</Label>
              <Input
                type="number"
                id="people-limit-per-link"
                placeholder="10"
              />
            </div>
            <hr />
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="people-limit-per-sector">
                Limit osób na sektor
              </Label>
              <Input
                type="number"
                id="people-limit-per-sector"
                placeholder="2"
              />
            </div> */}
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
