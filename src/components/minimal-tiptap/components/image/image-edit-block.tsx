import type { Editor } from "@tiptap/react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ImageEditBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  editor: Editor;
  close: () => void;
}

const ImageEditBlock = ({
  editor,
  className,
  close,
  ...props
}: ImageEditBlockProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [link, setLink] = React.useState<string>("");

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleLink = () => {
    editor.chain().focus().setImage({ src: link }).run();
    close();
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e2) => {
      const src = e2.target?.result as string;
      editor.chain().focus().setImage({ src }).run();
    };

    reader.readAsDataURL(files[0]);

    close();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleLink();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={cn("space-y-6", className)} {...props}>
        <div className="space-y-1">
          <Label>Dodaj link do zdjęcia</Label>
          <div className="flex">
            <Input
              type="url"
              required={true}
              placeholder="https://example.com"
              value={link}
              className="grow"
              onChange={(e) => {
                setLink(e.target.value);
              }}
            />
            <Button type="submit" className="ml-2 inline-block">
              Dodaj
            </Button>
          </div>
        </div>
        <Button className="w-full" onClick={handleClick}>
          Wrzuć z dysku
        </Button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          multiple={true}
          className="hidden"
          onChange={handleFile}
        />
      </div>
    </form>
  );
};

export { ImageEditBlock };
