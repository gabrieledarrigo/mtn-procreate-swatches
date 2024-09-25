import fs from "fs/promises";
import hexRgb from "hex-rgb";
import { createSwatchesFile } from "procreate-swatches";

export type RawColor = {
  name: string;
  hex: string;
};

export type Swatch = [
  [red: number, green: number, blue: number],
  format: "rgb"
];

export class Color {
  private constructor(
    public readonly name: string,
    public readonly hex: string,
    public readonly rgb: [
      red: number,
      green: number,
      blue: number,
      alpha: number
    ]
  ) {}

  public static from(name: string, hex: string): Color {
    return new Color(name, hex, hexRgb(hex, { format: "array" }));
  }

  public toSwatch(): Swatch {
    return [[this.rgb[0], this.rgb[1], this.rgb[2]], "rgb"];
  }
}

export class Palette {
  private constructor(
    public readonly name: string,
    public readonly swatches: Swatch[]
  ) {}

  public static from(name: string, swatches: Swatch[]): Palette {
    return new Palette(name, swatches);
  }
}

async function getColors(): Promise<Color[]> {
  return fs
    .readFile("data/colors.json", "utf-8")
    .then((json) => JSON.parse(json) as RawColor[])
    .then((colors) => colors.map((color) => Color.from(color.name, color.hex)));
}

const colors = await getColors();

const PER_CHUNK = 30;
const chunks = Math.ceil(colors.length / PER_CHUNK);
const palettes: Palette[] = [];

console.log(
  `There are ${colors.length} colors in total. There are ${chunks} chunks of 30 colors each.`
);

for (let i = 0; i < chunks; i++) {
  const chunk = colors.slice(i * PER_CHUNK, i * PER_CHUNK + PER_CHUNK);
  palettes.push(
    Palette.from(
      `MTN Hardcore ${i + 1}`,
      chunk.map((color) => color.toSwatch())
    )
  );
}

for (const palette of palettes) {
  console.log(`Creating swatches file for ${palette.name}`);

  const swatchesFile = await createSwatchesFile(palette.name, palette.swatches);
  await fs.writeFile(`data/swatches/${palette.name}.swatches`, swatchesFile);
}
