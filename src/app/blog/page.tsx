import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";
import { getAllBlogPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/metadata";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Blog — Fraud Forensic Accountant Insights",
  description:
    "Articles on forensic accounting methodology, reviewing large financial datasets, and instructing fraud forensic accountants.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} Blog`,
    url: `${SITE_URL}/blog`,
    inLanguage: "en",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updated || post.date,
      url: `${SITE_URL}/blog/${post.slug}`,
      image: post.image ? `${SITE_URL}${post.image}` : undefined,
    })),
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
          blogLd,
        ]}
      />
      <PageHero
        title="Fraud Forensic Accountant Blog"
        subtitle="Practitioner-facing articles on forensic accounting methodology, financial records review, and instructing fraud specialists."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />
      <section className="py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center justify-center rounded-sm bg-copper px-6 py-3 font-semibold text-white hover:bg-copper-light"
            >
              Submit an inquiry
            </Link>
            <Link
              href="/guides"
              className="inline-flex min-h-[44px] items-center justify-center rounded-sm border border-navy/20 bg-white px-6 py-3 font-semibold text-navy hover:border-copper hover:text-copper"
            >
              Browse guides
            </Link>
          </div>

          {posts.length === 0 ? (
            <p className="text-body">Articles will appear here shortly.</p>
          ) : (
            <ul className="grid gap-8 md:grid-cols-2">
              {posts.map((post) => (
                <li
                  key={post.slug}
                  className="overflow-hidden rounded-sm border border-border bg-white shadow-[var(--shadow-card)]"
                >
                  {post.image ? (
                    <Link href={`/blog/${post.slug}`} className="relative block h-52 w-full">
                      <Image
                        src={post.image}
                        alt={post.imageAlt || post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </Link>
                  ) : null}
                  <div className="p-6">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
                      <time dateTime={post.updated || post.date}>
                        {new Date(post.updated || post.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                      <span className="mx-2">·</span>
                      <span className="normal-case tracking-normal">{post.readingTime}</span>
                    </p>
                    <h2 className="mt-3 font-display text-xl font-semibold text-navy">
                      <Link href={`/blog/${post.slug}`} className="hover:text-copper">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-body">{post.description}</p>
                    <p className="mt-5">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-sm font-semibold text-copper hover:underline"
                      >
                        Read article →
                      </Link>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
