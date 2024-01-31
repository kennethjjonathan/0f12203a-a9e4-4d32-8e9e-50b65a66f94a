import * as React from "react";

import { Input, InputProps } from "../ui/input";
import { Label } from "../ui/label";

export interface InputWithLabelProps extends InputProps {
  invalidMessage?: string;
  label: string;
  id: string;
}

const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  (
    { isInvalid, label, id, invalidMessage, className, type, ...props },
    ref
  ) => {
    return (
      <div className="w-full space-y-1">
        <Label htmlFor={id}>{label}</Label>
        <Input
          id={id}
          ref={ref}
          type={type}
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
  }
);

InputWithLabel.displayName = "InputWithLabel";

export { InputWithLabel };
