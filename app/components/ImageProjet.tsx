"use client";

import { useState, useEffect } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  fallback: string;
};

const DEFAULT_IMAGE = "/Logo-Ada-Tech-School.webp";

export default function ImageProjet({ src, alt, className, fallback }: Props) {
  const [imgSrc, setImgSrc] = useState(fallback); // fallback par défaut

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImgSrc(src);
    img.onerror = () => {
      // fallback aussi cassé ? → image locale
      const fallbackImg = new Image();
      fallbackImg.onload = () => setImgSrc(fallback);
      fallbackImg.onerror = () => setImgSrc(DEFAULT_IMAGE);
      fallbackImg.src = fallback;
    };
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