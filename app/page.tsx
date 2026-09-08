import Link from "next/link";
import { Logo } from "@/components/ui";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-svh max-w-2xl flex-col justify-center px-6 py-16">
      <Logo />
      <h1 className="text-display-2 mt-6 text-neutral-900">Vertex</h1>
      <p className="text-body-lg mt-3 text-neutral-500">
        A unified design language for the Vertex learning platform.
      </p>
      <Link
        href="/design-system"
        className="mt-6 text-[14px] font-semibold text-primary-500 transition-colors hover:text-primary-600"
      >
        View the design system →
      </Link>
    </main>
  );
}
