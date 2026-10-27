import type { Metadata } from "next";
import { pageMeta, JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import Photo from "@/components/Photo";
import { Split } from "@/components/Motion";
import { site } from "@/lib/site";
import { photos } from "@/lib/photos";

export const metadata: Metadata = pageMeta({
  title: "Contact Plainworks",
  description: "Get in touch with Plainworks: questions, partnerships, or join the PrepLabel pilot for your restaurant kitchen.",
  path: "/contact",
});

export default function Contact() {
  return (
    <section className="wrap section contact-grid">
      <JsonLd data={[breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])]} />
      <div>
        <p className="eyebrow reveal">Contact</p>
        <Split as="h1" text="Let's talk." className="p-title" />
        <p className="lead reveal">Questions, pilot requests, partnerships, or a problem you&apos;d like solved. Email <a href={`mailto:${site.email}`} style={{ color: "var(--ink)", textDecoration: "underline", textUnderlineOffset: 3 }}>{site.email}</a> or use the form.</p>
        <Suspense><ContactForm /></Suspense>
      </div>
      <Photo src={photos.womanLaptop} alt="Smiling woman working on a laptop" shape="free" priority speed={0.05} />
    </section>
  );
}
