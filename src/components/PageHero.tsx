import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { TonedImage } from "./TonedImage";
import { images } from "@/lib/images";

export function PageHero({
  title,
  subtitle,
  breadcrumbs,
}: {
  title: string;
  subtitle?: string;
  breadcrumbs?: Crumb[];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy py-12 text-white md:py-16">
      <div className="absolute inset-y-0 right-0 -z-10 hidden w-1/2 md:block">
        <TonedImage src={images.ledger.src} tone="dark" strength={0.28} sizes="50vw" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy via-navy/70 to-navy/20" />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} variant="dark" />}
        <div className="border-l-4 border-mint pl-6 md:pl-8">
          <h1 className="max-w-4xl font-display text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {title}
          </h1>
          {subtitle && <p className="mt-4 max-w-3xl text-base text-white/75 sm:text-lg">{subtitle}</p>}
        </div>
      </div>
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-mint via-copper-light to-transparent" />
    </section>
  );
}
