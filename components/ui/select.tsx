import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/icon";

/**
 * Select — section 08 of the design system. Native <select> styled to match
 * the text-input field specs, with a custom chevron.
 */
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
}

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <div
      className={cn(
        "relative flex items-center rounded-[12px] border border-neutral-200 bg-surface",
        "transition-colors focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-100",
        className,
      )}
    >
      <select
        className={cn(
          "h-11 w-full appearance-none bg-transparent px-4 pr-10",
          "text-[14px] text-neutral-900 outline-none",
        )}
        {...props}
      >
        {children}
      </select>
      <Icon
        name="chevron-down"
        size={18}
        className="pointer-events-none absolute right-3 text-neutral-500"
      />
    </div>
  );
}
