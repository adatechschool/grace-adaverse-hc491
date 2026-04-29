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
        e.currentTarget.src =
          "https://campusnumerique.auvergnerhonealpes.fr/app/uploads/2024/06/Logo-Ada-Tech-School.png"; // ← si l'image ne charge pas
         e.currentTarget.onerror = null; // ← évite une boucle infinie
      }}
    />
  );
}
