import type { Content } from "@tiptap/react";
import React, { useState } from "react";

import { MinimalTiptapEditor } from "@/components/minimal-tiptap";

const Editor = () => {
  const [value, setValue] = useState<Content>("");

  return (
    <MinimalTiptapEditor
      value={value}
      onChange={setValue}
      className="w-full"
      editorContentClassName="p-5"
      output="html"
      placeholder="Type your description here..."
      autofocus={true}
      editable={true}
      editorClassName="focus:outline-none"
    />
  );
};

export default Editor;
