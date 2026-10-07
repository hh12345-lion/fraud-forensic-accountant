import Image from "next/image";

const washes = {
  blue: "bg-copper",
  dark: "bg-navy",
} as const;

/**
 * Greyscale photograph blended into a brand colour so it reads as part of the
 * surface. Fills its positioned parent.
 */
export function TonedImage({
  src,
  alt = "",
  tone = "blue",
  strength = 0.6,
  sizes = "100vw",
  preload = false,
  position = "object-center",
  className = "",
}: {
  src: string;
  alt?: string;
  tone?: keyof typeof washes;
  strength?: number;
  sizes?: string;
  preload?: boolean;
  position?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden={alt === "" ? true : undefined}
      className={`absolute inset-0 overflow-hidden ${washes[tone]} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        quality={60}
        className={`object-cover mix-blend-luminosity ${position}`}
        style={{ opacity: strength }}
      />
    </div>
  );
}
