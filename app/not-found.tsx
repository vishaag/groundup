import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-32 text-center">
      <p className="text-6xl font-bold mb-6" style={{ color: "var(--text-dim)" }}>
        404
      </p>
      <p className="text-base mb-8" style={{ color: "var(--text-muted)" }}>
        This page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="text-sm underline underline-offset-4 transition-colors hover:text-white"
        style={{ color: "var(--text-muted)", textDecorationColor: "#333" }}
      >
        Go home
      </Link>
    </div>
  );
}
