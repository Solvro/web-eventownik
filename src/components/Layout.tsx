import { GearIcon } from "@radix-ui/react-icons";
import { Grip, Home, LineChart, Menu, Package2 } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Layout = ({
  children,
  ownersSlug,
}: {
  children: ReactNode;
  ownersSlug: string;
}) => {
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
                  pathname: "/event/[slug]/preview",
                  query: {
                    slug: ownersSlug,
                  },
                }}
                className="flex items-center gap-3 rounded-lg  py-2 transition-all hover:text-primary"
              >
                <Grip className="h-4 w-4" />
                Podgląd
              </Link>
              <Link
                href={{
                  pathname: "/event/[slug]/settings",
                  query: {
                    slug: ownersSlug,
                  },
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
                    pathname: "/",
                  }}
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Eventownik</span>
                </Link>
                <Link
                  href={{
                    pathname: "/event/[slug]/preview",
                    query: {
                      slug: ownersSlug,
                    },
                  }}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Podgląd
                </Link>

                <Link
                  href={{
                    pathname: "/event/[slug]/settings",
                    query: {
                      slug: ownersSlug,
                    },
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
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
