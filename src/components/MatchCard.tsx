import Image from "next/image";
import Link from "next/link";

/** Sticky side card shown beside long articles. */
export function MatchCard() {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-36 overflow-hidden rounded-xl bg-navy p-6 text-white shadow-[0_24px_48px_-28px_rgba(22,33,30,0.8)]">
        <Image
          src="/brand/monogram.svg"
          alt=""
          width={282}
          height={341}
          unoptimized
          aria-hidden
          className="pointer-events-none absolute -bottom-6 -right-6 w-28 opacity-15"
        />
        <p className="relative font-display text-xl font-semibold leading-snug">
          Need a fraud forensic accountant for this?
        </p>
        <p className="relative mt-3 text-sm leading-relaxed text-white/70">
          Send the case type and the jurisdiction. We match you with a qualified specialist.
        </p>
        <Link
          href="/contact"
          className="relative mt-5 inline-flex min-h-[44px] items-center justify-center rounded-full bg-mint px-5 text-sm font-semibold text-navy transition hover:bg-white"
        >
          Get matched
        </Link>
        <Link
          href="/how-to-instruct"
          className="relative mt-4 block text-sm text-white/70 underline underline-offset-4 hover:text-white"
        >
          How to engage
        </Link>
      </div>
    </aside>
  );
}
