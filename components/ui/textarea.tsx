import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[100px] w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-700",
        className,
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";
