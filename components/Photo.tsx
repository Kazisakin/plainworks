import Image from "next/image";

type Props = { src: string; alt: string; caption?: string; shape?: "wide" | "tall" | "free"; priority?: boolean; sizes?: string };

export default function Photo({ src, alt, caption, shape = "tall", priority, sizes }: Props) {
  return (
    <figure className={`photo ${shape === "free" ? "" : `photo-${shape}`} reveal`}>
      <Image src={src} alt={alt} fill sizes={sizes ?? (shape === "wide" ? "(max-width: 1200px) 100vw, 1200px" : "(max-width: 960px) 100vw, 600px")} priority={priority} quality={82} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
