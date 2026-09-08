/**
 * Placeholder home-page content.
 *
 * The home page is read-only and, per AGENTS.md §7, "displays stored data". The
 * content model and the server-side Sanity fetch are separate tasks, so this
 * module is the seam that a later task replaces with a real query. Nothing here
 * is user-editable and nothing is fetched — these are static strings sized to the
 * `design/vertex-home.png` reference.
 */

export const heroContent = {
  eyebrow: "Intelligent Learning",
  title: "Search your learning in plain English.",
  subtitle:
    "Vertex understands what you want to learn and finds the exact lessons across all your courses.",
  ctaLabel: "Explore Courses",
  ctaHref: "/courses",
  searchPlaceholder: "Ask anything about your learning...",
} as const;

export const allCoursesSection = {
  title: "All Courses",
  viewAllLabel: "View all courses",
  viewAllHref: "/courses",
  footnote: "New courses and lessons added every week.",
} as const;

/** Which inline brand mark a course card renders in its tile. */
export type CourseBrand = "next" | "docker" | "typescript";

export interface FeaturedCourse {
  title: string;
  description: string;
  level: string;
  duration: string;
  modules: string;
  brand: CourseBrand;
}

export const featuredCourses: FeaturedCourse[] = [
  {
    title: "Next.js for Production",
    description:
      "Build scalable, high-performance web applications with Next.js.",
    level: "Intermediate",
    duration: "18h 24m",
    modules: "12 modules",
    brand: "next",
  },
  {
    title: "Docker Essentials",
    description:
      "Containerize applications and streamline your development workflow.",
    level: "Beginner",
    duration: "10h 12m",
    modules: "8 modules",
    brand: "docker",
  },
  {
    title: "TypeScript Deep Dive",
    description:
      "Go beyond the basics and write safer, more expressive code.",
    level: "Intermediate",
    duration: "14h 36m",
    modules: "10 modules",
    brand: "typescript",
  },
];
