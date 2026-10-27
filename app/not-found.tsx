import Link from "next/link";

export default function NotFound() {
  return (
    <section className="narrow center" style={{ padding: "160px 0" }}>
      <p className="eyebrow">404</p>
      <h1 style={{ fontSize: "clamp(40px,6vw,72px)" }}>Page not found.</h1>
      <div className="row"><Link href="/" className="btn btn-dark">Back home</Link></div>
    </section>
  );
}
