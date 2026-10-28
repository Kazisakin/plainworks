import type { Metadata } from "next";
import { pageMeta, JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import Photo from "@/components/Photo";
import { Split } from "@/components/Motion";
import { site } from "@/lib/site";
import { photos } from "@/lib/photos";

export const metadata: Metadata = pageMeta({
  title: "Contact us",
  description: "Contact Plainworks about investment, partnerships, manufacturing or piloting PrepLabel in your kitchen. We reply to every message.",
  path: "/contact",
});

export default function Contact() {
  return (
    <section className="wrap section contact-grid">
      <JsonLd data={[breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])]} />
      <div>
        <p className="eyebrow reveal">Contact</p>
        <Split as="h1" text="Let's talk." className="p-title" />
        <p className="lead reveal">Investors, partners, manufacturers or businesses with a problem to solve: we&apos;d like to hear from you. Email <a href={`mailto:${site.email}`} style={{ color: "var(--ink)", textDecoration: "underline", textUnderlineOffset: 3 }}>{site.email}</a> or use the form.</p>
        <Suspense><ContactForm /></Suspense>
      </div>
      <Photo src={photos.womanLaptop} alt="Smiling woman working on a laptop" shape="free" priority speed={0.05} />
    </section>
  );
}
