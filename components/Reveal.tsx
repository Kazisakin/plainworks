"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Fades in any element with class "reveal" as it scrolls into view.
export default function Reveal() {
  const path = usePathname();
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [path]);
  return null;
}
