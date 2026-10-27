import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy", description: "How Plainworks handles personal information." };

export default function Privacy() {
  return (
    <article className="narrow legal">
      <h1>Privacy policy</h1>
      <p className="updated">Last updated 27 October 2026</p>

      <h2>The short version</h2>
      <p>This website has no tracking, no analytics and no advertising cookies. We only get your details if you email us. Our products keep your business data on your own equipment.</p>

      <h2>What we collect</h2>
      <ul>
        <li><b>When you contact us:</b> your name, email, company and message, sent by your own email app.</li>
        <li><b>When you browse:</b> our hosting provider may keep standard server logs (such as IP address and browser type) for security. We don&apos;t use them to identify you.</li>
      </ul>

      <h2>How we use it</h2>
      <p>To reply to you, run a pilot you ask for, and meet legal obligations. We never sell personal information or share it for marketing.</p>

      <h2>Our products</h2>
      <p>PrepLabel has no Wi-Fi, Bluetooth or cloud connection. Item lists, staff initials and the print log are stored on the device and only leave it when you export them over USB. We can&apos;t see that data.</p>

      <h2>How long we keep it</h2>
      <p>We keep emails for as long as we need them to help you, then delete them. You can ask us to delete yours at any time.</p>

      <h2>Your rights</h2>
      <p>Under Canadian privacy law (PIPEDA) you can ask to see, correct or delete the personal information we hold about you, and you can withdraw consent. Email <a href={`mailto:${site.email}`}>{site.email}</a>. You can also contact the Office of the Privacy Commissioner of Canada.</p>

      <h2>Changes</h2>
      <p>If we change this policy we&apos;ll update the date above.</p>

      <h2>Contact</h2>
      <p>{site.name}, {site.city} · <a href={`mailto:${site.email}`}>{site.email}</a></p>
    </article>
  );
}
