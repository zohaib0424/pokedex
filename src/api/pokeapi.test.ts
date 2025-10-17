import { describe, it, expect } from "vitest";
import { firstTypeColor } from "./pokeapi";

describe("firstTypeColor", () => {
  it("returns a hex color for a known type", () => {
    expect(firstTypeColor("fire")).toMatch(/^#([0-9a-f]{3}){1,2}$/i);
  });
});
