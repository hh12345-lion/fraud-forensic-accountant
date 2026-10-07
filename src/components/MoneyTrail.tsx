import Link from "next/link";
import { TonedImage } from "./TonedImage";
import { images } from "@/lib/images";

const nodes = [
  { step: "Identify", label: "Source funds", note: "The account the money left" },
  { step: "Trace", label: "Layering accounts", note: "Transfers that break the trail" },
  { step: "Link", label: "Entities", note: "Companies and nominees in between" },
  { step: "Locate", label: "Jurisdictions", note: "Where the value came to rest" },
  { step: "Recover", label: "Assets", note: "Property, cash and holdings" },
];

/** Illustrative flow of an asset tracing exercise. Not a description of any case. */
export function MoneyTrail() {
  return (
    <section className="relative isolate overflow-hidden bg-navy py-16 text-white md:py-20">
      <div className="absolute inset-y-0 right-0 -z-10 hidden w-2/5 lg:block">
        <TonedImage src={images.vaultLock.src} tone="dark" strength={0.3} sizes="40vw" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy via-navy/60 to-transparent" />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint">Asset tracing</p>
        <h2 className="mt-3 max-w-2xl font-display text-2xl font-semibold sm:text-3xl">
          Following the money from the loss to the asset
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-white/70">
          Tracing work follows value through accounts, entities and jurisdictions until it can be
          tied to something recoverable. Each step is documented so it stands up as evidence.
        </p>

        <ol className="mt-12 grid gap-4 lg:grid-cols-5 lg:gap-0">
          {nodes.map((n, i) => (
            <li key={n.step} className="relative flex gap-4 lg:block lg:pr-6">
              <div className="flex flex-col items-center lg:flex-row">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-mint bg-navy font-mono text-sm font-semibold text-mint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {i < nodes.length - 1 && (
                  <span
                    aria-hidden
                    className="w-px flex-1 border-l-2 border-dashed border-mint/40 lg:ml-2 lg:h-px lg:w-auto lg:border-l-0 lg:border-t-2"
                  />
                )}
              </div>
              <div className="pb-6 lg:mt-5 lg:pb-0">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">{n.step}</p>
                <p className="mt-1 font-display text-lg font-semibold">{n.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-white/65">{n.note}</p>
              </div>
            </li>
          ))}
        </ol>

        <Link
          href="/services/asset-tracing-recovery"
          className="mt-10 inline-flex min-h-[44px] items-center rounded-full bg-mint px-6 text-sm font-semibold text-navy transition hover:bg-white"
        >
          Asset tracing and recovery
        </Link>
      </div>
    </section>
  );
}
