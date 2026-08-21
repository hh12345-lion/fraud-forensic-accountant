import Link from "next/link";

export function EnforcementBanner() {
  return (
    <div className="border-y border-signal/20 bg-signal/10 px-4 py-4 text-navy sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium leading-relaxed sm:text-base">
          <span aria-hidden="true" className="text-signal">● </span>
          2025–2026 Global enforcement: DOJ corporate fraud priorities expanded. SEC crypto and
          disclosure enforcement at record levels. Updated self-reporting guidance encourages early
          cooperation in cross-border investigations.
        </p>
        <Link
          href="/guides/sfo-enforcement-update-2025"
          className="shrink-0 text-sm font-semibold text-copper underline hover:no-underline"
        >
          Read the enforcement update →
        </Link>
      </div>
    </div>
  );
}
