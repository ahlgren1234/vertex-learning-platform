import type { SVGProps } from "react";
import { cn } from "@/lib/cn";

/**
 * Vertex icon set — section 06 of the design system.
 *
 * Specs:
 *  - 24 x 24 grid
 *  - 2px stroke width (outline)
 *  - Rounded line caps / joins
 *  - Consistent optical balance
 */
export type IconName =
  | "bell"
  | "search"
  | "play-circle"
  | "file"
  | "bookmark"
  | "bar-chart"
  | "clock"
  | "user"
  | "chevron-right"
  | "chevron-left"
  | "chevron-down"
  | "arrow-right"
  | "star"
  | "external-link"
  | "check-circle"
  | "lock"
  | "loader"
  | "eye"
  | "grid"
  | "target"
  | "accessibility"
  | "folder";

type IconVariant = "outline" | "filled";

const OUTLINE: Record<IconName, React.ReactNode> = {
  bell: (
    <>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  "play-circle": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m10 8 6 4-6 4V8Z" />
    </>
  ),
  file: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3v5h5" />
    </>
  ),
  bookmark: <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z" />,
  "bar-chart": (
    <>
      <path d="M5 20V10" />
      <path d="M12 20V4" />
      <path d="M19 20v-7" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </>
  ),
  "chevron-right": <path d="m9 6 6 6-6 6" />,
  "chevron-left": <path d="m15 6-6 6 6 6" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  "arrow-right": (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  star: (
    <path d="m12 3 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8L12 3Z" />
  ),
  "external-link": (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4 10 14" />
      <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </>
  ),
  "check-circle": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  loader: (
    <>
      <path d="M12 3a9 9 0 1 0 9 9" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  accessibility: (
    <>
      <circle cx="12" cy="4.5" r="1.6" />
      <path d="M4 8h16" />
      <path d="M12 8v6" />
      <path d="m8 21 4-7 4 7" />
    </>
  ),
  folder: (
    <path d="M4 7a2 2 0 0 1 2-2h3.2a2 2 0 0 1 1.4.6L12 7h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z" />
  ),
};

const FILLED: Partial<Record<IconName, React.ReactNode>> = {
  bell: (
    <path d="M12 2a6 6 0 0 0-6 6c0 5-2.5 7.3-2.9 7.7A1 1 0 0 0 4 17h16a1 1 0 0 0 .7-1.7C20.4 15 18 12.7 18 8a6 6 0 0 0-6-6Zm-2 17a2 2 0 0 0 4 0Z" />
  ),
  "play-circle": (
    <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-2 4.7a.8.8 0 0 1 1.2-.7l4.6 3a.8.8 0 0 1 0 1.4l-4.6 3A.8.8 0 0 1 10 16.3Z" />
  ),
  file: (
    <path d="M13 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-6-6Zm0 2 4.5 4.5H13Z" />
  ),
  bookmark: <path d="M6 2h12a1 1 0 0 1 1 1v18.1a.8.8 0 0 1-1.2.7L12 18.5l-5.8 3.3A.8.8 0 0 1 5 21.1V3a1 1 0 0 1 1-1Z" />,
  "bar-chart": (
    <path d="M4 9h3a1 1 0 0 1 1 1v10H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Zm6.5-6h3a1 1 0 0 1 1 1v16h-5V4a1 1 0 0 1 1-1ZM17 12h3a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-4v-7a1 1 0 0 1 1-1Z" />
  ),
  clock: (
    <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm1 4a1 1 0 1 0-2 0v5c0 .3.1.6.3.75l3 2.4a1 1 0 0 0 1.4-1.55L13 11.5Z" />
  ),
  user: (
    <path d="M12 3a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm0 11c-4.4 0-8 3.1-8 7 0 .6.4 1 1 1h14c.6 0 1-.4 1-1 0-3.9-3.6-7-8-7Z" />
  ),
  "check-circle": (
    <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm4.7 6.3-5.9 6.6a1 1 0 0 1-1.5 0l-2.9-3a1 1 0 0 1 1.4-1.4l2.2 2.2 5.2-5.8a1 1 0 0 1 1.5 1.4Z" />
  ),
  lock: (
    <path d="M12 2a5 5 0 0 0-5 5v2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm-3 7V7a3 3 0 0 1 6 0v2Z" />
  ),
  search: (
    <path d="M11 3a8 8 0 1 0 4.9 14.3l3.4 3.4a1 1 0 0 0 1.4-1.4l-3.4-3.4A8 8 0 0 0 11 3Zm0 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" />
  ),
};

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  variant?: IconVariant;
  /** pixel size for width and height; defaults to 24 */
  size?: number;
}

export function Icon({
  name,
  variant = "outline",
  size = 24,
  className,
  ...props
}: IconProps) {
  const filled = variant === "filled" && FILLED[name] != null;

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      role="img"
      aria-hidden="true"
      className={cn("shrink-0", name === "loader" && "animate-spin", className)}
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={filled ? undefined : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {filled ? FILLED[name] : OUTLINE[name]}
    </svg>
  );
}
