import React from "react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { useFormStatus } from "react-dom";
const FormSubmit = ({ children, disabled, className }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending || disabled}
      className={cn(className)}
      type="submit"
      variant="secondary"
      size="sm"
    >
      {children}
    </Button>
  );
};

export default FormSubmit;
