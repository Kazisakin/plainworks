import type { Metadata } from "next";
import { pageMeta, JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import Photo from "@/components/Photo";
import { Split, Marquee } from "@/components/Motion";
import { photos } from "@/lib/photos";

export const metadata: Metadata = pageMeta({
  title: "About Plainworks: business technology for Canada and emerging markets",
  description: "Plainworks builds simple technology that upgrades the systems businesses already run. Founded in Fredericton, Canada, and building for Bangladesh, South Asia and Africa.",
  path: "/about",
  keywords: ["about Plainworks", "business technology company", "Fredericton tech startup", "emerging markets technology", "Bangladesh", "Africa"],
});

export default function About() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])]} />
      <section className="page-hero">
        <div className="bg" data-speed="-0.15" data-scale="1.12"><Image src={photos.team} alt="Team collaborating around a laptop" fill priority sizes="100vw" quality={78} /></div>
        <div className="shade" />
        <div className="wrap">
          <p className="eyebrow eyebrow-inv reveal">About Plainworks</p>
          <Split as="h1" text="Better, not different." className="on-dark" />
          <p className="hero-lead reveal" style={{ transitionDelay: ".3s" }}>Most businesses don&apos;t need a new system. They need the one they have to work better. That&apos;s what we build.</p>
        </div>
      </section>

      <Marquee items={["Listen first", "Fix the slowest step", "Plain language", "Works offline", "Built to last"]} />

      <section className="section wrap split-grid">
        <div>
          <p className="eyebrow reveal">Our mission</p>
          <Split text="Make good technology simple enough for every business." />
          <p className="lead reveal">Big software is built for big companies. We build small, focused tools for everyone else: tools that fit how a business already runs and pay for themselves fast.</p>
        </div>
        <Photo src={photos.monitors} alt="Developer working across several monitors" shape="tall" speed={0.08} />
      </section>

      <section className="section mist">
        <div className="wrap">
          <p className="eyebrow reveal">What we believe</p>
          <Split text="Three rules for everything we make." />
          <div className="values" style={{ marginTop: 56 }}>
            {[
              { src: photos.analytics, alt: "Laptop showing simple analytics", t: "Upgrade, don't replace", d: "Keep what works. Improve the step that slows you down." },
              { src: photos.prototype, alt: "Engineer testing hardware", t: "Plain to use", d: "If it needs a manual, we haven't finished designing it." },
              { src: photos.circuit, alt: "Close-up of a circuit board", t: "Built to last", d: "Solid parts, honest pricing, and data that stays yours." },
            ].map((v, i) => (
              <article className="value reveal tilt" key={v.t} style={{ transitionDelay: `${i * 0.1}s` }}>
                <Photo src={v.src} alt={v.alt} shape="free" speed={0.04} />
                <div className="t"><h3>{v.t}</h3><p>{v.d}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="future">
        <div className="future-bg" data-speed="-0.1" data-scale="1.2"><Image src={photos.network} alt="Glowing digital network lines" fill sizes="100vw" quality={70} /></div>
        <div className="future-shade" />
        <div className="wrap future-inner">
          <p className="eyebrow eyebrow-inv reveal">Where we&apos;re going</p>
          <Split text="From Canada to the world's fastest-growing markets." className="on-dark future-title" />
          <p className="hero-lead reveal">We&apos;re starting at home and building toward Bangladesh, South Asia and Africa, where millions of small businesses are ready to grow with the right tools.</p>
          <div className="regions">
            {[
              { src: photos.dhaka, name: "Bangladesh", alt: "Aerial view of Dhaka" },
              { src: photos.phones, name: "Mobile-first", alt: "Two people using phones for payments" },
              { src: photos.lagos, name: "West Africa", alt: "Busy street in Lagos" },
              { src: photos.nairobi, name: "East Africa", alt: "Nairobi skyline" },
            ].map((r, i) => (
              <figure className="region clip" key={r.name} style={{ transitionDelay: `${i * 0.08}s` }}>
                <Image src={r.src} alt={r.alt} fill sizes="(max-width: 960px) 50vw, 300px" quality={78} />
                <figcaption>{r.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap center">
        <Split text="Let's build what's next." />
        <div className="row reveal" style={{ justifyContent: "center" }}>
          <Link href="/contact" className="btn btn-dark">Get in touch</Link>
          <Link href="/preplabel" className="btn btn-line">See PrepLabel</Link>
        </div>
      </section>
    </>
  );
}
