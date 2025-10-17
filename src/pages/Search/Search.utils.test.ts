import { describe, it, expect, vi } from "vitest";
import {
  generateRandomPokemonId,
  normalizeSearchQuery,
  isValidSearchQuery,
} from "./Search.utils";

describe("Search Utilities", () => {
  describe("generateRandomPokemonId", () => {
    it("generates a random number within default range", () => {
      const id = generateRandomPokemonId();
      expect(id).toBeGreaterThanOrEqual(1);
      expect(id).toBeLessThanOrEqual(898);
    });

    it("generates a random number within custom range", () => {
      const id = generateRandomPokemonId(1, 10);
      expect(id).toBeGreaterThanOrEqual(1);
      expect(id).toBeLessThanOrEqual(10);
    });

    it("generates different values on multiple calls", () => {
      const ids = new Set();
      for (let i = 0; i < 100; i++) {
        ids.add(generateRandomPokemonId());
      }
      // With 100 calls in a range of 898, we should get multiple unique values
      expect(ids.size).toBeGreaterThan(1);
    });

    it("handles range with single value", () => {
      const id = generateRandomPokemonId(5, 5);
      expect(id).toBe(5);
    });

    it("generates minimum value", () => {
      // Mock Math.random to return 0
      const originalRandom = Math.random;
      Math.random = vi.fn(() => 0);

      const id = generateRandomPokemonId(1, 10);
      expect(id).toBe(1);

      Math.random = originalRandom;
    });

    it("generates maximum value", () => {
      // Mock Math.random to return 0.999...
      const originalRandom = Math.random;
      Math.random = vi.fn(() => 0.9999999);

      const id = generateRandomPokemonId(1, 10);
      expect(id).toBe(10);

      Math.random = originalRandom;
    });

    it("returns integer values only", () => {
      for (let i = 0; i < 50; i++) {
        const id = generateRandomPokemonId();
        expect(Number.isInteger(id)).toBe(true);
      }
    });

    it("handles large ranges", () => {
      const id = generateRandomPokemonId(1, 10000);
      expect(id).toBeGreaterThanOrEqual(1);
      expect(id).toBeLessThanOrEqual(10000);
    });
  });

  describe("normalizeSearchQuery", () => {
    it("converts query to lowercase", () => {
      expect(normalizeSearchQuery("PIKACHU")).toBe("pikachu");
    });

    it("trims whitespace from start and end", () => {
      expect(normalizeSearchQuery("  pikachu  ")).toBe("pikachu");
    });

    it("converts uppercase to lowercase and trims", () => {
      expect(normalizeSearchQuery("  CHARIZARD  ")).toBe("charizard");
    });

    it("handles mixed case", () => {
      expect(normalizeSearchQuery("PiKaChU")).toBe("pikachu");
    });

    it("handles already normalized strings", () => {
      expect(normalizeSearchQuery("bulbasaur")).toBe("bulbasaur");
    });

    it("handles empty string", () => {
      expect(normalizeSearchQuery("")).toBe("");
    });

    it("handles string with only whitespace", () => {
      expect(normalizeSearchQuery("   ")).toBe("");
    });

    it("handles numbers as strings", () => {
      expect(normalizeSearchQuery("25")).toBe("25");
    });

    it("handles numbers with whitespace", () => {
      expect(normalizeSearchQuery("  25  ")).toBe("25");
    });

    it("preserves hyphens in names", () => {
      expect(normalizeSearchQuery("MR-MIME")).toBe("mr-mime");
    });

    it("handles special characters", () => {
      expect(normalizeSearchQuery("MR. MIME")).toBe("mr. mime");
    });

    it("handles single character", () => {
      expect(normalizeSearchQuery("A")).toBe("a");
    });

    it("handles tab and newline characters", () => {
      expect(normalizeSearchQuery("\tpikachu\n")).toBe("pikachu");
    });
  });

  describe("isValidSearchQuery", () => {
    it("returns true for valid pokemon name", () => {
      expect(isValidSearchQuery("pikachu")).toBe(true);
    });

    it("returns true for valid pokemon id", () => {
      expect(isValidSearchQuery("25")).toBe(true);
    });

    it("returns false for empty string", () => {
      expect(isValidSearchQuery("")).toBe(false);
    });

    it("returns false for string with only whitespace", () => {
      expect(isValidSearchQuery("   ")).toBe(false);
    });

    it("returns true for single character", () => {
      expect(isValidSearchQuery("a")).toBe(true);
    });

    it("returns true for uppercase query", () => {
      expect(isValidSearchQuery("PIKACHU")).toBe(true);
    });

    it("returns true for mixed case query", () => {
      expect(isValidSearchQuery("PiKaChU")).toBe(true);
    });

    it("returns true for query with leading/trailing whitespace", () => {
      expect(isValidSearchQuery("  pikachu  ")).toBe(true);
    });

    it("returns false for query with only tabs", () => {
      expect(isValidSearchQuery("\t\t")).toBe(false);
    });

    it("returns false for query with only newlines", () => {
      expect(isValidSearchQuery("\n\n")).toBe(false);
    });

    it("returns true for hyphenated names", () => {
      expect(isValidSearchQuery("mr-mime")).toBe(true);
    });

    it("returns true for query with special characters", () => {
      expect(isValidSearchQuery("type:null")).toBe(true);
    });

    it("returns true for very long query", () => {
      const longQuery = "a".repeat(1000);
      expect(isValidSearchQuery(longQuery)).toBe(true);
    });

    it("handles query normalization internally", () => {
      // These should behave the same as normalized queries
      expect(isValidSearchQuery("  PIKACHU  ")).toBe(true);
      expect(isValidSearchQuery("  ")).toBe(false);
    });

    it("returns true for number zero", () => {
      expect(isValidSearchQuery("0")).toBe(true);
    });

    it("returns true for negative numbers (even if not valid pokemon IDs)", () => {
      expect(isValidSearchQuery("-1")).toBe(true);
    });

    it("returns true for decimal numbers", () => {
      expect(isValidSearchQuery("25.5")).toBe(true);
    });
  });

  describe("Integration tests", () => {
    it("normalizeSearchQuery and isValidSearchQuery work together", () => {
      const query = "  PIKACHU  ";
      const normalized = normalizeSearchQuery(query);
      expect(isValidSearchQuery(normalized)).toBe(true);
    });

    it("handles complete search workflow", () => {
      const userInput = "  ChArIzArD  ";
      const normalized = normalizeSearchQuery(userInput);
      expect(normalized).toBe("charizard");
      expect(isValidSearchQuery(normalized)).toBe(true);
    });

    it("rejects empty input in workflow", () => {
      const userInput = "   ";
      const normalized = normalizeSearchQuery(userInput);
      expect(normalized).toBe("");
      expect(isValidSearchQuery(normalized)).toBe(false);
    });

    it("handles numeric input in workflow", () => {
      const userInput = "  25  ";
      const normalized = normalizeSearchQuery(userInput);
      expect(normalized).toBe("25");
      expect(isValidSearchQuery(normalized)).toBe(true);
    });
  });
});

