import { CalendarIcon, GearIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import {
  Bell,
  CircleUser,
  Grip,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DateTimePicker } from "@/components/ui/datetime-picker-demo";
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
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden md:block">
        <div className="flex h-full max-h-screen flex-col">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Acme Inc</span>
            </Link>
          </div>
          <div className="flex-1 border-r">
            <nav className="grid items-start  px-8 text-sm font-medium">
              <h2 className="text-lg py-4 font-bold">Zapisy na zajęcia</h2>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg  py-2 transition-all hover:text-primary"
              >
                <Grip className="h-4 w-4" />
                Podgląd
              </Link>
              <Link
                href="#"
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
            <SheetTrigger asChild>
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
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Analytics
                </Link>
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
        </header>
        <main className="flex flex-1 max-w-screen-md flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Tabs defaultValue="settings">
            <TabsList>
              <TabsTrigger value="settings">Ogólne</TabsTrigger>
              <TabsTrigger value="sharing">Udostępnianie</TabsTrigger>
              <TabsTrigger value="customisation">Personalizacja</TabsTrigger>
              <TabsTrigger value="other">Inne</TabsTrigger>
            </TabsList>
            <TabsContent value="settings">
              <div className="flex flex-col max-w-screen-md gap-5 mt-10 w-full">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="email" className="text">
                    Nazwa wydarzenia
                  </Label>
                  <Input id="email" placeholder="Bal inżyniera" />
                </div>
                <hr />
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="email">Data</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-left font-normal",
                          !date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        // @ts-expect-error wtf?
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <hr />
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="email">Opis</Label>
                  <Textarea
                    id="opis"
                    placeholder="Bal inżyniera już 15.06! Zapraszamy do zapisywania się na wybrane miejsca :)"
                  />
                </div>
                <hr />
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="organizer-name">Nazwa organizatora</Label>
                  <Input id="organizer-name" placeholder="KN Solvro" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="sharing">
              <div className="flex flex-col max-w-screen-md gap-5 mt-10 w-full">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="email">Link do wydarzenia</Label>
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input
                      type="url"
                      disabled
                      value="eventownik.solvro.pl/hello-jello"
                      placeholder="eventownik.solvro.pl/hello-jello"
                    />
                    <Button
                      onClick={() => {
                        toast("Link skopiowany do schowka");
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
              <div className="flex flex-col max-w-screen-md gap-5 mt-10 w-full">
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
          <Button className="ml-auto mt-8 w-fit">Zapisz</Button>
        </main>
      </div>
    </div>
  );
}
