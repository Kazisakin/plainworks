import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="narrow center" style={{ padding: "160px 0" }}>
      <p className="eyebrow">404</p>
      <h1 style={{ fontSize: "clamp(40px,6vw,72px)" }}>Page not found.</h1>
      <div className="row"><Link href="/" className="btn btn-dark">Back home</Link></div>
    </section>
  );
}
