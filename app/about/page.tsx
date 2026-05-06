import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — ground up",
  description: "Software engineer building things on the web.",
};

const skills = [
  "TypeScript / JavaScript",
  "React, Next.js",
  "Node.js",
  "Databases (PostgreSQL, Redis)",
  "Cloud infrastructure (AWS, Vercel)",
];

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "80px 24px 96px" }}>
      <Link
        href="/"
        style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#555", marginBottom: 48 }}
        className="hover:text-white transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 11L5 7l4-4" />
        </svg>
        Back
      </Link>

      <h1 style={{ fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 40, letterSpacing: "-0.02em" }}>
        About
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 20, fontSize: 15, lineHeight: 1.75, color: "#999" }}>
        <p>
          Hey, I&apos;m Vishaag — a software engineer focused on web development,
          TypeScript, and building great developer experiences. I love working across the
          full stack and am particularly passionate about performance and clean API design.
        </p>
        <p>
          I write articles and make YouTube videos about the things I learn along the way.
          My goal is to explain complex technical topics in a way that&apos;s clear,
          practical, and actually useful.
        </p>
      </div>

      <div style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid #1e1e1e" }}>
          What I work with
        </h2>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
          {skills.map((s) => (
            <li key={s} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#999" }}>
              <span style={{ color: "#333", flexShrink: 0 }}>—</span>
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid #1e1e1e" }}>
          Get in touch
        </h2>
        <p style={{ fontSize: 14, color: "#999", lineHeight: 1.75 }}>
          Feel free to reach out on{" "}
          <a href="https://twitter.com/vishaag" target="_blank" rel="noopener noreferrer" style={{ color: "#ccc", textDecoration: "underline", textUnderlineOffset: 3, textDecorationColor: "#444" }} className="hover:text-white transition-colors">
            Twitter
          </a>{" "}
          or{" "}
          <a href="https://github.com/vishaag" target="_blank" rel="noopener noreferrer" style={{ color: "#ccc", textDecoration: "underline", textUnderlineOffset: 3, textDecorationColor: "#444" }} className="hover:text-white transition-colors">
            GitHub
          </a>
          . I&apos;m always happy to chat about software, ideas, or collaboration.
        </p>
      </div>
    </div>
  );
}
