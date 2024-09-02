import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setDefaultOptions } from "date-fns";
import { pl } from "date-fns/locale";
import i18next from "i18next";
import type { AppProps } from "next/app";
import { Space_Grotesk } from "next/font/google";
import Head from "next/head";
import { Suspense, useEffect, useState } from "react";
import { v4 } from "uuid";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import translation from "zod-i18n-map/locales/pl/zod.json";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { supabase } from "@/lib/supabase";
import "@/styles/globals.css";

setDefaultOptions({ locale: pl });

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

void i18next.init({
  lng: "pl",
  resources: {
    pl: { zod: translation },
  },
});
z.setErrorMap(zodI18nMap);

const ReactQueryClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const signUp = async () => {
      const session = await supabase.auth.getSession();
      if (!session.data.session) {
        await supabase.auth.signUp({
          email: `${v4()}@eventownik.solvro.pl`,
          password: v4(),
        });
      }
    };

    void signUp();

    const listener = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        void signUp();
      }
    });

    return () => {
      listener.data.subscription.unsubscribe();
    };
  }, []);

  return (
    <ThemeProvider>
      <ReactQueryClientProvider>
        <Head>
          <title>Eventownik</title>
        </Head>
        <main className={spaceGrotesk.className}>
          <Suspense fallback={null}>
            <Component {...pageProps} />
          </Suspense>
          <Toaster />
        </main>
      </ReactQueryClientProvider>
    </ThemeProvider>
  );
}
