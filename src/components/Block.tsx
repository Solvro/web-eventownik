import { cva } from "class-variance-authority";
import React, { type ComponentProps } from "react";

export const blockCardVariants = cva(
  "flex h-72 w-72 border-spacing-1 rounded-md border border-[#71717A] transition-all duration-300 ease-in-out hover:shadow-md",
);

export const BlockCard = ({
  className,
  ...props
}: ComponentProps<"button">) => {
  return (
    <button
      {...props}
      className={blockCardVariants({
        className,
      })}
    />
  );
};
