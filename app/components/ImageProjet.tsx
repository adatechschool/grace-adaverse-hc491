"use client";

import { useState, useEffect } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  fallback: string;
};

export default function ImageProjet({ src, alt, className, fallback }: Props) {
  const [imgSrc, setImgSrc] = useState(fallback); // fallback par défaut

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImgSrc(src);   // thumbnail existe → on l'affiche
    img.onerror = () => setImgSrc(fallback); // thumbnail absente → on garde le fallback
    img.src = src;
  }, [src, fallback]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
    />
  );
}