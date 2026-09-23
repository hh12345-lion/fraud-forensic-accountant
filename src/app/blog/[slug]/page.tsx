import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";
import { getBlogBySlug } from "@/lib/blog";
import { markdownToHtml } from "@/lib/markdown";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;
  const title = `${post.title} | ${SITE_NAME}`;
  const images = post.image
    ? [{ url: post.image, alt: post.imageAlt || post.title }]
    : undefined;

  return {
    title: { absolute: title },
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const html = markdownToHtml(post.content);
  const url = `${SITE_URL}/blog/${post.slug}`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    image: post.image ? `${SITE_URL}${post.image}` : undefined,
    inLanguage: "en",
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: url,
    url,
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          articleLd,
        ]}
      />
      {post.image ? (
        <div className="relative mx-auto h-[min(28rem,55vw)] w-full max-w-6xl border-b border-border">
          <Image
            src={post.image}
            alt={post.imageAlt || post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <article className="py-12 md:py-16">
        <div className="prose-content mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
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
          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-navy sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-body">{post.description}</p>

          <div className="mt-10" dangerouslySetInnerHTML={{ __html: html }} />

          <p className="mt-12 border-t border-border pt-8 text-sm">
            <Link href="/blog" className="font-semibold text-copper hover:underline">
              ← Back to the blog
            </Link>
            <span className="mx-3 text-muted">·</span>
            <Link href="/contact" className="font-semibold text-copper hover:underline">
              Submit an inquiry
            </Link>
          </p>
        </div>
      </article>
    </>
  );
}
