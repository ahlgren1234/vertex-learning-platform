import type { HTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";

/* =====================================================================
   Card primitive — section 12 of the design system.
   ===================================================================== */
export function Card({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-[16px] border border-neutral-200 bg-surface p-5 shadow-sm",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function MetaItem({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[13px] text-neutral-500">
      <span className="text-neutral-400">{icon}</span>
      {children}
    </span>
  );
}

/* =====================================================================
   Course card
   ===================================================================== */
export interface CourseCardProps {
  title: string;
  description: string;
  level: string;
  duration: string;
  modules: string;
  icon?: ReactNode;
  className?: string;
}

export function CourseCard({
  title,
  description,
  level,
  duration,
  modules,
  icon,
  className,
}: CourseCardProps) {
  return (
    <Card className={className}>
      <div className="flex items-start gap-4">
        <div className="grid size-12 shrink-0 place-items-center rounded-[12px] bg-neutral-900 text-[18px] font-semibold text-white">
          {icon ?? "N"}
        </div>
        <div className="min-w-0">
          <h3 className="text-heading-3 font-semibold text-neutral-900">
            {title}
          </h3>
          <p className="mt-1 text-[14px] leading-5 text-neutral-500">
            {description}
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
        <MetaItem icon={<Icon name="bar-chart" size={16} />}>{level}</MetaItem>
        <MetaItem icon={<Icon name="clock" size={16} />}>{duration}</MetaItem>
        <MetaItem icon={<Icon name="folder" size={16} />}>{modules}</MetaItem>
      </div>
    </Card>
  );
}

/* =====================================================================
   Lesson card — video & lesson variants
   ===================================================================== */
export interface LessonCardProps {
  variant: "video" | "lesson";
  title: string;
  description: string;
  /** left-aligned footer text, e.g. "Lesson 5.1 · 12:45" or "Module 5" */
  meta: string;
  /** right-aligned call to action label */
  actionLabel: string;
  actionHref?: string;
  className?: string;
}

export function LessonCard({
  variant,
  title,
  description,
  meta,
  actionLabel,
  actionHref = "#",
  className,
}: LessonCardProps) {
  const actionIcon =
    variant === "video" ? (
      <Icon name="play-circle" variant="filled" size={16} />
    ) : (
      <Icon name="external-link" size={16} />
    );

  return (
    <Card className={className}>
      <Badge variant={variant === "video" ? "video" : "lesson"}>
        {variant === "video" ? "Video" : "Lesson"}
      </Badge>
      <h3 className="mt-3 text-heading-2 font-semibold text-neutral-900">
        {title}
      </h3>
      <p className="mt-2 text-[14px] leading-5 text-neutral-500">
        {description}
      </p>
      <div className="mt-6 flex items-center justify-between gap-3">
        <span className="text-[13px] text-neutral-500">{meta}</span>
        <Link
          href={actionHref}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary-500 transition-colors hover:text-primary-600"
        >
          {actionLabel}
          {actionIcon}
        </Link>
      </div>
    </Card>
  );
}

/* =====================================================================
   Resource card
   ===================================================================== */
export interface ResourceCardProps {
  title: string;
  description: string;
  fileType?: string;
  fileSize?: string;
  href?: string;
  className?: string;
}

export function ResourceCard({
  title,
  description,
  fileType = "PDF",
  fileSize = "1.2 MB",
  href = "#",
  className,
}: ResourceCardProps) {
  return (
    <Card className={className}>
      <div className="flex items-start gap-4">
        <span className="text-neutral-400">
          <Icon name="file" size={28} />
        </span>
        <div className="min-w-0">
          <h3 className="text-heading-3 font-semibold text-neutral-900">
            {title}
          </h3>
          <p className="mt-1 text-[14px] leading-5 text-neutral-500">
            {description}
          </p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-[13px] text-neutral-500">
          {fileType} · {fileSize}
        </span>
        <Link
          href={href}
          aria-label={`Open ${title}`}
          className="text-primary-500 transition-colors hover:text-primary-600"
        >
          <Icon name="external-link" size={18} />
        </Link>
      </div>
    </Card>
  );
}
