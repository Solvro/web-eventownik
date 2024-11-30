import type { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react";

// eslint-disable-next-line no-restricted-imports
import type { ShouldShowProps } from "../../types";
import { ImagePopoverBlock } from "../image/image-popover-block";

const ImageBubbleMenu = ({ editor }: { editor: Editor }) => {
  const shouldShow = ({ editor: e, from, to }: ShouldShowProps) => {
    if (from === to) {
      return false;
    }

    const img = e.getAttributes("image");

    if (Boolean(img.src)) {
      return true;
    }

    return false;
  };

  const unSetImage = () => {
    editor.commands.deleteSelection();
  };

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={shouldShow}
      tippyOptions={{
        placement: "bottom",
        offset: [0, 8],
      }}
    >
      <ImagePopoverBlock onRemove={unSetImage} />
    </BubbleMenu>
  );
};

export { ImageBubbleMenu };
