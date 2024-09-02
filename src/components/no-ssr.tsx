import dynamic from "next/dynamic";
import type React from "react";

export const withNoSSR = <T,>(Component: React.FunctionComponent<T>) =>
  dynamic(() => Promise.resolve(Component), { ssr: false });
