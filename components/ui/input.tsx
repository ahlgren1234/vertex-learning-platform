import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/icon";

/**
 * Text input — section 08 of the design system.
 *
 * Field specs:
 *  - Height: 44px
 *  - Radius: 12px
 *  - Border: 1px solid #E2E8F0 (neutral-200)
 *  - Padding: 0 16px
 *  - Focus: border color #FB923C (primary-400)
 */
const FIELD =
  "h-11 w-full rounded-[12px] border border-neutral-200 bg-surface " +
  "text-[14px] text-neutral-900 placeholder:text-neutral-400 outline-none " +
  "transition-colors focus-within:border-primary-400 " +
  "focus-within:ring-2 focus-within:ring-primary-100";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: ReactNode;
  trailing?: ReactNode;
}

export function Input({ iconLeft, trailing, className, ...props }: InputProps) {
  return (
    <div className={cn("flex items-center gap-2 px-4", FIELD, className)}>
      {iconLeft ? (
        <span className="grid place-items-center text-neutral-400">
          {iconLeft}
        </span>
      ) : null}
      <input
        className="peer h-full w-full bg-transparent outline-none placeholder:text-neutral-400"
        {...props}
      />
      {trailing ? <span className="shrink-0">{trailing}</span> : null}
    </div>
  );
}

/** Keyboard hint shown inside inputs, e.g. ⌘K */
export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd
      className={cn(
        "shrink-0 whitespace-nowrap rounded-[6px] border border-neutral-200 bg-neutral-50 px-1.5 py-0.5",
        "font-sans text-[11px] font-medium text-neutral-500",
      )}
    >
      {children}
    </kbd>
  );
}

/** Preset search field with leading glass icon and a ⌘K hint. */
export function SearchInput({
  placeholder = "Search anything...",
  ...props
}: InputProps) {
  return (
    <Input
      type="search"
      placeholder={placeholder}
      iconLeft={<Icon name="search" size={18} />}
      trailing={<Kbd>⌘ K</Kbd>}
      {...props}
    />
  );
}
