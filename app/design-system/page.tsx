import { Fragment, type ReactNode } from "react";
import {
  Badge,
  Breadcrumbs,
  Button,
  CourseCard,
  Icon,
  type IconName,
  LessonCard,
  Logo,
  Navbar,
  Pagination,
  ProgressBar,
  ResourceCard,
  SearchInput,
  Select,
  StatusIndicator,
} from "@/components/ui";

/* ---------------------------------------------------------------------
   Local layout helpers for the reference sheet
   ------------------------------------------------------------------- */
function Section({
  number,
  title,
  children,
  className,
}: {
  number: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[16px] border border-neutral-200 bg-surface p-6 shadow-sm ${className ?? ""}`}
    >
      <header className="mb-5 flex items-center gap-3">
        <span className="text-[13px] font-bold text-primary-500">{number}</span>
        <h2 className="eyebrow">{title}</h2>
      </header>
      {children}
    </section>
  );
}

function Swatch({
  name,
  hex,
  border,
}: {
  name: string;
  hex: string;
  border?: boolean;
}) {
  return (
    <div>
      <div
        className={`h-20 rounded-[12px] ${border ? "border border-neutral-200" : ""}`}
        style={{ background: hex }}
      />
      <p className="mt-2 text-[13px] font-medium text-neutral-900">{name}</p>
      <p className="text-[12px] uppercase text-neutral-500">{hex}</p>
    </div>
  );
}

const PRIMARY = [
  ["Primary 500", "#F97316"],
  ["Primary 400", "#FB923C"],
  ["Primary 300", "#FDBA74"],
  ["Primary 200", "#FED7AA"],
  ["Primary 100", "#FFEEE5"],
];

const NEUTRAL = [
  ["Neutral 900", "#0F172A"],
  ["Neutral 700", "#334155"],
  ["Neutral 500", "#64748B"],
  ["Neutral 300", "#CBD5E1"],
  ["Neutral 200", "#E2E8F0"],
  ["Neutral 100", "#F1F5F9"],
  ["Neutral 50", "#FAFAFC"],
  ["White", "#FFFFFF"],
];

const TYPE_SCALE = [
  ["Display 1", "Playfair Display", "48 / 56", "Bold", "Page titles", "text-display-1"],
  ["Display 2", "Playfair Display", "36 / 44", "Bold", "Section titles", "text-display-2"],
  ["Heading 1", "Inter", "28 / 36", "Semi Bold", "Card titles", "text-heading-1"],
  ["Heading 2", "Inter", "22 / 30", "Semi Bold", "Sub section", "text-heading-2"],
  ["Heading 3", "Inter", "18 / 26", "Medium", "Small titles", "text-heading-3"],
  ["Body Large", "Inter", "16 / 24", "Regular", "Body copy", "text-body-lg"],
  ["Body", "Inter", "14 / 20", "Regular", "Supporting text", "text-body"],
  ["Small", "Inter", "12 / 16", "Regular", "Captions, meta", "text-small"],
];

const SPACING = [
  ["4", "0.25rem", 4],
  ["8", "0.5rem", 8],
  ["12", "0.75rem", 12],
  ["16", "1rem", 16],
  ["24", "1.5rem", 24],
  ["32", "2rem", 32],
  ["40", "2.5rem", 40],
  ["48", "3rem", 48],
  ["64", "4rem", 64],
] as const;

const RADII = [
  ["4px", "xs", "rounded-[4px]"],
  ["8px", "sm", "rounded-[8px]"],
  ["12px", "md", "rounded-[12px]"],
  ["16px", "lg", "rounded-[16px]"],
  ["24px", "xl", "rounded-[24px]"],
  ["Full", "circle", "rounded-full"],
];

const SHADOWS = [
  ["Sm", "0 1px 2px 0", "rgba(15, 23, 42, 0.05)", "shadow-sm"],
  ["Md", "0 4px 12px -2px", "rgba(15, 23, 42, 0.08)", "shadow-md"],
  ["Lg", "0 12px 24px -4px", "rgba(15, 23, 42, 0.10)", "shadow-lg"],
  ["Xl", "0 20px 40px -8px", "rgba(15, 23, 42, 0.12)", "shadow-xl"],
];

const ICON_ROW: IconName[] = [
  "bell",
  "search",
  "play-circle",
  "file",
  "bookmark",
  "bar-chart",
  "clock",
  "user",
  "chevron-right",
];

const BUTTON_STATES: {
  label: string;
  disabled?: boolean;
  /** per-variant class overrides used to freeze the hover appearance */
  hover?: Record<"primary" | "secondary" | "tertiary" | "text", string>;
}[] = [
  { label: "Default" },
  {
    label: "Hover",
    hover: {
      primary: "!bg-primary-600",
      secondary: "!bg-primary-100",
      tertiary: "!bg-neutral-100",
      text: "!text-primary-600",
    },
  },
  { label: "Disabled", disabled: true },
];

const PRINCIPLES: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "eye",
    title: "Clarity First",
    body: "Every element should communicate clearly.",
  },
  {
    icon: "grid",
    title: "Consistency",
    body: "Use components and patterns consistently across the platform.",
  },
  {
    icon: "target",
    title: "Focus & Calm",
    body: "Remove noise and help learners focus on what matters.",
  },
  {
    icon: "accessibility",
    title: "Accessible",
    body: "Design with accessibility and inclusivity in mind.",
  },
];

/* ---------------------------------------------------------------------
   Page
   ------------------------------------------------------------------- */
export default function DesignSystemPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-12 md:px-8">
      {/* Header ---------------------------------------------------- */}
      <header className="rounded-[16px] border border-neutral-200 bg-surface p-8 shadow-sm md:p-10">
        <Logo />
        <h1 className="text-display-1 mt-6 text-neutral-900">Design System</h1>
        <p className="text-body-lg mt-4 max-w-md text-neutral-500">
          A unified design language for the Vertex learning platform. Clean,
          modern and focused on clarity, consistency and intuitive learning
          experiences.
        </p>
        <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
          Version 1.0 &nbsp;•&nbsp; May 2025
        </p>
      </header>

      <div className="mt-6 flex flex-col gap-6">
        {/* 01 Colors -------------------------------------------- */}
        <Section number="01" title="Colors">
          <h3 className="mb-3 text-heading-3 font-semibold text-neutral-900">
            Primary
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {PRIMARY.map(([name, hex]) => (
              <Swatch key={name} name={name} hex={hex} />
            ))}
          </div>
          <h3 className="mb-3 mt-8 text-heading-3 font-semibold text-neutral-900">
            Neutral
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-8">
            {NEUTRAL.map(([name, hex]) => (
              <Swatch
                key={name}
                name={name}
                hex={hex}
                border={name === "White" || name === "Neutral 50"}
              />
            ))}
          </div>
        </Section>

        {/* 02 + 03 Typography --------------------------------- */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Section number="02" title="Typography">
            <div className="flex items-center gap-6">
              <span className="text-display-1 text-[64px] leading-none text-neutral-900">
                Ag
              </span>
              <div>
                <p className="text-heading-2 text-neutral-900">
                  Playfair Display
                </p>
                <p className="mt-1 text-[14px] text-neutral-500">
                  Elegant &nbsp;•&nbsp; Readable &nbsp;•&nbsp; Timeless
                </p>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-6">
              <span className="font-sans text-[64px] font-semibold leading-none text-neutral-900">
                Ag
              </span>
              <div>
                <p className="text-heading-2 text-neutral-900">Inter</p>
                <p className="mt-1 text-[14px] text-neutral-500">
                  Clean &nbsp;•&nbsp; Modern &nbsp;•&nbsp; Highly legible
                </p>
              </div>
            </div>
          </Section>

          <Section number="03" title="Type Scale">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="text-[12px] uppercase tracking-[0.08em] text-neutral-500">
                    <th className="pb-3 pr-4 font-semibold">Style</th>
                    <th className="pb-3 pr-4 font-semibold">Font</th>
                    <th className="pb-3 pr-4 font-semibold">Size / LH</th>
                    <th className="pb-3 pr-4 font-semibold">Weight</th>
                    <th className="pb-3 font-semibold">Use</th>
                  </tr>
                </thead>
                <tbody className="text-[13px] text-neutral-500">
                  {TYPE_SCALE.map(([style, font, size, weight, use, cls]) => (
                    <tr key={style} className="border-t border-neutral-100">
                      <td className="py-2.5 pr-4">
                        <span className={`${cls} text-[15px] text-neutral-900`}>
                          {style}
                        </span>
                      </td>
                      <td className="py-2.5 pr-4">{font}</td>
                      <td className="py-2.5 pr-4">{size}</td>
                      <td className="py-2.5 pr-4">{weight}</td>
                      <td className="py-2.5">{use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        </div>

        {/* 04 + 05 Spacing / Radius & Shadows ---------------- */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Section number="04" title="Spacing System">
            <p className="mb-6 text-[14px] text-neutral-500">Base unit: 4px</p>
            <div className="flex flex-wrap items-end gap-5">
              {SPACING.map(([label, rem, px]) => (
                <div key={label} className="text-center">
                  <div
                    className="mx-auto rounded-[6px] bg-primary-200"
                    style={{ width: px, height: px }}
                  />
                  <p className="mt-3 text-[13px] font-medium text-neutral-900">
                    {label}
                  </p>
                  <p className="text-[11px] text-neutral-500">({rem})</p>
                </div>
              ))}
            </div>
          </Section>

          <Section number="05" title="Radius & Shadows">
            <h3 className="mb-3 text-heading-3 font-semibold text-neutral-900">
              Radius
            </h3>
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
              {RADII.map(([px, name, cls]) => (
                <div key={name} className="text-center">
                  <div
                    className={`mx-auto size-14 border-2 border-neutral-300 bg-surface ${cls}`}
                  />
                  <p className="mt-2 text-[13px] font-medium text-neutral-900">
                    {px}
                  </p>
                  <p className="text-[11px] text-neutral-500">({name})</p>
                </div>
              ))}
            </div>
            <h3 className="mb-4 mt-8 text-heading-3 font-semibold text-neutral-900">
              Shadows
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {SHADOWS.map(([name, offset, rgba, cls]) => (
                <div
                  key={name}
                  className={`rounded-[12px] bg-surface p-4 ${cls}`}
                >
                  <p className="text-[14px] font-semibold text-neutral-900">
                    {name}
                  </p>
                  <p className="mt-2 text-[11px] leading-4 text-neutral-500">
                    {offset}
                    <br />
                    {rgba}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* 06 / 07 / 08 -------------------------------------- */}
        <div className="grid gap-6 lg:grid-cols-4">
          <Section number="06" title="Icons">
            <p className="mb-3 text-[14px] font-medium text-neutral-900">
              Outline Style
            </p>
            <div className="flex flex-wrap gap-3 text-neutral-900">
              {ICON_ROW.map((n) => (
                <Icon key={n} name={n} />
              ))}
            </div>
            <p className="mb-3 mt-6 text-[14px] font-medium text-neutral-900">
              Filled Style
            </p>
            <div className="flex flex-wrap gap-3 text-neutral-900">
              {ICON_ROW.map((n) => (
                <Icon key={n} name={n} variant="filled" />
              ))}
            </div>
            <p className="mb-2 mt-6 text-[14px] font-medium text-neutral-900">
              Icon Specs
            </p>
            <ul className="list-disc space-y-1 pl-5 text-[13px] text-neutral-500">
              <li>24x24px grid</li>
              <li>2px stroke width (outline)</li>
              <li>Rounded line caps</li>
              <li>Consistent optical balance</li>
            </ul>
          </Section>

          <Section number="07" title="Buttons" className="lg:col-span-2">
            <div className="overflow-x-auto">
              <div className="grid min-w-[600px] grid-cols-[64px_repeat(4,1fr)] items-center gap-x-3 gap-y-4">
                <span />
                {["Primary", "Secondary", "Tertiary", "Text"].map((v) => (
                  <span key={v} className="text-[12px] text-neutral-500">
                    {v}
                  </span>
                ))}

                {BUTTON_STATES.map(({ label, disabled, hover }) => (
                  <Fragment key={label}>
                    <span className="text-[12px] text-neutral-500">{label}</span>
                    <div>
                      <Button
                        variant="primary"
                        size="md"
                        disabled={disabled}
                        className={hover?.primary}
                      >
                        Get Started
                      </Button>
                    </div>
                    <div>
                      <Button
                        variant="secondary"
                        size="md"
                        disabled={disabled}
                        className={hover?.secondary}
                      >
                        Explore Courses
                      </Button>
                    </div>
                    <div>
                      <Button
                        variant="tertiary"
                        size="md"
                        disabled={disabled}
                        className={hover?.tertiary}
                        iconRight={<Icon name="external-link" size={16} />}
                      >
                        View Lesson
                      </Button>
                    </div>
                    <div>
                      <Button
                        variant="text"
                        size="md"
                        disabled={disabled}
                        className={hover?.text}
                        iconRight={
                          <Icon name="play-circle" variant="filled" size={16} />
                        }
                      >
                        Watch Video
                      </Button>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
            <p className="mb-2 mt-6 text-[14px] font-medium text-neutral-900">
              Button Specs
            </p>
            <ul className="list-disc space-y-1 pl-5 text-[13px] text-neutral-500">
              <li>Height: 44px (default)</li>
              <li>Padding: 0 16px (lg), 0 12px (md)</li>
              <li>Radius: 12px</li>
              <li>Font: Inter Medium (14–16px)</li>
            </ul>
          </Section>

          <Section number="08" title="Inputs">
            <p className="mb-2 text-[14px] font-medium text-neutral-900">
              Search / Text Input
            </p>
            <SearchInput />
            <p className="mb-2 mt-6 text-[14px] font-medium text-neutral-900">
              Select
            </p>
            <Select defaultValue="relevant">
              <option value="relevant">Most Relevant</option>
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
            </Select>
            <p className="mb-2 mt-6 text-[14px] font-medium text-neutral-900">
              Field Specs
            </p>
            <ul className="list-disc space-y-1 pl-5 text-[13px] text-neutral-500">
              <li>Height: 44px</li>
              <li>Radius: 12px</li>
              <li>Border: 1px solid #E2E8F0</li>
              <li>Padding: 0 16px</li>
              <li>Focus: Border color #FB923C</li>
            </ul>
          </Section>
        </div>

        {/* 09 / 10 / 11 ------------------------------------- */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Section number="09" title="Badges / Tags">
            <div className="flex flex-wrap items-start gap-8">
              <div>
                <p className="mb-2 text-[13px] text-neutral-500">Video</p>
                <Badge variant="video">Video</Badge>
              </div>
              <div>
                <p className="mb-2 text-[13px] text-neutral-500">Lesson</p>
                <Badge variant="lesson">Lesson</Badge>
              </div>
              <div>
                <p className="mb-2 text-[13px] text-neutral-500">Popular</p>
                <Badge variant="popular">Popular</Badge>
              </div>
            </div>
          </Section>

          <Section number="10" title="Status / Indicators">
            <div className="flex flex-col gap-3">
              <StatusIndicator status="in-progress" />
              <StatusIndicator status="completed" />
              <StatusIndicator status="now-playing" />
              <StatusIndicator status="locked" />
            </div>
          </Section>

          <Section number="11" title="Progress Bar">
            <ProgressBar value={35} showLabel />
            <div className="mt-5 space-y-4">
              <ProgressBar value={10} />
              <ProgressBar value={65} />
              <ProgressBar value={100} />
            </div>
          </Section>
        </div>

        {/* 12 Cards ---------------------------------------- */}
        <Section number="12" title="Cards">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <p className="mb-2 text-[13px] text-neutral-500">Course Card</p>
              <CourseCard
                title="Next.js for Production"
                description="Build scalable, high-performance web applications with Next.js."
                level="Intermediate"
                duration="18h 24m"
                modules="12 modules"
              />
            </div>
            <div>
              <p className="mb-2 text-[13px] text-neutral-500">
                Lesson Card (Video)
              </p>
              <LessonCard
                variant="video"
                title="Data Fetching in Server Components"
                description="Learn how to fetch data on the server using async/await and Next.js best practices."
                meta="Lesson 5.1 · 12:45"
                actionLabel="Watch from 12:45"
              />
            </div>
            <div>
              <p className="mb-2 text-[13px] text-neutral-500">
                Lesson Card (Lesson)
              </p>
              <LessonCard
                variant="lesson"
                title="Data Fetching & Caching"
                description="Explore different data fetching methods in Next.js and how to cache and revalidate data for optimal performance."
                meta="Module 5"
                actionLabel="View lesson"
              />
            </div>
            <div>
              <p className="mb-2 text-[13px] text-neutral-500">Resource Card</p>
              <ResourceCard
                title="Caching and Revalidation Guide"
                description="Deep dive into Next.js caching strategies."
                fileType="PDF"
                fileSize="1.2 MB"
              />
            </div>
          </div>
        </Section>

        {/* 13 Navigation --------------------------------- */}
        <Section number="13" title="Navigation">
          <Navbar
            items={[
              { label: "Courses", href: "#", active: true },
              { label: "My Learning", href: "#" },
            ]}
          />
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <p className="mb-3 text-[13px] text-neutral-500">Breadcrumbs</p>
              <Breadcrumbs
                items={[
                  { label: "All Courses", href: "#" },
                  { label: "Next.js for Production", href: "#" },
                  { label: "Data Fetching & Caching" },
                ]}
              />
            </div>
            <div className="md:justify-self-end">
              <p className="mb-3 text-[13px] text-neutral-500">Pagination</p>
              <Pagination currentPage={1} totalPages={8} />
            </div>
          </div>
        </Section>

        {/* 14 Principles -------------------------------- */}
        <Section number="14" title="Principles">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="flex gap-3">
                <span className="text-neutral-900">
                  <Icon name={p.icon} size={28} />
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-neutral-900">
                    {p.title}
                  </p>
                  <p className="mt-1 text-[13px] leading-5 text-neutral-500">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}
