import {
  CaretDownIcon,
  CodeIcon,
  DividerHorizontalIcon,
  PlusIcon,
  QuoteIcon,
} from "@radix-ui/react-icons";
import type { Editor } from "@tiptap/react";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

import type { toggleVariants } from "@/components/ui/toggle";

// eslint-disable-next-line no-restricted-imports
import type { FormatAction } from "../../types";
import { ImageEditDialog } from "../image/image-edit-dialog";
import { LinkEditPopover } from "../link/link-edit-popover";
import { ToolbarSection } from "../toolbar-section";

type InsertElementAction = "blockquote" | "codeBlock" | "horizontalRule";
interface InsertElement extends FormatAction {
  value: InsertElementAction;
}

const formatActions: InsertElement[] = [
  {
    value: "codeBlock",
    label: "Kodzik",
    icon: <CodeIcon className="size-5" />,
    action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
    isActive: (editor) => editor.isActive("codeBlock"),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleCodeBlock().run(),
    shortcuts: ["mod", "alt", "C"],
  },
  {
    value: "blockquote",
    label: "Cytat",
    icon: <QuoteIcon className="size-5" />,
    action: (editor) => editor.chain().focus().toggleBlockquote().run(),
    isActive: (editor) => editor.isActive("blockquote"),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleBlockquote().run(),
    shortcuts: ["mod", "shift", "B"],
  },
  {
    value: "horizontalRule",
    label: "Linia pozioma",
    icon: <DividerHorizontalIcon className="size-5" />,
    action: (editor) => editor.chain().focus().setHorizontalRule().run(),
    isActive: () => false,
    canExecute: (editor) =>
      editor.can().chain().focus().setHorizontalRule().run(),
    shortcuts: ["mod", "alt", "-"],
  },
];

interface SectionFiveProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
  activeActions?: InsertElementAction[];
  mainActionCount?: number;
}

export const SectionFive: React.FC<SectionFiveProps> = ({
  editor,
  activeActions = formatActions.map((action) => action.value),
  mainActionCount = 0,
  size,
  variant,
}) => {
  return (
    <>
      <LinkEditPopover editor={editor} size={size} variant={variant} />
      <ImageEditDialog editor={editor} size={size} variant={variant} />
      <ToolbarSection
        editor={editor}
        actions={formatActions}
        activeActions={activeActions}
        mainActionCount={mainActionCount}
        dropdownIcon={
          <>
            <PlusIcon className="size-5" />
            <CaretDownIcon className="size-5" />
          </>
        }
        dropdownTooltip="Dodaj element"
        size={size}
        variant={variant}
      />
    </>
  );
};

SectionFive.displayName = "SectionFive";
