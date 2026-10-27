import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Photo from "@/components/Photo";
import Viewer from "@/components/ViewerLoader";
import { Split } from "@/components/Motion";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "PrepLabel",
  description: "PrepLabel is an offline touchscreen label printer for restaurant kitchens. Category, item, print.",
};

const ic = {
  offline: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M2 8.8a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01M3 3l18 18" /></svg>,
  lock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>,
  usb: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="7" y="3" width="10" height="7" rx="1" /><path d="M5 10h14v6a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5z" /></svg>,
  log: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6M8 13h8M8 17h5" /></svg>,
};

const finishes = [
  { c: "arctic", name: "Arctic", bg: "#F1F1EE" },
  { c: "sage", name: "Sage", bg: "#E6EDE4" },
  { c: "clay", name: "Clay", bg: "#F4E6DD" },
  { c: "graphite", name: "Graphite", bg: "#E4E4E6" },
];

export default function PrepLabel() {
  return (
    <>
      <section className="wrap p-hero">
        <p className="eyebrow reveal">PrepLabel by Plainworks</p>
        <Split as="h1" text="Category. Item. Print." className="p-title" />
        <p className="lead reveal">A dated prep label in about two seconds. No handwriting, no Wi-Fi.</p>
        <div className="row reveal" style={{ justifyContent: "center" }}>
          <Link href="/contact?topic=pilot" className="btn btn-dark">Join the pilot</Link>
          <a href="#explore" className="btn btn-line">Explore in 3D</a>
        </div>
        <div className="p-hero-img reveal">
          <Image src="/renders/hero_arctic.webp" alt="PrepLabel printing a chicken breast label" width={1773} height={1711} priority sizes="(max-width: 960px) 100vw, 900px" />
        </div>
        <dl className="facts reveal">
          <div><dt>3</dt><dd>taps</dd></div>
          <div><dt>~2 s</dt><dd>per label</dd></div>
          <div><dt>0</dt><dd>wireless radios</dd></div>
        </dl>
      </section>

      <section className="wrap section-sm">
        <Photo src={photos.hands} alt="Cook slicing vegetables at a prep station" caption="Prep it. Label it. Move on." shape="wide" priority />
      </section>

      <section className="section wrap" id="why">
        <div className="center" style={{ marginBottom: 56 }}>
          <p className="eyebrow reveal">The problem → the solution</p>
          <Split text="Hand-written labels cost kitchens time, food and inspections." className="ps-title" />
        </div>
        <div className="ps">
          <div className="ps-card ps-problem reveal">
            <span className="ps-tag">Today</span>
            <h3>Tape, a marker and guesswork</h3>
            <ul>
              <li><b>Unreadable.</b> Smudged ink and rushed writing in the walk-in.</li>
              <li><b>Wrong dates.</b> Use-by worked out in someone&apos;s head at the end of a shift.</li>
              <li><b>No record.</b> When an inspector asks who prepped it and when, there&apos;s no answer.</li>
              <li><b>Waste.</b> When nobody trusts the label, good food gets thrown out.</li>
              <li><b>Slow.</b> Writing labels by hand eats prep time every day.</li>
            </ul>
          </div>
          <div className="ps-arrow reveal" aria-hidden="true">→</div>
          <div className="ps-card ps-solution reveal">
            <span className="ps-tag">With PrepLabel</span>
            <h3>Three taps, a perfect label</h3>
            <ul>
              <li><b>Always clear.</b> Printed, same layout every time.</li>
              <li><b>Right dates.</b> Use-by is calculated from each item&apos;s shelf life.</li>
              <li><b>Full record.</b> Every label is logged with item, time and staff initials.</li>
              <li><b>Less waste.</b> Staff trust the date, so food is used, not binned.</li>
              <li><b>About 2 seconds.</b> Category, item, print. Back to cooking.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section mist">
        <div className="wrap">
          <p className="eyebrow reveal">How it works</p>
          <h2 className="reveal">Anyone can use it on day one.</h2>
          <div className="steps">
            {[
              ["/ui/home.png", "Pick a category", "Home screen with categories"],
              ["/ui/items.png", "Tap the item", "List of items with shelf life"],
              ["/ui/preview.png", "Print", "Label preview with print button"],
            ].map(([src, t, alt], i) => (
              <div className="step reveal" key={t}>
                <div className="screen"><Image src={src} alt={alt} width={360} height={480} /></div>
                <span className="n">0{i + 1}</span>
                <h3>{t}</h3>
              </div>
            ))}
          </div>
          <div className="closeups">
            <div className="closeup reveal"><Image src="/renders/detail_screen.webp" alt="Close-up of the PrepLabel touchscreen" fill sizes="(max-width: 960px) 100vw, 600px" /><span>Works with gloves</span></div>
            <div className="closeup reveal"><Image src="/renders/detail_label.webp" alt="Close-up of a label coming out of the printer" fill sizes="(max-width: 960px) 100vw, 600px" /><span>Peels off the front</span></div>
          </div>
        </div>
      </section>

      <section className="section wrap split">
        <div className="label-stage reveal">
          <Image src="/ui/label.png" alt="55 by 40 mm prep label" width={660} height={480} />
        </div>
        <div className="reveal">
          <p className="eyebrow">The label</p>
          <h2>What inspectors look for.</h2>
          <ul className="list">
            <li><span>Item</span><span>Big and clear</span></li>
            <li><span>Made · Use by</span><span>Worked out for you</span></li>
            <li><span>Prepped by</span><span>Staff initials</span></li>
            <li><span>QR + number</span><span>Matches the print log</span></li>
          </ul>
        </div>
      </section>

      <section className="wrap section-sm">
        <div className="duo">
          <Photo src={photos.fridge} alt="Fridge shelves full of labelled food containers" caption="Readable at a glance." shape="free" />
          <Photo src={photos.herbs} alt="Chef chopping herbs on a green board" caption="Built for busy hands." shape="free" />
        </div>
      </section>

      <section className="section mist" id="explore">
        <div className="wrap">
          <div className="center" style={{ marginBottom: 48 }}>
            <p className="eyebrow reveal">Prototype</p>
            <h2 className="reveal">Turn it. Open it. Tap it.</h2>
          </div>
          <div className="reveal"><Viewer /></div>
        </div>
      </section>

      <section className="section wrap">
        <p className="eyebrow reveal">Features</p>
        <h2 className="reveal" style={{ maxWidth: "13em" }}>Simple on the line. Strict where it counts.</h2>
        <div className="features">
          <div className="feature reveal tilt" style={{ background: "#E9F1EA" }}><span className="icon">{ic.offline}</span><div><h3>Offline</h3><p>No Wi-Fi, Bluetooth or cloud.</p></div></div>
          <div className="feature reveal tilt" style={{ background: "#F4ECE3" }}><span className="icon">{ic.lock}</span><div><h3>Locked template</h3><p>Every label looks the same.</p></div></div>
          <div className="feature reveal tilt" style={{ background: "#E8EEF4" }}><span className="icon">{ic.usb}</span><div><h3>USB setup</h3><p>Edit items from your laptop.</p></div></div>
          <div className="feature reveal tilt" style={{ background: "#F3EEDF" }}><span className="icon">{ic.log}</span><div><h3>Print log</h3><p>Export every label to a sheet.</p></div></div>
        </div>
      </section>

      <section className="section mist">
        <div className="wrap split">
          <div className="reveal">
            <Image src="/renders/lid_open.webp" alt="PrepLabel with lid open showing the label roll" width={1800} height={1664} sizes="(max-width: 960px) 100vw, 560px" />
          </div>
          <div className="reveal">
            <p className="eyebrow">Roll change</p>
            <h2>New roll in ten seconds.</h2>
            <ol className="roll">
              <li>Lift the lid</li>
              <li>Drop in the roll</li>
              <li>Pull 2 cm out</li>
              <li>Close it</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="section wrap">
        <div className="center">
          <p className="eyebrow reveal">Finishes</p>
          <h2 className="reveal">Pick one that fits your kitchen.</h2>
        </div>
        <div className="finishes">
          {finishes.map((f) => (
            <div className="finish reveal tilt" key={f.c} style={{ background: f.bg }}>
              <Image src={`/renders/hero_${f.c}.webp`} alt={`PrepLabel in ${f.name}`} width={1773} height={1711} sizes="(max-width: 960px) 50vw, 300px" />
              {f.name}
            </div>
          ))}
        </div>
      </section>

      <section className="section mist">
        <div className="wrap split">
          <div className="reveal">
            <p className="eyebrow">Specs</p>
            <h2>The details.</h2>
            <Image src="/renders/rear.webp" alt="Back of PrepLabel with USB-C, power and switch" width={1800} height={1472} sizes="(max-width: 960px) 100vw, 560px" style={{ marginTop: 32 }} />
          </div>
          <table className="spec reveal">
            <tbody>
              <tr><th>Size</th><td>140 × 162 × 105 mm</td></tr>
              <tr><th>Screen</th><td>2.8&quot; touch, works with gloves</td></tr>
              <tr><th>Print</th><td>Direct thermal, 203 dpi, no ink</td></tr>
              <tr><th>Labels</th><td>55 × 40 mm, roll up to 50 mm</td></tr>
              <tr><th>Clock</th><td>Battery-backed</td></tr>
              <tr><th>Setup</th><td>USB-C only</td></tr>
              <tr><th>Power</th><td>12 V adapter</td></tr>
              <tr><th>Finishes</th><td>Arctic, sage, clay, graphite</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap section">
        <div className="duo" style={{ alignItems: "stretch" }}>
          <Photo src={photos.portrait} alt="Chef in a white jacket with arms crossed" shape="free" />
          <div className="cta reveal" style={{ display: "grid", alignContent: "center" }}>
            <h2>Try it in your kitchen.</h2>
            <p>We&apos;re placing early units with a few restaurants.</p>
            <div className="row" style={{ justifyContent: "center" }}>
              <Link href="/contact?topic=pilot" className="btn btn-light">Join the pilot</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
