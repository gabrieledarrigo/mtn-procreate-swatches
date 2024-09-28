import { createPalettes, createSwatches, getColors } from "./createSwatches.ts";

const PER_PALETTE = 30;
const PALETTE_NAME = "MTN Hardcore";
const MTN_COLORS_JSON = "data/colors.json";
const MTN_SWATCHES_FOLDER = "data/swatches";

(async () => {
  const colors = await getColors(MTN_COLORS_JSON);
  const palettes = await createPalettes(colors, PALETTE_NAME, PER_PALETTE);

  await createSwatches(palettes, MTN_SWATCHES_FOLDER);
})();
