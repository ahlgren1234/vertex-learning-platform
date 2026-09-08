import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/ui/icon";

/**
 * Status / indicator — section 10 of the design system.
 */
export type Status = "in-progress" | "completed" | "now-playing" | "locked";

const CONFIG: Record<
  Status,
  { label: string; icon: IconName; variant: "outline" | "filled"; color: string }
> = {
  "in-progress": {
    label: "In Progress",
    icon: "loader",
    variant: "outline",
    color: "text-primary-500",
  },
  completed: {
    label: "Completed",
    icon: "check-circle",
    variant: "outline",
    color: "text-success-500",
  },
  "now-playing": {
    label: "Now Playing",
    icon: "play-circle",
    variant: "filled",
    color: "text-primary-500",
  },
  locked: {
    label: "Locked",
    icon: "lock",
    variant: "outline",
    color: "text-neutral-500",
  },
};

export interface StatusIndicatorProps {
  status: Status;
  /** override the default label */
  label?: string;
  className?: string;
}

export function StatusIndicator({
  status,
  label,
  className,
}: StatusIndicatorProps) {
  const cfg = CONFIG[status];

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Icon
        name={cfg.icon}
        variant={cfg.variant}
        size={18}
        className={cfg.color}
      />
      <span className="text-[14px] font-medium text-neutral-900">
        {label ?? cfg.label}
      </span>
    </span>
  );
}
