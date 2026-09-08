import Link from "next/link";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/ui/logo";

/**
 * Primary navigation bar — section 13 of the design system.
 */
export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface NavbarProps {
  items: NavItem[];
  className?: string;
}

export function Navbar({ items, className }: NavbarProps) {
  return (
    <nav
      className={cn(
        "flex items-center gap-8 rounded-[16px] border border-neutral-200 bg-surface px-5 py-3",
        className,
      )}
    >
      <Link href="/" aria-label="Vertex home">
        <Logo />
      </Link>
      <ul className="flex items-center gap-6 text-[14px] font-medium">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={cn(
                "transition-colors",
                item.active
                  ? "text-primary-500"
                  : "text-neutral-500 hover:text-neutral-900",
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
