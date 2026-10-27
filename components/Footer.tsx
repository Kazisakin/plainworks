import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Link href="/" className="brand"><span className="mark" aria-hidden="true" />{site.name}</Link>
            <p className="muted" style={{ marginTop: 12, fontSize: 14, maxWidth: 280 }}>{site.tagline}</p>
          </div>
          <div className="footer-cols">
            <div>
              <b>Products</b>
              <Link href="/preplabel">PrepLabel</Link>
            </div>
            <div>
              <b>Company</b>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </div>
            <div>
              <b>Legal</b>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Designed in {site.city} · Photos from Unsplash</span>
        </div>
      </div>
    </footer>
  );
}
