import Image from "next/image";
import Link from "next/link";
import Photo from "@/components/Photo";
import { photos } from "@/lib/photos";

export default function Home() {
  return (
    <>
      <section className="wrap home-hero">
        <p className="eyebrow reveal">Plainworks</p>
        <h1 className="reveal">Upgrade the systems you already run.</h1>
        <p className="lead reveal">We build products that make a business faster, more accurate, and better at selling, without replacing what already works.</p>
      </section>

      <section className="wrap">
        <Link href="/preplabel" className="product-card reveal">
          <div>
            <span className="tag"><span className="dot" />First product</span>
            <h2>PrepLabel</h2>
            <p className="lead">Food-prep labels in three taps.</p>
            <span className="btn btn-dark" style={{ marginTop: 32 }}>See PrepLabel <span className="arrow">→</span></span>
          </div>
          <Image src="/renders/hero_sage.webp" alt="PrepLabel label printer in sage" width={1773} height={1711} priority sizes="(max-width: 960px) 100vw, 640px" />
        </Link>
      </section>

      <section className="wrap section-sm">
        <div className="duo">
          <Photo src={photos.kitchenWarm} alt="Chef working at the pass in a warm restaurant kitchen" caption="Built for the line." shape="free" />
          <Photo src={photos.ingredients} alt="Fresh ingredients laid out on a board" caption="Less admin. More cooking." shape="free" />
        </div>
      </section>

      <section className="wrap section-sm">
        <p className="eyebrow reveal">How we build</p>
        <h2 className="reveal" style={{ maxWidth: "14em" }}>Upgrade, don&apos;t replace.</h2>
        <div className="principles">
          <div className="reveal"><span className="n">01</span><h3>Fits what you have</h3><p>Works alongside the way you already run things.</p></div>
          <div className="reveal"><span className="n">02</span><h3>Saves time</h3><p>Fewer manual steps and fewer mistakes, every shift.</p></div>
          <div className="reveal"><span className="n">03</span><h3>Plain to use</h3><p>A new hire gets it right on day one.</p></div>
        </div>
      </section>

      <section className="wrap section-sm">
        <Photo src={photos.counter} alt="Restaurant owner standing at the counter" caption="For owners who'd rather be on the floor." shape="wide" />
      </section>

      <section className="wrap section-sm">
        <div className="soon">
          <div className="soon-card reveal"><span>Coming next</span><b>More products for busy businesses</b></div>
          <div className="soon-card reveal"><span>Have a problem we should solve?</span><Link href="/contact"><b>Tell us →</b></Link></div>
        </div>
      </section>
    </>
  );
}
