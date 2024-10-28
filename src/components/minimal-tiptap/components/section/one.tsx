import { CaretDownIcon, LetterCaseCapitalizeIcon } from "@radix-ui/react-icons";
import type { Level } from "@tiptap/extension-heading";
import type { Editor } from "@tiptap/react";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { toggleVariants } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

// eslint-disable-next-line no-restricted-imports
import type { FormatAction } from "../../types";
import { ShortcutKey } from "../shortcut-key";
import { ToolbarButton } from "../toolbar-button";

interface TextStyle
  extends Omit<
    FormatAction,
    "action" | "canExecute" | "icon" | "isActive" | "value"
  > {
  element: keyof JSX.IntrinsicElements;
  level?: Level;
  className: string;
}

const formatActions: TextStyle[] = [
  {
    label: "Zwykły tekst",
    element: "span",
    className: "grow",
    shortcuts: ["mod", "alt", "0"],
  },
  {
    label: "Nagłówek 1",
    element: "h1",
    level: 1,
    className: "m-0 grow text-3xl font-extrabold",
    shortcuts: ["mod", "alt", "1"],
  },
  {
    label: "Nagłówek 2",
    element: "h2",
    level: 2,
    className: "m-0 grow text-xl font-bold",
    shortcuts: ["mod", "alt", "2"],
  },
  {
    label: "Nagłówek 3",
    element: "h3",
    level: 3,
    className: "m-0 grow text-lg font-semibold",
    shortcuts: ["mod", "alt", "3"],
  },
  {
    label: "Nagłówek 4",
    element: "h4",
    level: 4,
    className: "m-0 grow text-base font-semibold",
    shortcuts: ["mod", "alt", "4"],
  },
  {
    label: "Nagłówek 5",
    element: "h5",
    level: 5,
    className: "m-0 grow text-sm font-normal",
    shortcuts: ["mod", "alt", "5"],
  },
  {
    label: "Nagłówek 6",
    element: "h6",
    level: 6,
    className: "m-0 grow text-sm font-normal",
    shortcuts: ["mod", "alt", "6"],
  },
];

interface SectionOneProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
  activeLevels?: Level[];
}

export const SectionOne: React.FC<SectionOneProps> = React.memo(
  ({ editor, activeLevels = [1, 2, 3, 4, 5, 6], size, variant }) => {
    const filteredActions = React.useMemo(
      () =>
        formatActions.filter(
          (action) => !action.level || activeLevels.includes(action.level),
        ),
      [activeLevels],
    );

    const handleStyleChange = React.useCallback(
      (level?: Level) => {
        if (level) {
          editor.chain().focus().toggleHeading({ level }).run();
        } else {
          editor.chain().focus().setParagraph().run();
        }
      },
      [editor],
    );

    const renderMenuItem = React.useCallback(
      ({ label, element: Element, level, className, shortcuts }: TextStyle) => (
        <DropdownMenuItem
          key={label}
          onClick={() => {
            handleStyleChange(level);
          }}
          className={cn("flex flex-row items-center justify-between gap-4", {
            "bg-accent": level
              ? editor.isActive("heading", { level })
              : editor.isActive("paragraph"),
          })}
          aria-label={label}
        >
          <Element className={className}>{label}</Element>
          <ShortcutKey keys={shortcuts} />
        </DropdownMenuItem>
      ),
      [editor, handleStyleChange],
    );

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild={true}>
          <ToolbarButton
            isActive={editor.isActive("heading")}
            tooltip="Style tekstu"
            aria-label="Style tekstu"
            pressed={editor.isActive("heading")}
            className="w-12"
            disabled={editor.isActive("codeBlock")}
            size={size}
            variant={variant}
          >
            <LetterCaseCapitalizeIcon className="size-5" />
            <CaretDownIcon className="size-5" />
          </ToolbarButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-full">
          {filteredActions.map(renderMenuItem)}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
);

SectionOne.displayName = "SectionOne";
