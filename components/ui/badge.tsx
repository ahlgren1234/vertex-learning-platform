import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Badge / Tag — section 09 of the design system.
 * Small uppercase label used to categorise content.
 */
export type BadgeVariant = "video" | "lesson" | "popular";

const VARIANTS: Record<BadgeVariant, string> = {
  video: "bg-primary-100 text-primary-500",
  lesson: "bg-info-500/10 text-info-500",
  popular: "bg-primary-100 text-primary-500",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({
  variant = "video",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[6px] px-2 py-0.5",
        "text-[11px] font-bold uppercase tracking-[0.08em]",
        VARIANTS[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
