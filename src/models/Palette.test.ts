import { describe, it, expect } from "bun:test";
import { Palette } from "./Palette.ts";
import type { Swatch } from "./Color.ts";

describe("Palette", () => {
  it("should create a Palette instance", () => {
    const name = "Test Palette";
    const swatches: Swatch[] = [
      [[0, 0, 0], "rgb"],
      [[255, 255, 255], "rgb"],
    ];

    const palette = Palette.from(name, swatches);

    expect(palette).toBeInstanceOf(Palette);
    expect(palette.name).toBe(name);
    expect(palette.swatches).toBe(swatches);
  });
});
