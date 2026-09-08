import Link from "next/link";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/icon";
import { Logo } from "@/components/ui/logo";

/**
 * Site header — the real application chrome shown across the top-level pages
 * (home, catalog, My Learning, lesson). Unlike the design-system `Navbar`
 * primitive it is not a bordered card: it sits directly on the canvas with a
 * single hairline along the bottom.
 *
 * The notifications bell is presentational (AGENTS.md §7). The avatar is a
 * placeholder until Clerk is wired.
 */
export interface SiteHeaderNavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface SiteHeaderProps {
  items?: SiteHeaderNavItem[];
  className?: string;
}

const DEFAULT_ITEMS: SiteHeaderNavItem[] = [
  { label: "Courses", href: "/courses" },
  { label: "My Learning", href: "/my-learning" },
];

export function SiteHeader({ items = DEFAULT_ITEMS, className }: SiteHeaderProps) {
  return (
    <header className={cn("border-b border-neutral-200", className)}>
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-4 px-6 sm:gap-8 lg:px-8">
        <Link href="/" aria-label="Vertex home" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="shrink-0">
          <ul className="flex items-center gap-4 text-[14px] font-medium sm:gap-6">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  className={cn(
                    "transition-colors",
                    item.active
                      ? "text-primary-500"
                      : "text-neutral-900 hover:text-primary-500",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-4">
          <button
            type="button"
            aria-label="Notifications"
            className="grid size-9 place-items-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
          >
            <Icon name="bell" size={20} />
          </button>
          <span
            aria-label="Your account"
            className="grid size-9 place-items-center overflow-hidden rounded-full bg-neutral-200 text-neutral-400 ring-1 ring-neutral-300"
          >
            <Icon name="user" variant="filled" size={20} />
          </span>
        </div>
      </div>
    </header>
  );
}
