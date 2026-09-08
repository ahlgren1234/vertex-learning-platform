import { cn } from "@/lib/cn";

/**
 * Progress bar — section 11 of the design system.
 */
export interface ProgressBarProps {
  /** completion percentage, 0–100 */
  value: number;
  /** show the "NN% complete" label to the right of the track */
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  showLabel = false,
  className,
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2 w-full overflow-hidden rounded-full bg-neutral-100"
      >
        <div
          className="h-full rounded-full bg-primary-500 transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel ? (
        <span className="shrink-0 text-[13px] text-neutral-500">
          <span className="font-semibold text-neutral-900">{pct}%</span> complete
        </span>
      ) : null}
    </div>
  );
}
