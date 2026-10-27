"use client";
import { useEffect, useState } from "react";

// Headline whose words slide up one by one when it scrolls into view.
export function Split({ text, as: Tag = "h2", className = "", delay = 0 }: { text: string; as?: "h1" | "h2" | "h3" | "p"; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <Tag className={`st ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <span key={i}>
          <span className="w" aria-hidden="true"><span style={{ transitionDelay: `${delay + i * 0.06}s` }}>{w}</span></span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

// Word that rotates through a list.
export function Rotator({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);
  return (
    <span className="rotator" aria-live="polite">
      {words.map((w, j) => (
        <span key={w} className={j === i ? "on" : j === (i - 1 + words.length) % words.length ? "off" : ""} aria-hidden={j !== i}>{w}</span>
      ))}
      <span className="sizer" aria-hidden="true">{words.reduce((a, b) => (b.length > a.length ? b : a))}</span>
    </span>
  );
}

// Endless horizontal ticker.
export function Marquee({ items, dark = false }: { items: string[]; dark?: boolean }) {
  const row = [...items, ...items];
  return (
    <div className={`marquee ${dark ? "marquee-dark" : ""}`} aria-hidden="true">
      <div className="marquee-track">
        {row.map((t, i) => (<span key={i}>{t}<i>✦</i></span>))}
      </div>
    </div>
  );
}
