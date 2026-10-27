import Image from "next/image";

type Props = {
  src: string; alt: string; caption?: string;
  shape?: "wide" | "tall" | "free" | "square";
  priority?: boolean; sizes?: string;
  speed?: number;   // parallax strength, e.g. 0.08
  className?: string;
};

// Photo with a wipe-in reveal and optional parallax.
export default function Photo({ src, alt, caption, shape = "tall", priority, sizes, speed = 0.06, className = "" }: Props) {
  return (
    <figure className={`photo clip ${shape === "free" ? "" : `photo-${shape}`} ${className}`}>
      <div className="photo-inner" data-speed={speed} data-scale="1.14">
        <Image src={src} alt={alt} fill sizes={sizes ?? (shape === "wide" ? "(max-width: 1200px) 100vw, 1200px" : "(max-width: 960px) 100vw, 600px")} priority={priority} quality={82} />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
