import Image from "next/image";
import Link from "next/link";
import { getAllContent, ContentItem, getYouTubeThumbnail } from "@/lib/content";

const MAX_W = 1152;
const PX = 24;

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const GRADIENTS = [
  ["#0f0f23", "#1c1c42"],
  ["#0a1628", "#0e2d52"],
  ["#1a0f23", "#2d1848"],
  ["#0e1f10", "#183222"],
  ["#1f1005", "#3a2008"],
  ["#1a0a12", "#321020"],
];

function slugGradient(slug: string): string {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) & 0xffff;
  const [a, b] = GRADIENTS[h % GRADIENTS.length];
  return `linear-gradient(145deg, ${a} 0%, ${b} 100%)`;
}

function PlayButton() {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.25)" }}>
      <div style={{ width: 46, height: 46, borderRadius: "50%", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M8 5.14v14l11-7-11-7z" />
        </svg>
      </div>
    </div>
  );
}

function BlogPlaceholder({ slug, title }: { slug: string; title: string }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: slugGradient(slug), display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, fontWeight: 500, textAlign: "center", lineHeight: 1.5 }}>
        {title}
      </p>
    </div>
  );
}

function ContentCard({ item }: { item: ContentItem }) {
  const isVideo = item.type === "video";
  const href = isVideo ? item.url! : `/blog/${item.slug}`;
  const thumbnail = isVideo && item.url ? getYouTubeThumbnail(item.url) : null;

  const inner = (
    <div
      className="content-card"
      style={{ background: "#111", borderRadius: 14, overflow: "hidden", height: "100%", display: "flex", flexDirection: "column" }}
    >
      {/* Thumbnail */}
      <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
        {thumbnail ? (
          <>
            <Image src={thumbnail} alt={item.title} fill className="card-thumb-img object-cover" style={{ transition: "transform 0.3s" }} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            <PlayButton />
          </>
        ) : (
          <BlogPlaceholder slug={item.slug ?? item.title} title={item.title} />
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
        <p style={{ fontSize: 11, color: "#555", marginBottom: 8, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}>
          {item.platform}
        </p>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#ddd", lineHeight: 1.45, marginBottom: 12, flex: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {item.title}
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, color: "#555" }}>{formatDate(item.date)}</span>
          <span style={{ color: "#2a2a2a" }}>·</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: isVideo ? "#f87171" : "#60a5fa" }}>
            {isVideo ? "Video" : "Blog Post"}
          </span>
        </div>
      </div>
    </div>
  );

  return isVideo ? (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: "block", height: "100%" }}>
      {inner}
    </a>
  ) : (
    <Link href={href} style={{ display: "block", height: "100%" }}>
      {inner}
    </Link>
  );
}

export default function Home() {
  const content = getAllContent();

  return (
    <div>
      {/* Hero */}
      <section style={{ maxWidth: MAX_W, margin: "0 auto", padding: `80px ${PX}px 64px`, textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: 800, color: "#fff", lineHeight: 1, marginBottom: 14, letterSpacing: "-0.04em" }}>
          ground up
        </h1>
        <p style={{ fontSize: 13, color: "#444", marginBottom: 28, letterSpacing: "0.01em" }}>
          by vishaag
        </p>
        <p style={{ fontSize: 16, color: "#555", maxWidth: 380, margin: "0 auto", lineHeight: 1.7 }}>
          Demystifying software development, from scratch.
        </p>
      </section>

      {/* Grid */}
      <section style={{ maxWidth: MAX_W, margin: "0 auto", padding: `0 ${PX}px 96px` }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: 20 }}>
          {content.map((item) => (
            <ContentCard key={`${item.type}-${item.slug ?? item.title}`} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
