import Image from "next/image";
import Link from "next/link";
import Photo from "@/components/Photo";
import { Split, Rotator, Marquee } from "@/components/Motion";
import { photos } from "@/lib/photos";

export default function Home() {
  return (
    <>
      {/* 1 · HERO */}
      <section className="hero-dark">
        <div className="hero-bg" data-speed="-0.18" data-scale="1.15">
          <Image src={photos.earthNight} alt="" fill priority sizes="100vw" quality={82} />
        </div>
        <div className="hero-shade" />
        <div className="wrap hero-inner">
          <p className="eyebrow eyebrow-inv reveal">Plainworks</p>
          <h1 className="hero-title">
            <Split as="p" text="Technology that helps" className="hero-line" />
            <span className="hero-line hero-rot">
              businesses <Rotator words={["grow.", "sell more.", "move faster.", "go further."]} />
            </span>
          </h1>
          <p className="hero-lead reveal" style={{ transitionDelay: ".5s" }}>We upgrade the systems businesses already run, so they waste less time and sell more.</p>
          <div className="row reveal" style={{ transitionDelay: ".65s" }}>
            <a href="#story" className="btn btn-accent">Our story</a>
            <a href="#product" className="btn btn-ghost">See what we&apos;ve built</a>
          </div>
        </div>
        <a href="#story" className="scroll-cue" aria-label="Scroll down"><span /></a>
      </section>

      <Marquee items={["Upgrade, don't replace", "Software + hardware", "Built in Canada", "Made for emerging markets", "Plain to use", "Offline-friendly"]} />

      {/* 2 · PROBLEM */}
      <section className="section wrap" id="story">
        <p className="eyebrow reveal">The problem</p>
        <Split text="Most businesses still run on paper, spreadsheets and guesswork." className="big-statement" />
        <div className="stack">
          {[
            { src: photos.paper, alt: "A tall stack of paper records", n: "01", t: "Paper gets lost.", d: "Orders, logs and records live in folders nobody can search." },
            { src: photos.stressed, alt: "Business owner stressed at his desk", n: "02", t: "Tools don't talk.", d: "Five apps, three spreadsheets, and the numbers never match." },
            { src: photos.stressedLaptop, alt: "Frustrated man looking at a laptop", n: "03", t: "New systems are too hard.", d: "Big software means months of training and a big bill." },
          ].map((c, i) => (
            <article className="stack-card" key={c.n} style={{ top: `${96 + i * 28}px` }}>
              <div className="stack-text">
                <span className="n">{c.n}</span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
              <div className="stack-img"><Image src={c.src} alt={c.alt} fill sizes="(max-width: 960px) 100vw, 640px" quality={82} /></div>
            </article>
          ))}
        </div>
      </section>

      {/* 3 · SOLUTION */}
      <section className="section dark">
        <div className="wrap split-grid">
          <div>
            <p className="eyebrow eyebrow-inv reveal">Our approach</p>
            <Split text="We don't replace your system. We upgrade it." className="on-dark" />
            <ol className="steps-line">
              <li className="reveal"><b>Listen</b><span>We learn how your business already works.</span></li>
              <li className="reveal" style={{ transitionDelay: ".1s" }}><b>Build</b><span>One small tool that fixes the slowest step.</span></li>
              <li className="reveal" style={{ transitionDelay: ".2s" }}><b>Grow</b><span>Less admin, fewer mistakes, more time to sell.</span></li>
            </ol>
          </div>
          <div className="mosaic">
            <Photo src={photos.dashboard} alt="Woman reviewing sales charts on a laptop" shape="free" className="m1" speed={0.1} />
            <Photo src={photos.team} alt="Team working together around a laptop" shape="free" className="m2" speed={-0.06} />
            <Photo src={photos.circuit} alt="Close-up of a circuit board" shape="free" className="m3" speed={0.14} />
          </div>
        </div>
      </section>

      {/* 4 · PEOPLE */}
      <section className="section wrap">
        <div className="people">
          <Photo src={photos.craftOwner} alt="Small business owner working at her craft desk" shape="free" className="p-tall" />
          <div className="people-text">
            <p className="eyebrow reveal">Who we build for</p>
            <Split text="The people who keep the world's small businesses running." />
            <p className="lead reveal">Shop owners, kitchens, makers and service teams. They don&apos;t need more software. They need the right tool, in plain language, that works on day one.</p>
            <dl className="counters">
              <div className="reveal"><dt data-count="3">0</dt><dd>steps to start</dd></div>
              <div className="reveal"><dt data-count="0">0</dt><dd>systems replaced</dd></div>
              <div className="reveal"><dt data-count="1">0</dt><dd>tool at a time</dd></div>
            </dl>
          </div>
          <Photo src={photos.designer} alt="Designer running her business from a laptop and phone" shape="free" className="p-wide" speed={-0.05} />
        </div>
      </section>

      {/* 5 · FUTURE */}
      <section className="future">
        <div className="future-bg" data-speed="-0.12" data-scale="1.2">
          <Image src={photos.cityNight} alt="" fill sizes="100vw" quality={75} />
        </div>
        <div className="future-shade" />
        <div className="wrap future-inner">
          <p className="eyebrow eyebrow-inv reveal">What&apos;s next</p>
          <Split text="The next billion businesses." className="on-dark future-title" />
          <p className="hero-lead reveal">Many of the fastest-growing economies are still underserved by business technology. We&apos;re building simple, affordable, offline-friendly tools to help them grow.</p>
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
          <p className="future-note reveal">Built in Canada. Designed for emerging markets everywhere.</p>
        </div>
      </section>

      {/* 6 · CURRENT PRODUCT */}
      <section className="section wrap" id="product">
        <Link href="/preplabel" className="product-hero reveal">
          <div className="product-copy">
            <p className="eyebrow">Our first product</p>
            <h2>PrepLabel</h2>
            <p className="lead">A touchscreen label printer for restaurant kitchens. Category, item, print.</p>
            <span className="btn btn-dark" style={{ marginTop: 28 }}>See PrepLabel <span className="arrow">→</span></span>
          </div>
          <div className="product-img">
            <div className="glow" />
            <Image src="/renders/hero_sage.webp" alt="PrepLabel label printer in sage" width={1773} height={1711} sizes="(max-width: 960px) 100vw, 600px" />
          </div>
        </Link>
      </section>
    </>
  );
}
