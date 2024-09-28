import fs from "fs/promises";
import { createSwatchesFile } from "procreate-swatches";
import { Color } from "./models/Color.ts";
import { Palette } from "./models/Palette.ts";

export type RawColor = {
  name: string;
  hex: string;
};

export async function getColors(): Promise<Color[]> {
  return fs
    .readFile("data/colors.json", "utf-8")
    .then((json) => JSON.parse(json) as RawColor[])
    .then((colors) => colors.map((color) => Color.from(color.name, color.hex)));
}

export async function createPalettes(
  colors: Color[],
  perChunk: number
): Promise<Palette[]> {
  const chunks = Math.ceil(colors.length / perChunk);
  const palettes: Palette[] = [];

  console.log(
    `There are ${colors.length} colors in total. There are ${chunks} chunks of 30 colors each.`
  );

  for (let i = 0; i < chunks; i++) {
    const chunk = colors.slice(i * perChunk, i * perChunk + perChunk);
    palettes.push(
      Palette.from(
        `MTN Hardcore ${i + 1}`,
        chunk.map((color) => color.toSwatch())
      )
    );
  }

  return palettes;
}

export async function createSwatches(palettes: Palette[]): Promise<void> {
  for (const palette of palettes) {
    console.log(`Creating swatches file for ${palette.name}`);

    const swatchesFile = await createSwatchesFile(
      palette.name,
      palette.swatches
    );
    await fs.writeFile(`data/swatches/${palette.name}.swatches`, swatchesFile);
  }
}
