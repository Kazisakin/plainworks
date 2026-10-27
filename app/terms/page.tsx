import type { Metadata } from "next";
import { pageMeta, JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({ title: "Terms of use", description: "Terms of use for the Plainworks website and product information.", path: "/terms" });

export default function Terms() {
  return (
    <article className="narrow legal">
      <h1>Terms of use</h1>
      <p className="updated">Last updated 27 October 2026</p>

      <h2>Using this site</h2>
      <p>By using this website you agree to these terms. If you don&apos;t agree, please don&apos;t use the site.</p>

      <h2>Products in development</h2>
      <p>PrepLabel is a prototype. Images, 3D models, specifications and features shown here may change before release and are not an offer to sell. Pilot units are provided under a separate written agreement.</p>

      <h2>Food safety</h2>
      <p>PrepLabel helps you label food consistently. You remain responsible for setting correct shelf lives and following your local food safety rules.</p>

      <h2>Content and trademarks</h2>
      <p>The text, images, designs and 3D models on this site belong to {site.name}. Please don&apos;t copy or reuse them without permission. &quot;Plainworks&quot; and &quot;PrepLabel&quot; are names used by {site.name}.</p>

      <h2>No warranty</h2>
      <p>This site is provided &quot;as is&quot;. We try to keep it accurate but can&apos;t promise it is complete or error-free. To the extent the law allows, we aren&apos;t liable for losses from using it.</p>

      <h2>Links</h2>
      <p>We aren&apos;t responsible for the content of other websites we link to.</p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of New Brunswick and the federal laws of Canada that apply there.</p>

      <h2>Contact</h2>
      <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
    </article>
  );
}
