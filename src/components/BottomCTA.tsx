import Link from "next/link";

export function BottomCTA({
  title = "Engage a Qualified Fraud Forensic Accountant",
  description = "Submit your case details and we will match you with a fraud forensic accountant for civil fraud, criminal defense, or corporate investigation. Response within one business day.",
  buttonText = "Request Consultation",
  buttonHref = "/contact",
}: {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}) {
  return (
    <section className="border-t-4 border-copper bg-navy py-14 md:py-16">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
        <p className="mt-4 text-lg text-white/75">{description}</p>
        <Link
          href={buttonHref}
          className="mt-8 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm bg-copper px-8 py-3 text-base font-semibold text-white transition hover:bg-copper-light"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
