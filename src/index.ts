import { createPalettes, createSwatches, getColors } from "./createSwatches.ts";

const PER_PALETTE = 30;

(async () => {
  const colors = await getColors();
  const palettes = await createPalettes(colors, PER_PALETTE);

  await createSwatches(palettes);
})();
