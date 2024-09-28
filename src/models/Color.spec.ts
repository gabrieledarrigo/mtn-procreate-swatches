import { describe, it, expect } from "bun:test";
import { Color } from "./Color.ts";

describe("Color", () => {
  it("should create a Color instance", () => {
    const color = Color.from("Black", "#000000");

    expect(color.name).toEqual("Black");
    expect(color.hex).toEqual("#000000");
    expect(color.rgb).toEqual([0, 0, 0, 1]);
  });
});
