// Smaller copies of each client photo, made by scripts/client.mjs: photo-320.webp, photo-800.webp.
// Pass an image path to get a srcset, so phones download only what they need.
export const srcSetOf = (path) => {
  if (!path?.endsWith(".webp")) return undefined;
  const base = path.slice(0, -".webp".length);
  return `${base}-320.webp 320w, ${base}-800.webp 800w, ${path} 1600w`;
};
