import type { AppProps } from "next/app";
import { Space_Grotesk } from "next/font/google";
import Head from "next/head";

import { ThemeProvider } from "@/components/ui/theme-provider";
import "@/styles/globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Head>
        <title>Eventownik</title>
      </Head>
      <main className={spaceGrotesk.className}>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}
