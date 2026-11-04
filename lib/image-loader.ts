import type { ImageLoaderProps } from "next/image";

// Static export has no image optimizer, so Cloudinary resizes and re-encodes
// (f_auto serves AVIF/WebP). c_limit never upscales past the original.
export default function imageLoader({ src, width }: ImageLoaderProps) {
  if (!src.startsWith("https://res.cloudinary.com/")) return src;
  return src.replace(
    "/image/upload/",
    `/image/upload/f_auto,q_auto,c_limit,w_${width}/`,
  );
}
