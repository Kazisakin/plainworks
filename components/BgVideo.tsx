// Muted, looping background video with a dark fallback while it loads.
export default function BgVideo({ src, srcMobile, className = "", label }: { src: string; srcMobile?: string; className?: string; label?: string }) {
  return (
    <video className={`bg-video ${className}`} autoPlay muted loop playsInline preload="metadata" aria-label={label} aria-hidden={label ? undefined : true}>
      {srcMobile && <source src={srcMobile} type="video/mp4" media="(max-width: 760px)" />}
      <source src={src} type="video/mp4" />
    </video>
  );
}
