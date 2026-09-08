import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/icon";

/**
 * Pagination — section 13 of the design system.
 * Presentational: pass `onPageChange` to make it interactive from a Client
 * Component, or `getHref` to render anchor links instead.
 */
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  /** how many page numbers to show around the current page */
  siblingCount?: number;
  onPageChange?: (page: number) => void;
  getHref?: (page: number) => string;
  className?: string;
}

const DOTS = "dots";
const CELL_BASE =
  "grid h-9 min-w-9 place-items-center rounded-[12px] px-2 text-[14px] transition-colors";

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function buildPages(
  current: number,
  total: number,
  siblings: number,
): (number | typeof DOTS)[] {
  const totalNumbers = siblings * 2 + 5; // first, last, current, 2*siblings, 2*dots
  if (total <= totalNumbers) return range(1, total);

  const left = Math.max(current - siblings, 1);
  const right = Math.min(current + siblings, total);
  const showLeftDots = left > 2;
  const showRightDots = right < total - 1;

  if (!showLeftDots && showRightDots) {
    return [...range(1, 3 + siblings * 2), DOTS, total];
  }
  if (showLeftDots && !showRightDots) {
    return [1, DOTS, ...range(total - (3 + siblings * 2) + 1, total)];
  }
  return [1, DOTS, ...range(left, right), DOTS, total];
}

interface CellProps {
  page: number;
  children: ReactNode;
  ariaLabel?: string;
  active?: boolean;
  disabled?: boolean;
  onPageChange?: (page: number) => void;
  getHref?: (page: number) => string;
}

function PageCell({
  page,
  children,
  ariaLabel,
  active,
  disabled,
  onPageChange,
  getHref,
}: CellProps) {
  const classes = cn(
    CELL_BASE,
    active
      ? "border border-primary-400 font-semibold text-primary-500"
      : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900",
    disabled && "pointer-events-none opacity-40",
  );

  if (getHref && !disabled) {
    return (
      <a href={getHref(page)} aria-label={ariaLabel} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={active ? "page" : undefined}
      onClick={onPageChange ? () => onPageChange(page) : undefined}
      className={classes}
    >
      {children}
    </button>
  );
}

export function Pagination({
  currentPage,
  totalPages,
  siblingCount = 1,
  onPageChange,
  getHref,
  className,
}: PaginationProps) {
  const pages = buildPages(currentPage, totalPages, siblingCount);

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center gap-1", className)}
    >
      <PageCell
        page={currentPage - 1}
        disabled={currentPage <= 1}
        ariaLabel="Previous page"
        onPageChange={onPageChange}
        getHref={getHref}
      >
        <Icon name="chevron-left" size={16} />
      </PageCell>

      {pages.map((p, i) =>
        p === DOTS ? (
          <span
            key={`dots-${i}`}
            className="grid h-9 min-w-9 place-items-center text-neutral-400"
          >
            …
          </span>
        ) : (
          <PageCell
            key={p}
            page={p}
            active={p === currentPage}
            ariaLabel={`Page ${p}`}
            onPageChange={onPageChange}
            getHref={getHref}
          >
            {p}
          </PageCell>
        ),
      )}

      <PageCell
        page={currentPage + 1}
        disabled={currentPage >= totalPages}
        ariaLabel="Next page"
        onPageChange={onPageChange}
        getHref={getHref}
      >
        <Icon name="chevron-right" size={16} />
      </PageCell>
    </nav>
  );
}
