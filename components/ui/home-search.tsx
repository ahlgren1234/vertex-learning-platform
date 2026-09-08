"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/icon";
import { Kbd } from "@/components/ui/input";

/**
 * Home hero search field.
 *
 * Presentational entry point only: it submits a native GET to `/search`, so it
 * works without JavaScript and holds no token and makes no fetch. The real
 * results page is a separate task; until then this navigation 404s.
 *
 * The field is taller than the 44px design-system input, so it composes the
 * shared `Icon` / `Kbd` parts directly rather than reusing `Input` (whose fixed
 * `h-11` would collide under the dependency-free `cn()` joiner).
 */
export interface HomeSearchProps {
  placeholder?: string;
  className?: string;
}

export function HomeSearch({
  placeholder = "Ask anything about your learning...",
  className,
}: HomeSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <form
      method="get"
      action="/search"
      role="search"
      className={cn(
        "flex h-16 w-full items-center gap-3 rounded-[16px] border border-neutral-200 bg-surface px-5 shadow-sm",
        "transition-colors focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-100",
        className,
      )}
    >
      <span className="grid place-items-center text-neutral-400">
        <Icon name="search" size={20} />
      </span>
      <input
        ref={inputRef}
        type="search"
        name="q"
        aria-label="Search your learning"
        placeholder={placeholder}
        className="h-full w-full bg-transparent text-[16px] text-neutral-900 outline-none placeholder:text-neutral-400"
      />
      <Kbd>⌘ K</Kbd>
    </form>
  );
}
