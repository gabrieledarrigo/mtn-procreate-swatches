import hexRgb from "hex-rgb";

/**
 * Represents a Procreate color swatch in THE RGB format.
 */
export type Swatch = [
  [red: number, green: number, blue: number],
  format: "rgb"
];

/**
 * Represents a color with a name, hexadecimal value, and RGBA components.
 */
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

  /**
   * Creates a new `Color` instance from the given name and hex string.
   *
   * @param name - The name of the color.
   * @param hex - The hexadecimal string representing the color.
   * @returns A new `Color` instance.
   */
  public static from(name: string, hex: string): Color {
    return new Color(name, hex, hexRgb(hex, { format: "array" }));
  }

  /**
   * Converts the current color instance to a Procreate swatch representation.
   *
   * @returns A Swatch tuple where the first element is an array of RGB values and the second element is color format. For now, only "rgb" is supported.
   */
  public toSwatch(): Swatch {
    return [[this.rgb[0], this.rgb[1], this.rgb[2]], "rgb"];
  }
}
