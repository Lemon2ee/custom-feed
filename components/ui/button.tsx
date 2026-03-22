import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "destructive" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
        size === "default" && "px-4 py-2 text-sm",
        size === "sm" && "px-3 py-1.5 text-xs",
        size === "lg" && "px-6 py-3 text-base",
        size === "icon" && "h-9 w-9 p-0",
        variant === "default" &&
          "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200",
        variant === "secondary" &&
          "bg-zinc-200 text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
        variant === "outline" &&
          "border border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900",
        variant === "destructive" &&
          "bg-red-600 text-white hover:bg-red-500",
        variant === "ghost" &&
          "hover:bg-zinc-100 dark:hover:bg-zinc-800",
        className,
      )}
      {...props}
    />
  );
}
