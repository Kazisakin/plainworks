import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact", description: "Get in touch with Plainworks or join the PrepLabel pilot." };

export default function Contact() {
  return (
    <section className="narrow" style={{ padding: "120px 0 80px" }}>
      <p className="eyebrow reveal">Contact</p>
      <h1 className="reveal" style={{ fontSize: "clamp(40px,6vw,72px)" }}>Say hello.</h1>
      <p className="lead reveal">Questions, pilot requests, or a problem you&apos;d like solved. Email <a href={`mailto:${site.email}`} style={{ color: "var(--ink)", textDecoration: "underline", textUnderlineOffset: 3 }}>{site.email}</a> or use the form.</p>
      <Suspense><ContactForm /></Suspense>
    </section>
  );
}
