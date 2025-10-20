import { describe, it, expect } from "vitest";
import {
  extractPokemonTypes,
  extractImageUrl,
  transformStats,
  extractDescription,
  extractEvolutionChain,
  extractLevelUpMoves,
  transformPokemonDetails,
} from "./pokemon";
import {
  PokemonAPI,
  PokemonSpeciesAPI,
  EvolutionChainAPI,
} from "@/types/pokemon";

describe("pokemon.utils", () => {
  describe("extractPokemonTypes", () => {
    it("should extract and sort types by slot", () => {
      const mockPokemon = {
        types: [
          { slot: 2, type: { name: "flying", url: "" } },
          { slot: 1, type: { name: "fire", url: "" } },
        ],
      } as PokemonAPI;

      const result = extractPokemonTypes(mockPokemon);
      expect(result).toEqual(["fire", "flying"]);
    });
  });

  describe("extractImageUrl", () => {
    it("should extract official artwork URL", () => {
      const mockPokemon = {
        sprites: {
          other: {
            "official-artwork": {
              front_default: "https://example.com/image.png",
            },
          },
        },
      } as PokemonAPI;

      const result = extractImageUrl(mockPokemon);
      expect(result).toBe("https://example.com/image.png");
    });

    it("should return null if artwork is missing", () => {
      const mockPokemon = {
        sprites: {},
      } as PokemonAPI;

      const result = extractImageUrl(mockPokemon);
      expect(result).toBeNull();
    });
  });

  describe("transformStats", () => {
    it("should transform stats to simpler format", () => {
      const mockPokemon = {
        stats: [
          { base_stat: 45, stat: { name: "hp", url: "" } },
          { base_stat: 49, stat: { name: "attack", url: "" } },
        ],
      } as PokemonAPI;

      const result = transformStats(mockPokemon);
      expect(result).toEqual([
        { name: "hp", value: 45 },
        { name: "attack", value: 49 },
      ]);
    });
  });

  describe("extractDescription", () => {
    it("should extract English description and clean whitespace", () => {
      const mockSpecies = {
        flavor_text_entries: [
          {
            flavor_text: "A  fire\ntype   pokemon",
            language: { name: "en", url: "" },
          },
          {
            flavor_text: "Un pokemon de fuego",
            language: { name: "es", url: "" },
          },
        ],
      } as PokemonSpeciesAPI;

      const result = extractDescription(mockSpecies);
      expect(result).toBe("A fire type pokemon");
    });

    it("should return undefined if no English description exists", () => {
      const mockSpecies = {
        flavor_text_entries: [
          {
            flavor_text: "Un pokemon de fuego",
            language: { name: "es", url: "" },
          },
        ],
      } as PokemonSpeciesAPI;

      const result = extractDescription(mockSpecies);
      expect(result).toBeUndefined();
    });
  });

  describe("extractEvolutionChain", () => {
    it("should extract all evolution names from chain", () => {
      const mockChain = {
        id: 1,
        chain: {
          species: { name: "bulbasaur", url: "" },
          evolves_to: [
            {
              species: { name: "ivysaur", url: "" },
              evolves_to: [
                {
                  species: { name: "venusaur", url: "" },
                  evolves_to: [],
                },
              ],
            },
          ],
        },
      } as EvolutionChainAPI;

      const result = extractEvolutionChain(mockChain);
      expect(result).toEqual(["bulbasaur", "ivysaur", "venusaur"]);
    });

    it("should handle single evolution (no evolutions)", () => {
      const mockChain = {
        id: 1,
        chain: {
          species: { name: "ditto", url: "" },
          evolves_to: [],
        },
      } as EvolutionChainAPI;

      const result = extractEvolutionChain(mockChain);
      expect(result).toEqual(["ditto"]);
    });
  });

  describe("extractLevelUpMoves", () => {
    it("should extract and sort level-up moves", () => {
      const mockPokemon = {
        moves: [
          {
            move: { name: "tackle", url: "" },
            version_group_details: [
              {
                level_learned_at: 1,
                move_learn_method: { name: "level-up", url: "" },
                version_group: { name: "red-blue", url: "" },
              },
            ],
          },
          {
            move: { name: "ember", url: "" },
            version_group_details: [
              {
                level_learned_at: 7,
                move_learn_method: { name: "level-up", url: "" },
                version_group: { name: "red-blue", url: "" },
              },
            ],
          },
          {
            move: { name: "cut", url: "" },
            version_group_details: [
              {
                level_learned_at: 0,
                move_learn_method: { name: "machine", url: "" },
                version_group: { name: "red-blue", url: "" },
              },
            ],
          },
        ],
      } as PokemonAPI;

      const result = extractLevelUpMoves(mockPokemon);
      expect(result).toEqual([
        { name: "tackle", level: 1 },
        { name: "ember", level: 7 },
      ]);
      expect(result).not.toContainEqual(
        expect.objectContaining({ name: "cut" })
      );
    });
  });

  describe("transformPokemonDetails", () => {
    it("should combine all transformations into PokemonDetails", () => {
      const mockPokemon = {
        id: 1,
        name: "bulbasaur",
        types: [{ slot: 1, type: { name: "grass", url: "" } }],
        sprites: {
          other: {
            "official-artwork": {
              front_default: "https://example.com/bulbasaur.png",
            },
          },
        },
        stats: [{ base_stat: 45, stat: { name: "hp", url: "" } }],
        moves: [
          {
            move: { name: "tackle", url: "" },
            version_group_details: [
              {
                level_learned_at: 1,
                move_learn_method: { name: "level-up", url: "" },
                version_group: { name: "red-blue", url: "" },
              },
            ],
          },
        ],
      } as PokemonAPI;

      const mockSpecies = {
        flavor_text_entries: [
          {
            flavor_text: "A seed pokemon",
            language: { name: "en", url: "" },
          },
        ],
        evolution_chain: { url: "" },
      } as PokemonSpeciesAPI;

      const mockEvolutionChain = {
        id: 1,
        chain: {
          species: { name: "bulbasaur", url: "" },
          evolves_to: [],
        },
      } as EvolutionChainAPI;

      const result = transformPokemonDetails(
        mockPokemon,
        mockSpecies,
        mockEvolutionChain
      );

      expect(result).toEqual({
        id: 1,
        name: "bulbasaur",
        types: ["grass"],
        imageUrl: "https://example.com/bulbasaur.png",
        description: "A seed pokemon",
        stats: [{ name: "hp", value: 45 }],
        evolutions: ["bulbasaur"],
        moves: [{ name: "tackle", level: 1 }],
      });
    });
  });
});

