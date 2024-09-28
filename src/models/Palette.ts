import type { Swatch } from "./Color.ts";

/**
 * Represents a color palette consisting of a name and an array of Procreate swatches.
 */
export class Palette {
  private constructor(
    public readonly name: string,
    public readonly swatches: Swatch[]
  ) {}

  /**
   * Creates a new `Palette` instance from the given name and swatches.
   *
   * @param name - The name of the palette.
   * @param swatches - An array of `Swatch` objects that make up the palette.
   * @returns A new `Palette` instance.
   */
  public static from(name: string, swatches: Swatch[]): Palette {
    return new Palette(name, swatches);
  }
}
