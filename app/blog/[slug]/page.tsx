import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPost, getAllPostSlugs } from "@/lib/posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — ground up`,
    description: post.description,
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "64px 24px 96px" }}>

      <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#555", marginBottom: 48, textDecoration: "none" }} className="hover:text-white transition-colors">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 11L5 7l4-4" />
        </svg>
        Back
      </Link>

      <header style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#555" }}>Blog</span>
          <span style={{ color: "#2a2a2a" }}>·</span>
          <time dateTime={post.date} style={{ fontSize: 12, color: "#555" }}>{formatDate(post.date)}</time>
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#fff", lineHeight: 1.25, marginBottom: 16, letterSpacing: "-0.02em" }}>
          {post.title}
        </h1>

        {post.description && (
          <p style={{ fontSize: 15, color: "#777", lineHeight: 1.65 }}>
            {post.description}
          </p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
            {post.tags.map((tag) => (
              <span key={tag} style={{ fontSize: 12, padding: "3px 10px", borderRadius: 999, background: "#111", border: "1px solid #222", color: "#666" }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <hr style={{ border: "none", borderTop: "1px solid #1e1e1e", marginBottom: 48 }} />

      <article className="prose">
        <MDXRemote source={post.content} />
      </article>

      <div style={{ marginTop: 64, paddingTop: 32, borderTop: "1px solid #1e1e1e" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#555" }} className="hover:text-white transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 11L5 7l4-4" />
          </svg>
          All posts
        </Link>
      </div>

    </div>
  );
}
