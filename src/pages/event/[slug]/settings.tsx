import { CalendarIcon, GearIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { Grip, Home, LineChart, Menu, Package2 } from "lucide-react";
import type { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import type { GetServerSidePropsContext } from "nextjs-routes";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DateTimePicker } from "@/components/ui/datetime-picker-demo";
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import type { TablesUpdate } from "@/lib/types";
import { useEvent } from "@/lib/useEvent";
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

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden md:block">
        <div className="flex h-full max-h-screen flex-col">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Eventownik</span>
            </Link>
          </div>
          <div className="flex-1 border-r">
            <nav className="grid items-start  px-8 text-sm font-medium">
              <h2 className="py-4 text-lg font-bold">Zapisy na zajęcia</h2>
              <Link
                href={{
                  hash: "#",
                }}
                className="flex items-center gap-3 rounded-lg  py-2 transition-all hover:text-primary"
              >
                <Grip className="h-4 w-4" />
                Podgląd
              </Link>
              <Link
                href={{
                  hash: "#",
                }}
                className="flex items-center gap-3 rounded-lg  py-2 transition-all hover:text-primary"
              >
                <GearIcon className="h-4 w-4" />
                Ustawienia
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild={true}>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href={{
                    hash: "#",
                  }}
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Eventownik</span>
                </Link>
                <Link
                  href={{
                    hash: "#",
                  }}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Podgląd
                </Link>

                <Link
                  href={{
                    hash: "#",
                  }}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Ustawienia
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex max-w-screen-md flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Tabs
            defaultValue="settings"
            value={tab}
            onValueChange={(v) => void setTab(v)}
          >
            <TabsList>
              <TabsTrigger value="settings">Ogólne</TabsTrigger>
              <TabsTrigger value="sharing">Udostępnianie</TabsTrigger>
              <TabsTrigger value="customisation">Personalizacja</TabsTrigger>
              <TabsTrigger value="other">Inne</TabsTrigger>
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
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {format(field.value, "PPP")}
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
                          <div className="grid w-full max-w-sm items-center gap-1.5">
                            <FormLabel htmlFor="description">Opis</FormLabel>
                            <FormControl>
                              <Textarea
                                id="description"
                                {...field}
                                placeholder="Bal inżyniera już 15.06! Zapraszamy do zapisywania się na wybrane miejsca :)"
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
                    <Input
                      type="url"
                      disabled={true}
                      className="cursor-copy"
                      value={`https://eventownik.solvro.pl/event/${event.data?.usersSlug}`}
                    />
                    <Button
                      onClick={() => {
                        void navigator.clipboard
                          .writeText(
                            `https://eventownik.solvro.pl/event/${event.data?.usersSlug}`,
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
                <hr />
                <div className="grid w-full max-w-sm items-center gap-1.5">
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
                  <Label htmlFor="people-limit-per-link">
                    Limit osób na link
                  </Label>
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
                </div>
              </div>
            </TabsContent>
            <TabsContent value="customisation">
              <div className="mt-10 flex w-full max-w-screen-md flex-col gap-5">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="default-color">Kolor domyślny</Label>
                  <Input id="default-color" type="color" />
                </div>
                <hr />
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="secondary-color">Kolor drugi</Label>
                  <Input id="secondary-color" type="color" />
                </div>
                <hr />
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="email">Tło wymiarów (???)</Label>
                  <Input type="text" placeholder="Co??" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="info">Informacje</Label>
                  <Textarea id="info" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext<"/event/[slug]/settings">,
) => {
  const slug = z.string().uuid().parse(ctx.params.slug);

  const event = await supabase
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
