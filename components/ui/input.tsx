import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-700",
        className,
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";
