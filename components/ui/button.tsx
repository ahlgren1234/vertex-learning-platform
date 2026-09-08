import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Button — section 07 of the design system.
 *
 * Specs:
 *  - Height: 44px (default)
 *  - Padding: 0 16px (lg), 0 12px (md)
 *  - Radius: 12px
 *  - Font: Inter Medium (14–16px)
 */
export type ButtonVariant = "primary" | "secondary" | "tertiary" | "text";
export type ButtonSize = "lg" | "md";

const BASE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[12px] font-medium " +
  "transition-colors duration-150 outline-none " +
  "focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas " +
  "disabled:cursor-not-allowed";

const SIZES: Record<ButtonSize, string> = {
  lg: "h-11 px-4 text-[16px]",
  md: "h-11 px-3 text-[14px]",
};

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-600 " +
    "disabled:bg-primary-100 disabled:text-primary-300 disabled:hover:bg-primary-100",
  secondary:
    "border border-primary-400 text-primary-500 bg-transparent hover:bg-primary-100 " +
    "disabled:border-primary-200 disabled:text-primary-300 disabled:hover:bg-transparent",
  tertiary:
    "border border-neutral-200 bg-surface text-neutral-900 hover:bg-neutral-100 " +
    "disabled:text-neutral-300 disabled:hover:bg-surface",
  text:
    "px-1 text-primary-500 hover:text-primary-600 " +
    "disabled:text-primary-200 disabled:hover:text-primary-200",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

export function Button({
  variant = "primary",
  size = "lg",
  iconLeft,
  iconRight,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(BASE, SIZES[size], VARIANTS[variant], className)}
      {...props}
    >
      {iconLeft ? <span className="grid place-items-center">{iconLeft}</span> : null}
      {children}
      {iconRight ? (
        <span className="grid place-items-center">{iconRight}</span>
      ) : null}
    </button>
  );
}
