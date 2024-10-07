"use client";

import { EditorContent, EditorRoot } from "novel";
import { useState } from "react";

import { defaultExtensions } from "./extensions";

export const TailwindEditor = () => {
  const [content, setContent] = useState(null);
  return (
    <EditorRoot>
      <EditorContent
        initialContent={content}
        extensions={defaultExtensions}
        onUpdate={({ editor }) => {
          const json = editor.getJSON();
          setContent(json);
        }}
      />
    </EditorRoot>
  );
};
