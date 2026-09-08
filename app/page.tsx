import type { ReactNode } from "react";
import Link from "next/link";
import {
  CourseCard,
  HomeSearch,
  Icon,
  SiteHeader,
} from "@/components/ui";
import type { CourseBrand } from "@/lib/placeholder-content";
import {
  allCoursesSection,
  featuredCourses,
  heroContent,
} from "@/lib/placeholder-content";

/* ---------------------------------------------------------------------
   Brand marks for the course tiles. Local to the home page — not part of
   the design-system icon set.
   ------------------------------------------------------------------- */
const BRAND_TILE: Record<
  CourseBrand,
  { className: string; mark: ReactNode }
> = {
  next: {
    className: "bg-neutral-900 text-white",
    mark: <span className="text-[20px] font-bold">N</span>,
  },
  docker: {
    className: "bg-[#e8f4fc] text-[#2496ED]",
    mark: (
      <svg
        viewBox="0 0 24 24"
        width="30"
        height="30"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M8.6 8.9h2v2h-2zM11.1 8.9h2v2h-2zM13.6 8.9h2v2h-2zM11.1 6.5h2v2h-2zM13.6 6.5h2v2h-2z" />
        <path d="M22.4 10.6c-.44-.3-1.5-.42-2.32-.24-.1-.83-.55-1.55-1.28-2.2l-.42-.32-.3.42c-.53.63-.72 1.7-.5 2.5.1.42.32.83.63 1.15-.5.3-1.45.63-2.7.63H1.7c-.24 1.4.1 3.05 1.15 4.4 1.13 1.45 2.9 2.2 5.24 2.2 5 0 8.75-2.32 10.5-6.55.72.02 2.25.02 3.03-1.5.05-.1.2-.4.42-1.28l.12-.4z" />
      </svg>
    ),
  },
  typescript: {
    className: "bg-[#3178c6] text-white",
    mark: <span className="text-[15px] font-bold tracking-tight">TS</span>,
  },
};

/* Decorative closing "equalizer" — heights are fixed, purely visual. */
const EQUALIZER_BARS = [
  38, 55, 72, 90, 68, 44, 30, 34, 52, 78, 96, 82, 60, 46, 70, 40,
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="overflow-x-clip">
        {/* Hero ------------------------------------------------------ */}
        <section className="mx-auto max-w-2xl px-6 pt-16 pb-16 text-center">
          <span className="inline-flex items-center rounded-full border border-neutral-200 bg-surface px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.14em] text-primary-500">
            {heroContent.eyebrow}
          </span>

          <h1 className="mt-6 text-balance font-display text-[28px] font-bold leading-[1.12] tracking-[-0.02em] text-neutral-900 sm:text-[40px] sm:leading-[1.08] lg:text-[54px]">
            {heroContent.title}
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-pretty text-[17px] leading-7 text-neutral-500">
            {heroContent.subtitle}
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href={heroContent.ctaHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[12px] bg-primary-500 px-6 text-[16px] font-medium text-white transition-colors hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            >
              {heroContent.ctaLabel}
              <Icon name="arrow-right" size={18} />
            </Link>
          </div>

          <HomeSearch
            placeholder={heroContent.searchPlaceholder}
            className="mt-8"
          />
        </section>

        <div className="border-t border-neutral-200" />

        {/* All Courses --------------------------------------------- */}
        <section className="mx-auto max-w-[1440px] px-6 py-16 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-display text-[32px] font-bold tracking-[-0.01em] text-neutral-900">
              {allCoursesSection.title}
            </h2>
            <Link
              href={allCoursesSection.viewAllHref}
              className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary-500 transition-colors hover:text-primary-600"
            >
              {allCoursesSection.viewAllLabel}
              <Icon name="arrow-right" size={16} />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course) => (
              <CourseCard
                key={course.title}
                layout="stacked"
                title={course.title}
                description={course.description}
                level={course.level}
                duration={course.duration}
                modules={course.modules}
                icon={BRAND_TILE[course.brand].mark}
                iconClassName={BRAND_TILE[course.brand].className}
              />
            ))}
          </div>
        </section>

        {/* Closing band ------------------------------------------- */}
        <section className="pb-0">
          <p className="mx-auto flex max-w-[1440px] items-center justify-center gap-2 px-6 text-center text-[14px] text-neutral-500 lg:px-8">
            <Icon name="star" size={16} className="text-primary-500" />
            {allCoursesSection.footnote}
          </p>

          <div
            aria-hidden="true"
            className="pointer-events-none mx-auto mt-10 flex h-72 w-full max-w-[1440px] items-end justify-center gap-2 overflow-hidden px-6 sm:gap-3 lg:px-8 [mask-image:linear-gradient(to_bottom,black_20%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black_20%,transparent)]"
          >
            {EQUALIZER_BARS.map((height, i) => (
              <div
                key={i}
                style={{ height: `${height}%` }}
                className="w-full max-w-[3.25rem] flex-1 rounded-t-[6px] bg-gradient-to-b from-primary-400 via-primary-300 to-primary-100"
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
