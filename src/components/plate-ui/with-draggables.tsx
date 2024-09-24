import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import { CodeBlockPlugin } from "@udecode/plate-code-block/react";
import {
  ParagraphPlugin,
  createNodesWithHOC,
} from "@udecode/plate-common/react";
import {
  type WithDraggableOptions,
  withDraggable as withDraggablePrimitive,
} from "@udecode/plate-dnd";
import { ExcalidrawPlugin } from "@udecode/plate-excalidraw/react";
import { HEADING_KEYS } from "@udecode/plate-heading";
import { ColumnPlugin } from "@udecode/plate-layout/react";
import {
  BulletedListPlugin,
  NumberedListPlugin,
} from "@udecode/plate-list/react";
import {
  ImagePlugin,
  MediaEmbedPlugin,
  PlaceholderPlugin,
} from "@udecode/plate-media/react";
import { TogglePlugin } from "@udecode/plate-toggle/react";
import type { FC } from "react";

import { Draggable, type DraggableProps } from "./draggable";

export const withDraggable = (
  Component: FC,
  options?: WithDraggableOptions<
    Partial<Omit<DraggableProps, "children" | "editor" | "element">>
  >,
) =>
  withDraggablePrimitive<DraggableProps>(
    Draggable,
    Component,
    options as never,
  );

export const withDraggablesPrimitive = createNodesWithHOC(withDraggable);

export const withDraggables = (components: unknown) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return withDraggablesPrimitive(components, [
    {
      keys: [
        ParagraphPlugin.key,
        BulletedListPlugin.key,
        NumberedListPlugin.key,
      ],
      level: 0,
    },
    {
      key: HEADING_KEYS.h1,
      draggableProps: {
        classNames: {
          blockToolbarWrapper: "h-[1.3em]",
          gutterLeft: "px-0 pb-1 text-[1.875em]",
        },
      },
    },
    {
      key: HEADING_KEYS.h2,
      draggableProps: {
        classNames: {
          blockToolbarWrapper: "h-[1.3em]",
          gutterLeft: "px-0 pb-1 text-[1.5em]",
        },
      },
    },
    {
      key: HEADING_KEYS.h3,
      draggableProps: {
        classNames: {
          blockToolbarWrapper: "h-[1.3em]",
          gutterLeft: "pt-[2px] px-0 pb-1 text-[1.25em]",
        },
      },
    },
    {
      keys: [HEADING_KEYS.h4, HEADING_KEYS.h5],
      draggableProps: {
        classNames: {
          blockToolbarWrapper: "h-[1.3em]",
          gutterLeft: "pt-[3px] px-0 pb-0 text-[1.1em]",
        },
      },
    },
    {
      keys: [ParagraphPlugin.key],
      draggableProps: {
        classNames: {
          gutterLeft: "pt-[3px] px-0 pb-0",
        },
      },
    },
    {
      keys: [HEADING_KEYS.h6, BulletedListPlugin.key, NumberedListPlugin.key],
      draggableProps: {
        classNames: {
          gutterLeft: "px-0 pb-0",
        },
      },
    },
    {
      key: BlockquotePlugin.key,
      draggableProps: {
        classNames: {
          gutterLeft: "px-0 pb-0",
        },
      },
    },
    {
      key: CodeBlockPlugin.key,
      draggableProps: {
        classNames: {
          gutterLeft: "pt-6 px-0 pb-0",
        },
      },
    },
    {
      key: ImagePlugin.key,
      draggableProps: {
        classNames: {
          gutterLeft: "pt-0 px-0 pb-0",
        },
      },
    },
    {
      key: MediaEmbedPlugin.key,
      draggableProps: {
        classNames: {
          gutterLeft: "pt-0 px-0 pb-0",
        },
      },
    },
    {
      key: ExcalidrawPlugin.key,
      draggableProps: {
        classNames: {
          gutterLeft: "pt-0 px-0 pb-0",
        },
      },
    },
    {
      key: TogglePlugin.key,
      draggableProps: {
        classNames: {
          gutterLeft: "pt-0 px-0 pb-0",
        },
      },
    },
    {
      key: ColumnPlugin.key,
      draggableProps: {
        classNames: {
          gutterLeft: "pt-0 px-0 pb-0",
        },
      },
    },
    {
      key: PlaceholderPlugin.key,
      draggableProps: {
        classNames: {
          gutterLeft: "pt-3 px-0 pb-0",
        },
      },
    },
  ]);
};
