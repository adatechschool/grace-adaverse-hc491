"use client";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

export default function ImageProjet({ src, alt, className }: Props) {
  return (
    <img
      src={src} // ← si src vide, fallback direct
      alt={alt}
      className={className}
      onError={(e) => {
        e.currentTarget.src ="/Logo-Ada-Tech-School.webp"; // ← si l'image ne charge pas
      
      }}
    />
  );
}
