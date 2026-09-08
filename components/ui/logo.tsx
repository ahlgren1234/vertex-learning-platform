import { cn } from "@/lib/cn";

/**
 * Vertex brand lockup — the angular "V" vertex mark plus the wordmark.
 */
export interface LogoProps {
  /** hide the wordmark and render the mark only */
  markOnly?: boolean;
  className?: string;
}

export function Logo({ markOnly = false, className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        viewBox="0 0 24 24"
        width={24}
        height={24}
        aria-hidden="true"
        className="text-primary-500"
      >
        <path
          d="M2 3h5.4l4.6 10.2L16.6 3H22L14.3 20a2.5 2.5 0 0 1-4.6 0L2 3Z"
          fill="currentColor"
        />
      </svg>
      {markOnly ? (
        <span className="sr-only">Vertex</span>
      ) : (
        <span className="text-[20px] font-semibold tracking-tight text-neutral-900">
          Vertex
        </span>
      )}
    </span>
  );
}
