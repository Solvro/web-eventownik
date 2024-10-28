/* eslint-disable @typescript-eslint/strict-boolean-expressions */

/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface LinkEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultUrl?: string;
  defaultText?: string;
  defaultIsNewTab?: boolean;
  onSave: (url: string, text?: string, isNewTab?: boolean) => void;
}

export const LinkEditBlock = React.forwardRef<HTMLDivElement, LinkEditorProps>(
  ({ onSave, defaultIsNewTab, defaultUrl, defaultText, className }, ref) => {
    const formRef = React.useRef<HTMLDivElement>(null);
    const [url, setUrl] = React.useState(defaultUrl || "");
    const [text, setText] = React.useState(defaultText || "");
    const [isNewTab, setIsNewTab] = React.useState(defaultIsNewTab || false);

    const handleSave = React.useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        if (formRef.current) {
          const isValid = Array.from(
            formRef.current.querySelectorAll("input"),
          ).every((input) => input.checkValidity());

          if (isValid) {
            onSave(url, text, isNewTab);
          } else {
            formRef.current.querySelectorAll("input").forEach((input) => {
              if (!input.checkValidity()) {
                input.reportValidity();
              }
            });
          }
        }
      },
      [onSave, url, text, isNewTab],
    );

    React.useImperativeHandle(ref, () => formRef.current as HTMLDivElement);

    return (
      <div ref={formRef}>
        <div className={cn("space-y-4", className)}>
          <div className="space-y-1">
            <Label>URL</Label>
            <Input
              type="url"
              required={true}
              placeholder="https://solvro.pwr.edu.pl"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
          </div>

          <div className="space-y-1">
            <Label>Tekst wyświetlany (opcjonalne)</Label>
            <Input
              type="text"
              placeholder="Facebook"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Label>Otwórz w nowej karcie</Label>
            <Switch checked={isNewTab} onCheckedChange={setIsNewTab} />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  },
);

/* eslint-enable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-enable @typescript-eslint/strict-boolean-expressions */

LinkEditBlock.displayName = "LinkEditBlock";
