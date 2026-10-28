import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Photo from "@/components/Photo";
import BgVideo from "@/components/BgVideo";
import Team from "@/components/Team";
import { Split, Rotator, Marquee } from "@/components/Motion";
import { photos } from "@/lib/photos";
import { videos, pillars, process } from "@/lib/content";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMeta({ title: site.homeTitle, description: site.description, path: "/" }),
  title: { absolute: site.homeTitle },
};

const pillarMedia = [
  { kind: "img", src: photos.dashboard, alt: "Business owner reviewing sales charts on a laptop" },
  { kind: "video", src: videos.logistics, alt: "Aerial view of a large logistics warehouse" },
  { kind: "img", src: photos.phones, alt: "Two people using smartphones" },
] as const;

const processImg = [
  { src: photos.stressed, alt: "Business owner stressed by paperwork at his desk" },
  { src: photos.monitors, alt: "Engineer building a prototype across several monitors" },
  { src: photos.team, alt: "Team testing a product together around a laptop" },
  { src: photos.servers, alt: "Data centre hallway representing scale" },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero-dark">
        <div className="hero-bg" data-speed="-0.12" data-scale="1.1">
          <BgVideo src={videos.hero.src} srcMobile={videos.hero.srcMobile} label="Time-lapse of a city at night" />
        </div>
        <div className="hero-shade" />
        <div className="wrap hero-inner">
          <p className="eyebrow eyebrow-inv reveal">Plainworks · Product studio</p>
          <h1 className="hero-title">
            <Split as="span" text="We build products that make businesses" className="hero-line" />
            <span className="hero-line hero-rot">
              <Rotator words={["faster.", "smarter.", "leaner.", "grow."]} />
            </span>
          </h1>
          <p className="hero-lead reveal" style={{ transitionDelay: ".5s" }}>
            Plainworks is a four-person studio from Canada. We find the slow, costly problems in how businesses work, then build AI software and smart hardware that fix them.
          </p>
          <div className="row reveal" style={{ transitionDelay: ".65s" }}>
            <a href="#work" className="btn btn-accent">See our work</a>
            <a href="#team" className="btn btn-ghost">Meet the team</a>
          </div>
        </div>
        <a href="#what" className="scroll-cue" aria-label="Scroll down"><span /></a>
      </section>

      <Marquee items={["AI automation", "Smart hardware", "Logistics", "Food service", "Consumer products", "Built in Canada"]} />

      {/* WHAT WE DO */}
      <section className="section wrap" id="what">
        <p className="eyebrow reveal">What we do</p>
        <Split text="Three ways we help businesses and people work better." className="big-statement" />
        <div className="pillars">
          {pillars.map((p, i) => {
            const m = pillarMedia[i];
            return (
              <article className="pillar reveal tilt" key={p.title} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="pillar-media">
                  {m.kind === "video"
                    ? <video className="bg-video" src={m.src} autoPlay muted loop playsInline preload="metadata" aria-label={m.alt} />
                    : <Image src={m.src} alt={m.alt} fill sizes="(max-width: 960px) 100vw, 400px" quality={80} />}
                  <span className="pillar-tag">{p.tag}</span>
                </div>
                <div className="pillar-text">
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* HOW WE SOLVE PROBLEMS */}
      <section className="section dark">
        <div className="wrap">
          <p className="eyebrow eyebrow-inv reveal">How we work</p>
          <Split text="Every product starts with a problem we can see." className="on-dark big-statement" />
          <div className="stack">
            {process.map((s, i) => (
              <article className="stack-card stack-dark" key={s.n} style={{ top: `${96 + i * 26}px` }}>
                <div className="stack-text">
                  <span className="n">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
                <div className="stack-img"><Image src={processImg[i].src} alt={processImg[i].alt} fill sizes="(max-width: 960px) 100vw, 640px" quality={80} /></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="section wrap" id="work">
        <p className="eyebrow reveal">Our work · Case study</p>
        <Split text="PrepLabel: from a messy problem to a working product." />
        <div className="case">
          <div className="case-grid">
            <div className="case-cell reveal">
              <span className="case-k">The problem</span>
              <p>Restaurant kitchens still label food by hand. Labels smudge, dates get guessed, and there&apos;s no record when inspectors ask.</p>
            </div>
            <div className="case-cell reveal" style={{ transitionDelay: ".1s" }}>
              <span className="case-k">Our solution</span>
              <p>An offline touchscreen label printer. Three taps print a clear label with the right dates, staff initials and a full print log.</p>
            </div>
            <div className="case-cell reveal" style={{ transitionDelay: ".2s" }}>
              <span className="case-k">Where it is</span>
              <p>Prototype in development, with manufacturing partners in discussion and pilots planned.</p>
            </div>
          </div>
          <Link href="/preplabel" className="case-visual reveal">
            <div className="glow" />
            <Image src="/renders/preplabel-food-label-printer-sage.webp" alt="PrepLabel touchscreen food prep label printer in sage green" width={1773} height={1711} sizes="(max-width: 960px) 100vw, 520px" />
            <span className="btn btn-dark case-btn">Explore PrepLabel <span className="arrow">→</span></span>
          </Link>
        </div>
      </section>

      {/* OPPORTUNITY */}
      <section className="future">
        <div className="future-bg" data-speed="-0.12" data-scale="1.2">
          <Image src={photos.cityNight} alt="Aerial view of a city at night" fill sizes="100vw" quality={75} />
        </div>
        <div className="future-shade" />
        <div className="wrap future-inner">
          <p className="eyebrow eyebrow-inv reveal">The opportunity</p>
          <Split text="Millions of businesses still run on paper and guesswork." className="on-dark future-title" />
          <p className="hero-lead reveal">Most software is built for large companies. Small and growing businesses, especially in fast-growing markets, need tools that are affordable, simple and work offline. That is the gap we build for.</p>
          <div className="regions">
            {[
              { src: photos.dhaka, name: "Bangladesh", alt: "Aerial view of Dhaka and its river" },
              { src: photos.bdStreet, name: "South Asia", alt: "Busy street in Bangladesh" },
              { src: photos.lagos, name: "West Africa", alt: "Busy street in Lagos, Nigeria" },
              { src: photos.nairobi, name: "East Africa", alt: "Nairobi city skyline" },
            ].map((r, i) => (
              <figure className="region clip" key={r.name} style={{ transitionDelay: `${i * 0.08}s` }}>
                <Image src={r.src} alt={r.alt} fill sizes="(max-width: 960px) 50vw, 300px" quality={78} />
                <figcaption>{r.name}</figcaption>
              </figure>
            ))}
          </div>
          <p className="future-note reveal">Starting in Canada. Building for emerging markets next.</p>
        </div>
      </section>

      {/* TEAM */}
      <section className="section wrap" id="team">
        <div className="team-head">
          <div>
            <p className="eyebrow reveal">The team</p>
            <Split text="Four friends. One studio. Lots of problems to solve." />
          </div>
          <p className="lead reveal">We combine business operations, design and engineering, so we can take a product from idea to prototype to production ourselves.</p>
        </div>
        <Team />
      </section>

      {/* CTA */}
      <section className="wrap section-sm">
        <div className="cta-band reveal">
          <div className="cta-video"><BgVideo src={videos.team} /></div>
          <div className="cta-band-in">
            <h2>Invest, partner or pilot with us.</h2>
            <p>We&apos;re looking for early partners, manufacturers and investors who want to build practical technology for real businesses.</p>
            <div className="row">
              <Link href="/contact?topic=invest" className="btn btn-accent">Talk to us</Link>
              <Link href="/about" className="btn btn-ghost">Our story</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
