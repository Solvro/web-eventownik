import type { KnipConfig } from "knip/";

const config = {
  ignore: [
    "src/components/ui/**",
    "src/lib/types.ts",
    "postcss.config.mjs",
    "lint-staged.config.mjs",
  ],
  // sharp is used in nextjs image optimization
  // slick carousel is used scss files
  ignoreDependencies: ["sharp", "@radix-ui/.+", "cmdk"],
} satisfies KnipConfig;

// eslint-disable-next-line import/no-default-export
export default config;
