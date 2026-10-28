import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Photo from "@/components/Photo";
import Team from "@/components/Team";
import { Split, Marquee } from "@/components/Motion";
import { photos } from "@/lib/photos";
import { roadmap } from "@/lib/content";
import { pageMeta, JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About us: a product studio in Fredericton, Canada",
  description: "Meet Plainworks, a four-person product studio in Fredericton, Canada, building AI software and smart hardware that help businesses run better.",
  path: "/about",
  keywords: ["about Plainworks", "product studio", "AI startup Canada", "Fredericton startup", "business automation", "logistics technology"],
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
          <Split as="h1" text="We solve problems for a living." className="on-dark" />
          <p className="hero-lead reveal" style={{ transitionDelay: ".3s" }}>Plainworks is a product studio. We find what slows businesses down and build the product that fixes it.</p>
        </div>
      </section>

      <Marquee items={["Find the problem", "Prove it fast", "Pilot with real users", "Scale it"]} />

      <section className="section wrap split-grid">
        <div>
          <p className="eyebrow reveal">Our story</p>
          <Split text="It started with problems we kept running into." />
          <p className="lead reveal">Between jobs, classes and side projects, the four of us kept seeing the same thing: businesses losing hours to paperwork, manual tracking and tools that don&apos;t talk to each other.</p>
          <p className="lead reveal">So we started fixing them, one problem at a time. Plainworks is how we turn those fixes into real products, using AI where it helps and hardware where it&apos;s needed.</p>
        </div>
        <Photo src={photos.monitors} alt="Engineer prototyping across several monitors" shape="tall" speed={0.08} />
      </section>

      <section className="section mist">
        <div className="wrap">
          <p className="eyebrow reveal">What we believe</p>
          <Split text="Three rules for everything we build." />
          <div className="values" style={{ marginTop: 56 }}>
            {[
              { src: photos.analytics, alt: "Laptop showing simple analytics", t: "Solve a real problem", d: "If we can't point to the hours, money or mistakes it saves, we don't build it." },
              { src: photos.prototype, alt: "Engineer testing hardware", t: "Keep it simple", d: "The best tool is the one people use on day one, without training." },
              { src: photos.circuit, alt: "Close-up of a circuit board", t: "Build to last", d: "Reliable parts, honest pricing, and data that stays with its owner." },
            ].map((v, i) => (
              <article className="value reveal tilt" key={v.t} style={{ transitionDelay: `${i * 0.1}s` }}>
                <Photo src={v.src} alt={v.alt} shape="free" speed={0.04} />
                <div className="t"><h3>{v.t}</h3><p>{v.d}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap" id="team">
        <div className="team-head">
          <div>
            <p className="eyebrow reveal">The team</p>
            <Split text="The people behind Plainworks." />
          </div>
          <p className="lead reveal">Operations, design and engineering in one small team, so ideas move from sketch to prototype quickly.</p>
        </div>
        <Team />
      </section>

      <section className="section dark">
        <div className="wrap">
          <p className="eyebrow eyebrow-inv reveal">Roadmap</p>
          <Split text="Where we're going." className="on-dark" />
          <ol className="roadmap">
            {roadmap.map((r, i) => (
              <li className="reveal" key={r.title} style={{ transitionDelay: `${i * 0.1}s` }}>
                <span className="when">{r.when}</span>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section wrap center">
        <Split text="Let's build what's next, together." />
        <p className="lead reveal" style={{ margin: "18px auto 0" }}>We&apos;re open to investors, manufacturing partners and businesses who want to pilot our products.</p>
        <div className="row reveal" style={{ justifyContent: "center" }}>
          <Link href="/contact?topic=invest" className="btn btn-dark">Get in touch</Link>
          <Link href="/preplabel" className="btn btn-line">See PrepLabel</Link>
        </div>
      </section>
    </>
  );
}
