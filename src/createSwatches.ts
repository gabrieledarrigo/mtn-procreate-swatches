import fs from "fs/promises";
import { createSwatchesFile } from "procreate-swatches";
import { Color } from "./models/Color.ts";
import { Palette } from "./models/Palette.ts";

export type RawColor = {
  name: string;
  hex: string;
};

export async function getColors(from: string): Promise<Color[]> {
  return fs
    .readFile(from, "utf-8")
    .then((json) => JSON.parse(json) as RawColor[])
    .then((colors) => colors.map((color) => Color.from(color.name, color.hex)));
}

export async function createPalettes(
  colors: Color[],
  paletteName: string,
  perPalette: number
): Promise<Palette[]> {
  const swatches = Math.ceil(colors.length / perPalette);
  const palettes: Palette[] = [];

  console.log(
    `There are ${colors.length} colors in total. There are ${swatches} swatches of ${perPalette} colors each.`
  );

  for (let i = 0; i < swatches; i++) {
    const swatch = colors.slice(i * perPalette, i * perPalette + perPalette);
    palettes.push(
      Palette.from(
        `${paletteName} ${i + 1}`,
        swatch.map((color) => color.toSwatch())
      )
    );
  }

  return palettes;
}

export async function createSwatches(
  palettes: Palette[],
  to: string
): Promise<void> {
  for (const palette of palettes) {
    console.log(`Creating swatches file for ${palette.name} in ${to}`);

    const swatchesFile = await createSwatchesFile(
      palette.name,
      palette.swatches
    );
    await fs.writeFile(`${to}/${palette.name}.swatches`, swatchesFile);
  }
}
