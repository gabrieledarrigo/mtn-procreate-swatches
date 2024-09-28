import { createPalettes, createSwatches, getColors } from "./createSwatches.ts";

const PER_CHUNK = 30;

(async () => {
  const colors = await getColors();
  const palettes = await createPalettes(colors, PER_CHUNK);

  await createSwatches(palettes);
})();
