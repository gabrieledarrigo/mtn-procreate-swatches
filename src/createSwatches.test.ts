import { describe, expect, it, spyOn, beforeEach } from "bun:test";
import fs from "fs/promises";
import * as procreate from "procreate-swatches";
import { getColors, createSwatches, createPalettes } from "./createSwatches.ts";
import { Color } from "./models/Color.ts";
import { Palette } from "./models/Palette.ts";

describe("getColors", () => {
  beforeEach(() => {
    spyOn(console, "log").mockReturnValue(undefined);
  });

  it("should read colors from the JSON file and return an array of Color instances", async () => {
    const colors = [
      { name: "Red", hex: "#FF0000" },
      { name: "Green", hex: "#00FF00" },
      { name: "Blue", hex: "#0000FF" },
    ];

    spyOn(fs, "readFile").mockResolvedValue(JSON.stringify(colors));

    const actual = await getColors();

    expect(fs.readFile).toHaveBeenCalledWith("data/colors.json", "utf-8");

    expect(actual[0].name).toBe("Red");
    expect(actual[0].hex).toBe("#FF0000");
    expect(actual[1].name).toBe("Green");
    expect(actual[1].hex).toBe("#00FF00");
    expect(actual[2].name).toBe("Blue");
    expect(actual[2].hex).toBe("#0000FF");
  });
});

describe("createPalettes", () => {
  it("should create an array of palettes, divided by chunk, with the given colors", async () => {
    const colors = [
      Color.from("Red", "#FF0000"),
      Color.from("Green", "#00FF00"),
      Color.from("Blue", "#0000FF"),
    ];

    const palettes = await createPalettes(colors, 2);

    expect(palettes[0].name).toBe("MTN Hardcore 1");
    expect(palettes[0].swatches).toEqual([
      colors[0].toSwatch(),
      colors[1].toSwatch(),
    ]);
    expect(palettes[1].name).toBe("MTN Hardcore 2");
    expect(palettes[1].swatches).toEqual([colors[2].toSwatch()]);
  });
});

describe("createSwatches", () => {
  it("should create swatches files for the given colors", async () => {
    const colors = [
      Color.from("Red", "#FF0000"),
      Color.from("Green", "#00FF00"),
      Color.from("Blue", "#0000FF"),
    ];

    const palettes = [
      Palette.from(
        "MTN Hardcore 1",
        colors.map((color) => color.toSwatch())
      ),
    ];

    spyOn(procreate, "createSwatchesFile").mockResolvedValue(
      JSON.stringify(colors)
    );
    spyOn(fs, "writeFile").mockResolvedValue(undefined);

    await createSwatches(palettes);

    expect(fs.writeFile).toHaveBeenCalledWith(
      "data/swatches/MTN Hardcore 1.swatches",
      JSON.stringify(colors)
    );
  });
});
