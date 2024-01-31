import * as React from "react";

import { cn } from "@/lib/utils";
import { FieldError } from "react-hook-form";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isInvalid?: boolean | FieldError;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ isInvalid, className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
          isInvalid && "border-destructive"
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
