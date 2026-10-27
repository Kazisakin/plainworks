"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Site-wide motion: reveal on scroll (.reveal, .clip, .st), parallax ([data-speed]) and count-up ([data-count]).
export default function Reveal() {
  const path = usePathname();
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = document.querySelectorAll<HTMLElement>(".reveal:not(.in), .clip:not(.in), .st:not(.in), [data-count]");

    const count = (el: HTMLElement) => {
      const end = Number(el.dataset.count || 0), suffix = el.dataset.suffix || "";
      if (reduce) { el.textContent = end + suffix; return; }
      const t0 = performance.now(), dur = 1400;
      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(end * e) + suffix;
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    let io: IntersectionObserver | null = null;
    if (!("IntersectionObserver" in window) || reduce) {
      targets.forEach((e) => { e.classList.add("in"); if (e.dataset.count) count(e); });
    } else {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.classList.add("in");
          if (el.dataset.count) count(el);
          io!.unobserve(el);
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
      targets.forEach((e) => io!.observe(e));
    }

    // parallax
    const layers = [...document.querySelectorAll<HTMLElement>("[data-speed]")];
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = innerHeight;
      layers.forEach((el) => {
        const r = el.parentElement!.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const offset = (r.top + r.height / 2 - vh / 2) * Number(el.dataset.speed);
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(${el.dataset.scale || 1})`;
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    if (!reduce && layers.length) { addEventListener("scroll", onScroll, { passive: true }); addEventListener("resize", onScroll); update(); }

    return () => { io?.disconnect(); removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [path]);
  return null;
}
