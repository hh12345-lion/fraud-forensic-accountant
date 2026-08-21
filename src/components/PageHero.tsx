import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

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
    <section className="border-b border-border bg-stone py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs items={breadcrumbs} variant="light" />
        )}
        <div className="border-l-4 border-copper pl-6 md:pl-8">
          <h1 className="font-display text-2xl font-semibold tracking-tight text-navy sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-3xl text-base text-body sm:text-lg">{subtitle}</p>
          )}
        </div>
      </div>
    </section>
  );
}
