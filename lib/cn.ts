export type ClassValue = string | number | false | null | undefined;

/**
 * Minimal class-name joiner. Filters out falsy values and joins with a space.
 * Kept dependency-free on purpose — the design system relies on non-conflicting
 * Tailwind utilities, so no class-merge resolution is needed.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
