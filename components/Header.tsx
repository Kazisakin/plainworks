"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/site";

export default function Header() {
  const path = usePathname();
  return (
    <header className="header">
      <div className="wrap header-in">
        <Link href="/" className="brand" aria-label={`${site.name} home`}>
          <span className="mark" aria-hidden="true" />
          {site.name}
        </Link>
        <nav className="menu" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={path === n.href ? "page" : undefined} className={n.href === "/about" ? "hide-sm" : undefined}>
              {n.label}
            </Link>
          ))}
          <Link href="/contact?topic=invest" className="btn btn-dark btn-sm hide-sm">Work with us</Link>
        </nav>
      </div>
    </header>
  );
}
