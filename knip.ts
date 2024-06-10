import type { KnipConfig } from "knip/";

const config = {
  ignore: ["src/components/ui/**", "src/lib/types.ts"],
  // sharp is used in nextjs image optimization
  // slick carousel is used scss files
  ignoreDependencies: ["sharp"],
} satisfies KnipConfig;

export default config;
