"use client";

import { useEffect, useState, useRef } from "react";

export default function TransparentPlanet({ src, alt, className = "", style = {} }) {
  const [processedSrc, setProcessedSrc] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      // Use original image dimensions
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Loop through all pixels (r, g, b, a)
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        // Find the maximum color value to check brightness
        const maxColor = Math.max(r, g, b);

        // Threshold for black/very dark background
        const threshold = 28;

        if (maxColor < threshold) {
          // Completely transparent
          data[i + 3] = 0;
        } else if (maxColor < 50) {
          // Smooth blend out of dark halos
          const factor = (maxColor - threshold) / (50 - threshold);
          data[i + 3] = Math.round(a * factor);
        }
      }

      ctx.putImageData(imgData, 0, 0);
      try {
        setProcessedSrc(canvas.toDataURL("image/png"));
      } catch (err) {
        console.error("Canvas export failed, falling back to original source", err);
        setProcessedSrc(src);
      }
    };

    img.onerror = () => {
      setProcessedSrc(src);
    };
  }, [src]);

  // Before processing, or if processing fails, show fallback placeholder or transparent block
  return (
    <img
      src={processedSrc || src}
      alt={alt}
      className={className}
      style={{
        ...style,
        opacity: processedSrc ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    />
  );
}
