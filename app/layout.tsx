import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ground up",
  description: "Demystifying abstractions and building things from the ground up.",
};

const NAV_STYLE: React.CSSProperties = {
  maxWidth: 1152,
  margin: "0 auto",
  padding: "0 24px",
  height: 62,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

/* Pour-over drip coffee icon — represents "ground up" */
function GroundUpLogo({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Top collar / filter rim */}
      <rect x="1" y="1" width="26" height="4" rx="2" fill="currentColor" />
      {/* Left cone edge */}
      <line x1="2.5" y1="5" x2="12.5" y2="19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      {/* Right cone edge */}
      <line x1="25.5" y1="5" x2="15.5" y2="19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      {/* Drip */}
      <line x1="14" y1="19" x2="14" y2="23.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Drop */}
      <circle cx="14" cy="25.5" r="2" fill="currentColor" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#0a0a0a", color: "#e8e8e8" }}>

        <header style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid #1a1a1a", background: "rgba(10,10,10,0.85)", backdropFilter: "blur(12px)" }}>
          <nav style={NAV_STYLE}>
            {/* Logo + wordmark */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9, color: "#fff", textDecoration: "none" }}>
              <GroundUpLogo size={22} />
              <span style={{ fontWeight: 650, fontSize: 15, letterSpacing: "-0.02em" }}>
                ground up
              </span>
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <Link href="/about" style={{ fontSize: 14, color: "#666" }} className="hover:text-white transition-colors">
                About
              </Link>
              <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#444" }}>
                <a href="https://twitter.com/vishaag" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" style={{ color: "#444" }}>
                  <TwitterIcon />
                </a>
                <a href="https://www.youtube.com/@vishaag" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" style={{ color: "#444" }}>
                  <YouTubeIcon />
                </a>
              </div>
            </div>
          </nav>
        </header>

        <main style={{ flex: 1 }}>{children}</main>

        <footer style={{ borderTop: "1px solid #1a1a1a", marginTop: 96 }}>
          <div style={{ maxWidth: 1152, margin: "0 auto", padding: "40px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13, color: "#444" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#333" }}>
              <GroundUpLogo size={16} />
              <span>ground up</span>
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              {[
                ["GitHub", "https://github.com/vishaag"],
                ["Twitter", "https://twitter.com/vishaag"],
                ["YouTube", "https://www.youtube.com/@vishaag"],
              ].map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" style={{ color: "#444" }}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
