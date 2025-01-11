import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { Block } from "@/types/Block";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildBreadcrumbs(blocks: Block[], currentBlockId: string) {
  const blockMap: { [key: string]: Block } = {};
  blocks.forEach((block) => {
    blockMap[block.blockId] = block;
  });

  const breadcrumbs: Block[] = [];
  let currentBlock: Block | undefined = blockMap[currentBlockId];

  while (currentBlock) {
    breadcrumbs.unshift(currentBlock);
    if (currentBlock.parentBlockId !== null) {
      currentBlock = blockMap[currentBlock.parentBlockId];
    } else {
      currentBlock = undefined;
    }
  }

  return breadcrumbs;
}
