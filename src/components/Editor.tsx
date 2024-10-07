import { withProps } from "@udecode/cn";
import { BaseAlignPlugin } from "@udecode/plate-alignment";
import { AutoformatPlugin } from "@udecode/plate-autoformat/react";
import {
  BoldPlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
} from "@udecode/plate-basic-marks/react";
import { ExitBreakPlugin, SoftBreakPlugin } from "@udecode/plate-break/react";
import { CaptionPlugin } from "@udecode/plate-caption/react";
import { type Value, createSlateEditor } from "@udecode/plate-common";
import {
  ParagraphPlugin,
  Plate,
  PlateElement,
  PlateLeaf,
  createPlateEditor,
  usePlateEditor,
} from "@udecode/plate-common/react";
import { CsvPlugin } from "@udecode/plate-csv";
import { DatePlugin } from "@udecode/plate-date/react";
import { DndPlugin } from "@udecode/plate-dnd";
import { DocxPlugin } from "@udecode/plate-docx";
import { HEADING_KEYS } from "@udecode/plate-heading";
import { HeadingPlugin } from "@udecode/plate-heading/react";
import { HighlightPlugin } from "@udecode/plate-highlight/react";
import { IndentListPlugin } from "@udecode/plate-indent-list/react";
import { IndentPlugin } from "@udecode/plate-indent/react";
import { JuicePlugin } from "@udecode/plate-juice";
import { BaseLineHeightPlugin } from "@udecode/plate-line-height";
import { LinkPlugin } from "@udecode/plate-link/react";
import {
  BulletedListPlugin,
  ListItemPlugin,
  ListPlugin,
  NumberedListPlugin,
} from "@udecode/plate-list/react";
import { MarkdownPlugin } from "@udecode/plate-markdown";
import { ImagePlugin, MediaEmbedPlugin } from "@udecode/plate-media/react";
import { NodeIdPlugin } from "@udecode/plate-node-id";
import { ResetNodePlugin } from "@udecode/plate-reset-node/react";
import { DeletePlugin } from "@udecode/plate-select";
import { BlockSelectionPlugin } from "@udecode/plate-selection/react";
import { TabbablePlugin } from "@udecode/plate-tabbable/react";
// import {
//   TableCellHeaderPlugin,
//   TableCellPlugin,
//   TablePlugin,
//   TableRowPlugin,
// } from "@udecode/plate-table/react";
import { TrailingBlockPlugin } from "@udecode/plate-trailing-block";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { DateElement } from "@/components/plate-ui/date-element";
import { Editor } from "@/components/plate-ui/editor";
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons";
import { HeadingElement } from "@/components/plate-ui/heading-element";
import { HighlightLeaf } from "@/components/plate-ui/highlight-leaf";
import { ImageElement } from "@/components/plate-ui/image-element";
import { LinkElement } from "@/components/plate-ui/link-element";
import { LinkFloatingToolbar } from "@/components/plate-ui/link-floating-toolbar";
import { ListElement } from "@/components/plate-ui/list-element";
import { MediaEmbedElement } from "@/components/plate-ui/media-embed-element";
import { ParagraphElement } from "@/components/plate-ui/paragraph-element";
import { withDraggables } from "@/components/plate-ui/with-draggables";

import { autoformatRules } from "./plate-ui/autoformat-rules";

const options = {
  plugins: [
    ParagraphPlugin,
    HeadingPlugin,
    LinkPlugin.configure({
      render: { afterEditable: () => <LinkFloatingToolbar /> },
    }),
    ListPlugin,
    ImagePlugin,
    MediaEmbedPlugin,
    DatePlugin,
    BoldPlugin,
    ItalicPlugin,
    UnderlinePlugin,
    StrikethroughPlugin,
    HighlightPlugin,
    BaseAlignPlugin.configure({
      inject: { targetPlugins: ["p", "h1", "h2", "h3"] },
    }),
    IndentPlugin.configure({
      inject: { targetPlugins: ["p", "h1", "h2", "h3"] },
    }),
    IndentListPlugin.configure({
      inject: { targetPlugins: ["p", "h1", "h2", "h3"] },
    }),
    BaseLineHeightPlugin.configure({
      inject: {
        nodeProps: {
          defaultNodeValue: 1.5,
          validNodeValues: [1, 1.2, 1.5, 2, 3],
        },
        targetPlugins: ["p", "h1", "h2", "h3"],
      },
    }),
    CaptionPlugin.configure({
      options: { plugins: [ImagePlugin, MediaEmbedPlugin] },
    }),
    AutoformatPlugin.configure({
      options: {
        enableUndoOnDelete: true,
        rules: autoformatRules,
      },
    }),
    BlockSelectionPlugin,
    DndPlugin.configure({
      options: { enableScroller: true },
    }),
    ExitBreakPlugin.configure({
      options: {
        rules: [
          {
            hotkey: "mod+enter",
          },
          {
            before: true,
            hotkey: "mod+shift+enter",
          },
          {
            hotkey: "enter",
            level: 1,
            query: {
              allow: ["h1", "h2", "h3"],
              end: true,
              start: true,
            },
            relative: true,
          },
        ],
      },
    }),
    NodeIdPlugin,
    ResetNodePlugin.configure({
      options: {
        rules: [
          // Usage: https://platejs.org/docs/reset-node
        ],
      },
    }),
    DeletePlugin,
    SoftBreakPlugin.configure({
      options: {
        rules: [
          { hotkey: "shift+enter" },
          {
            hotkey: "enter",
            query: {
              allow: ["code_block", "blockquote", "td", "th"],
            },
          },
        ],
      },
    }),
    TabbablePlugin,
    TrailingBlockPlugin.configure({
      options: { type: "p" },
    }),
    DocxPlugin,
    CsvPlugin,
    MarkdownPlugin,
    JuicePlugin,
  ],
  override: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    components: withDraggables({
      [ImagePlugin.key]: ImageElement,
      [LinkPlugin.key]: LinkElement,
      [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: "h1" }),
      [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: "h2" }),
      [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: "h3" }),
      [BulletedListPlugin.key]: withProps(ListElement, { variant: "ul" }),
      [NumberedListPlugin.key]: withProps(ListElement, { variant: "ol" }),
      [ListItemPlugin.key]: withProps(PlateElement, { as: "li" }),
      [MediaEmbedPlugin.key]: MediaEmbedElement,
      [ParagraphPlugin.key]: ParagraphElement,
      [DatePlugin.key]: DateElement,
      [BoldPlugin.key]: withProps(PlateLeaf, { as: "strong" }),
      [HighlightPlugin.key]: HighlightLeaf,
      [ItalicPlugin.key]: withProps(PlateLeaf, { as: "em" }),
      [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: "s" }),
      [UnderlinePlugin.key]: withProps(PlateLeaf, { as: "u" }),
    }),
  },
};

export function PlateEditor({
  onChange,
  value,
}: {
  onChange?: (value: Value) => void;
  value?: Value;
}) {
  const editor2 = usePlateEditor({
    value,
    ...options,
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate
        onValueChange={({ value: value2, editor }) => {
          onChange?.(value2);

          // console.log(editor.api.)
        }}
        editor={editor2}
      >
        <FixedToolbar>
          <FixedToolbarButtons />
        </FixedToolbar>

        <Editor placeholder="Witamy na zapisach do Balu Inżyniera..." />

        <FloatingToolbar>
          <FloatingToolbarButtons />
        </FloatingToolbar>
      </Plate>
    </DndProvider>
  );
}
