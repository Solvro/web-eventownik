import {
  CodeIcon,
  DotsHorizontalIcon,
  FontBoldIcon,
  FontItalicIcon,
  StrikethroughIcon,
  TextNoneIcon,
} from "@radix-ui/react-icons";
import type { Editor } from "@tiptap/react";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

import type { toggleVariants } from "@/components/ui/toggle";

// eslint-disable-next-line no-restricted-imports
import type { FormatAction } from "../../types";
import { ToolbarSection } from "../toolbar-section";

type TextStyleAction =
  | "bold"
  | "clearFormatting"
  | "code"
  | "italic"
  | "strikethrough";

interface TextStyle extends FormatAction {
  value: TextStyleAction;
}

const formatActions: TextStyle[] = [
  {
    value: "bold",
    label: "Pogrubienie",
    icon: <FontBoldIcon className="size-5" />,
    action: (editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor) => editor.isActive("bold"),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleBold().run() &&
      !editor.isActive("codeBlock"),
    shortcuts: ["mod", "B"],
  },
  {
    value: "italic",
    label: "Kursywa",
    icon: <FontItalicIcon className="size-5" />,
    action: (editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor) => editor.isActive("italic"),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleItalic().run() &&
      !editor.isActive("codeBlock"),
    shortcuts: ["mod", "I"],
  },
  {
    value: "strikethrough",
    label: "Kreska",
    icon: <StrikethroughIcon className="size-5" />,
    action: (editor) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor) => editor.isActive("strike"),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleStrike().run() &&
      !editor.isActive("codeBlock"),
    shortcuts: ["mod", "shift", "S"],
  },
  {
    value: "code",
    label: "Kodzik",
    icon: <CodeIcon className="size-5" />,
    action: (editor) => editor.chain().focus().toggleCode().run(),
    isActive: (editor) => editor.isActive("code"),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleCode().run() &&
      !editor.isActive("codeBlock"),
    shortcuts: ["mod", "E"],
  },
  {
    value: "clearFormatting",
    label: "Wyczyść formatowanie",
    icon: <TextNoneIcon className="size-5" />,
    action: (editor) => editor.chain().focus().unsetAllMarks().run(),
    isActive: () => false,
    canExecute: (editor) =>
      editor.can().chain().focus().unsetAllMarks().run() &&
      !editor.isActive("codeBlock"),
    shortcuts: ["mod", "\\"],
  },
];

interface SectionTwoProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
  activeActions?: TextStyleAction[];
  mainActionCount?: number;
}

export const SectionTwo: React.FC<SectionTwoProps> = ({
  editor,
  activeActions = formatActions.map((action) => action.value),
  mainActionCount = 2,
  size,
  variant,
}) => {
  return (
    <ToolbarSection
      editor={editor}
      actions={formatActions}
      activeActions={activeActions}
      mainActionCount={mainActionCount}
      dropdownIcon={<DotsHorizontalIcon className="size-5" />}
      dropdownTooltip="Więcej formatowania"
      dropdownClassName="w-8"
      size={size}
      variant={variant}
    />
  );
};

SectionTwo.displayName = "SectionTwo";
