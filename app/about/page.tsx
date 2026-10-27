import type { Metadata } from "next";
import Photo from "@/components/Photo";
import { site } from "@/lib/site";
import { photos } from "@/lib/photos";

export const metadata: Metadata = { title: "About", description: "Plainworks builds products that upgrade the systems businesses already run." };

export default function About() {
  return (
    <>
      <section className="narrow" style={{ padding: "120px 0 64px" }}>
        <p className="eyebrow reveal">About</p>
        <h1 className="reveal" style={{ fontSize: "clamp(40px,6vw,72px)" }}>Better, not different.</h1>
        <p className="lead reveal">Most businesses don&apos;t need a new system. They need the one they have to work better. Plainworks builds products that do exactly that.</p>
      </section>
      <section className="wrap section-sm">
        <Photo src={photos.kitchenLine} alt="Chefs working on a busy restaurant line" shape="wide" priority />
      </section>
      <section className="narrow section-sm">
        <div className="principles" style={{ gridTemplateColumns: "1fr", gap: 32, marginTop: 0 }}>
          <div className="reveal"><h3>What we make</h3><p>Software and devices that save time, cut mistakes and help businesses sell more.</p></div>
          <div className="reveal"><h3>How we make it</h3><p>We start from how you already work and upgrade one step at a time.</p></div>
          <div className="reveal"><h3>First product</h3><p>PrepLabel, a prep label printer for restaurant kitchens.</p></div>
          <div className="reveal"><h3>Where we are</h3><p>{site.city}.</p></div>
        </div>
      </section>
    </>
  );
}
