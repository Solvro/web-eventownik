import Link from "next/link";
import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Building() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="px-4 pb-3 pt-4 text-center text-lg font-bold">
        Rajd wiosenny W4
      </h1>
      <div className="flex w-11/12 items-center justify-center rounded bg-solvrogray p-3 text-center text-xs font-bold">
        <div className="text-center">Wysiwyg</div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 px-4 pb-6 pt-3 sm:px-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((bulding) => (
          <Link href="/rooms" key={bulding}>
            <Card className="flex min-h-40 max-w-40 flex-shrink-0 flex-col items-center justify-center rounded border-black">
              <CardHeader className="text-center">
                <CardTitle className="text-base">Budynek {bulding}</CardTitle>
                <CardDescription className="text-xxs">
                  Kliknij, aby przejść do rezerwacji
                </CardDescription>
              </CardHeader>
              <CardContent className="text-xs">CardContent</CardContent>
              <CardFooter className="text-xs">CardFooter</CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
