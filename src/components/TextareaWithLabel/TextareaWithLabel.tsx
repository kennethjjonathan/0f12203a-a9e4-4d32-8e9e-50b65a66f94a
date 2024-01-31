import * as React from "react";

import { Label } from "../ui/label";
import { Textarea, TextareaProps } from "../ui/textarea";

export interface TextareaWithLabelProps extends TextareaProps {
  invalidMessage?: string;
  label: string;
  id: string;
}

const TextareaWithLabel = React.forwardRef<
  HTMLTextAreaElement,
  TextareaWithLabelProps
>(({ isInvalid, label, id, invalidMessage, className, ...props }, ref) => {
  return (
    <div className="w-full space-y-1">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        ref={ref}
        className={className}
        {...props}
        isInvalid={isInvalid}
      />
      {isInvalid && (
        <p className="text-destructive w-full max-w-full text-left text-xs lg:text-sm">
          {invalidMessage}
        </p>
      )}
    </div>
  );
});

TextareaWithLabel.displayName = "TextareaWithLabel";

export { TextareaWithLabel };
