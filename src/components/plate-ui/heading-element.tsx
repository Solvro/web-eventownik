import { withRef, withVariants } from "@udecode/cn";
import { PlateElement } from "@udecode/plate-common/react";
import { cva } from "class-variance-authority";
import React from "react";

const headingVariants = cva("", {
  variants: {
    isFirstBlock: {
      false: "",
      true: "!mt-0",
    },
    variant: {
      h1: "mb-1 mt-8 font-heading text-4xl font-bold",
      h2: "mb-px mt-1 font-heading text-2xl font-semibold tracking-tight",
      h3: "mb-px mt-1 font-heading text-xl font-semibold tracking-tight",
      h4: "mt-[0.75em] font-heading text-lg font-semibold tracking-tight",
      h5: "mt-[0.75em] text-lg font-semibold tracking-tight",
      h6: "mt-[0.75em] text-base font-semibold tracking-tight",
    },
  },
});

const HeadingElementVariants = withVariants(PlateElement, headingVariants, [
  "isFirstBlock",
  "variant",
]);

export const HeadingElement = withRef<typeof HeadingElementVariants>(
  ({ children, isFirstBlock, variant = "h1", ...props }, ref) => {
    const { editor, element } = props;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const Element = variant!;

    return (
      <HeadingElementVariants
        ref={ref}
        asChild={true}
        variant={variant}
        isFirstBlock={element === editor.children[0] || isFirstBlock}
        {...props}
      >
        <Element>{children}</Element>
      </HeadingElementVariants>
    );
  },
);
