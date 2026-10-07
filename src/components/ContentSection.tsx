import { MatchCard } from "./MatchCard";

export function ContentSection({
  children,
  alt = false,
  className = "",
  wide = false,
  aside = false,
}: {
  children: React.ReactNode;
  alt?: boolean;
  className?: string;
  wide?: boolean;
  /** Show the sticky "Get matched" card beside the article on large screens. */
  aside?: boolean;
}) {
  if (aside) {
    return (
      <section className={`py-12 md:py-16 ${alt ? "bg-stone" : "bg-white"} ${className}`}>
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_17rem] lg:px-8">
          <div className="prose-content min-w-0">{children}</div>
          <MatchCard />
        </div>
      </section>
    );
  }

  return (
    <section
      className={`py-12 md:py-16 ${alt ? "bg-stone" : "bg-white"} ${className}`}
    >
      <div
        className={`prose-content mx-auto px-4 sm:px-6 lg:px-8 ${
          wide ? "max-w-6xl" : "max-w-4xl"
        }`}
      >
        {children}
      </div>
    </section>
  );
}
