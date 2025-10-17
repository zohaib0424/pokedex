import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  getPokemon,
  getSpecies,
  getEvolutionChain,
  getPokemonDetails,
} from "./pokeapi";
import type {
  PokemonAPI,
  PokemonSpeciesAPI,
  EvolutionChainAPI,
} from "../types/pokemon";

describe("PokeAPI Service", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  describe("getPokemon", () => {
    it("fetches pokemon by ID", async () => {
      const mockPokemon: Partial<PokemonAPI> = {
        id: 25,
        name: "pikachu",
        types: [
          {
            slot: 1,
            type: {
              name: "electric",
              url: "https://pokeapi.co/api/v2/type/13/",
            },
          },
        ],
        sprites: {
          other: {
            "official-artwork": {
              front_default: "https://example.com/pikachu.png",
            },
          },
        },
        stats: [],
        moves: [],
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockPokemon),
      });

      const result = await getPokemon(25);
      expect(result).toEqual(mockPokemon);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/pokemon/25")
      );
    });

    it("fetches pokemon by name", async () => {
      const mockPokemon: Partial<PokemonAPI> = {
        id: 25,
        name: "pikachu",
        types: [],
        sprites: {} as any,
        stats: [],
        moves: [],
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockPokemon),
      });

      const result = await getPokemon("pikachu");
      expect(result).toEqual(mockPokemon);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/pokemon/pikachu")
      );
    });

    it("throws error when request fails", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      });

      await expect(getPokemon(999999)).rejects.toThrow("Request failed: 404");
    });

    it("handles network errors", async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

      await expect(getPokemon(25)).rejects.toThrow("Network error");
    });
  });

  describe("getSpecies", () => {
    it("fetches species data by ID", async () => {
      const mockSpecies: Partial<PokemonSpeciesAPI> = {
        flavor_text_entries: [
          {
            flavor_text: "It is a cute electric mouse.",
            language: { name: "en", url: "" },
          },
        ],
        evolution_chain: {
          url: "https://pokeapi.co/api/v2/evolution-chain/10/",
        },
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockSpecies),
      });

      const result = await getSpecies(25);
      expect(result).toEqual(mockSpecies);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/pokemon-species/25")
      );
    });

    it("throws error when species not found", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      });

      await expect(getSpecies(999999)).rejects.toThrow("Request failed: 404");
    });
  });

  describe("getEvolutionChain", () => {
    it("fetches evolution chain data", async () => {
      const mockEvolutionChain: EvolutionChainAPI = {
        id: 10,
        chain: {
          species: { name: "pichu", url: "" },
          evolves_to: [
            {
              species: { name: "pikachu", url: "" },
              evolves_to: [
                {
                  species: { name: "raichu", url: "" },
                  evolves_to: [],
                },
              ],
            },
          ],
        },
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockEvolutionChain),
      });

      const url = "https://pokeapi.co/api/v2/evolution-chain/10/";
      const result = await getEvolutionChain(url);
      expect(result).toEqual(mockEvolutionChain);
      expect(global.fetch).toHaveBeenCalledWith(url);
    });

    it("throws error when evolution chain not found", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      });

      await expect(
        getEvolutionChain(
          "https://pokeapi.co/api/v2/evolution-chain/999999/"
        )
      ).rejects.toThrow("Request failed: 404");
    });
  });

  describe("getPokemonDetails", () => {
    it("fetches complete pokemon details", async () => {
      const mockPokemon: Partial<PokemonAPI> = {
        id: 25,
        name: "pikachu",
        types: [
          {
            slot: 1,
            type: { name: "electric", url: "" },
          },
        ],
        sprites: {
          other: {
            "official-artwork": {
              front_default: "https://example.com/pikachu.png",
            },
          },
        },
        stats: [
          { stat: { name: "hp", url: "" }, base_stat: 35 },
          { stat: { name: "attack", url: "" }, base_stat: 55 },
        ],
        moves: [
          {
            move: { name: "thunderbolt", url: "" },
            version_group_details: [
              {
                level_learned_at: 10,
                move_learn_method: { name: "level-up", url: "" },
                version_group: { name: "red-blue", url: "" },
              },
            ],
          },
        ],
      };

      const mockSpecies: Partial<PokemonSpeciesAPI> = {
        flavor_text_entries: [
          {
            flavor_text: "It is a cute\nelectric mouse.",
            language: { name: "en", url: "" },
          },
        ],
        evolution_chain: {
          url: "https://pokeapi.co/api/v2/evolution-chain/10/",
        },
      };

      const mockEvolutionChain: EvolutionChainAPI = {
        id: 10,
        chain: {
          species: { name: "pichu", url: "" },
          evolves_to: [
            {
              species: { name: "pikachu", url: "" },
              evolves_to: [
                {
                  species: { name: "raichu", url: "" },
                  evolves_to: [],
                },
              ],
            },
          ],
        },
      };

      global.fetch = vi
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockPokemon),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockSpecies),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockEvolutionChain),
        });

      const result = await getPokemonDetails(25);

      expect(result.id).toBe(25);
      expect(result.name).toBe("pikachu");
      expect(result.types).toEqual(["electric"]);
      expect(result.imageUrl).toBe("https://example.com/pikachu.png");
      expect(result.description).toBe("It is a cute electric mouse.");
      expect(result.stats).toHaveLength(2);
      expect(result.evolutions).toEqual(["pichu", "pikachu", "raichu"]);
      expect(result.moves).toHaveLength(1);
      expect(result.moves?.[0]).toEqual({ name: "thunderbolt", level: 10 });
    });

    it("handles pokemon with multiple types", async () => {
      const mockPokemon: Partial<PokemonAPI> = {
        id: 6,
        name: "charizard",
        types: [
          { slot: 1, type: { name: "fire", url: "" } },
          { slot: 2, type: { name: "flying", url: "" } },
        ],
        sprites: {
          other: {
            "official-artwork": {
              front_default: "https://example.com/charizard.png",
            },
          },
        },
        stats: [],
        moves: [],
      };

      const mockSpecies: Partial<PokemonSpeciesAPI> = {
        flavor_text_entries: [
          {
            flavor_text: "Spits fire that is hot enough to melt boulders.",
            language: { name: "en", url: "" },
          },
        ],
        evolution_chain: {
          url: "https://pokeapi.co/api/v2/evolution-chain/2/",
        },
      };

      const mockEvolutionChain: EvolutionChainAPI = {
        id: 2,
        chain: {
          species: { name: "charmander", url: "" },
          evolves_to: [],
        },
      };

      global.fetch = vi
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockPokemon),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockSpecies),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockEvolutionChain),
        });

      const result = await getPokemonDetails(6);

      expect(result.types).toEqual(["fire", "flying"]);
    });

    it("handles pokemon with no image", async () => {
      const mockPokemon: Partial<PokemonAPI> = {
        id: 1,
        name: "bulbasaur",
        types: [{ slot: 1, type: { name: "grass", url: "" } }],
        sprites: {
          other: {
            "official-artwork": {
              front_default: null,
            },
          },
        },
        stats: [],
        moves: [],
      };

      const mockSpecies: Partial<PokemonSpeciesAPI> = {
        flavor_text_entries: [],
        evolution_chain: {
          url: "https://pokeapi.co/api/v2/evolution-chain/1/",
        },
      };

      const mockEvolutionChain: EvolutionChainAPI = {
        id: 1,
        chain: {
          species: { name: "bulbasaur", url: "" },
          evolves_to: [],
        },
      };

      global.fetch = vi
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockPokemon),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockSpecies),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockEvolutionChain),
        });

      const result = await getPokemonDetails(1);

      expect(result.imageUrl).toBeNull();
    });

    it("filters moves to only include level-up moves", async () => {
      const mockPokemon: Partial<PokemonAPI> = {
        id: 25,
        name: "pikachu",
        types: [{ slot: 1, type: { name: "electric", url: "" } }],
        sprites: {
          other: { "official-artwork": { front_default: "url" } },
        },
        stats: [],
        moves: [
          {
            move: { name: "thunderbolt", url: "" },
            version_group_details: [
              {
                level_learned_at: 10,
                move_learn_method: { name: "level-up", url: "" },
                version_group: { name: "red-blue", url: "" },
              },
            ],
          },
          {
            move: { name: "thunder-wave", url: "" },
            version_group_details: [
              {
                level_learned_at: 0,
                move_learn_method: { name: "machine", url: "" },
                version_group: { name: "red-blue", url: "" },
              },
            ],
          },
        ],
      };

      const mockSpecies: Partial<PokemonSpeciesAPI> = {
        flavor_text_entries: [],
        evolution_chain: {
          url: "https://pokeapi.co/api/v2/evolution-chain/10/",
        },
      };

      const mockEvolutionChain: EvolutionChainAPI = {
        id: 10,
        chain: { species: { name: "pikachu", url: "" }, evolves_to: [] },
      };

      global.fetch = vi
        .fn()
        .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockPokemon) })
        .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockSpecies) })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockEvolutionChain),
        });

      const result = await getPokemonDetails(25);

      expect(result.moves).toHaveLength(1);
      expect(result.moves?.[0]?.name).toBe("thunderbolt");
    });

    it("sorts moves by level", async () => {
      const mockPokemon: Partial<PokemonAPI> = {
        id: 25,
        name: "pikachu",
        types: [{ slot: 1, type: { name: "electric", url: "" } }],
        sprites: {
          other: { "official-artwork": { front_default: "url" } },
        },
        stats: [],
        moves: [
          {
            move: { name: "thunderbolt", url: "" },
            version_group_details: [
              {
                level_learned_at: 50,
                move_learn_method: { name: "level-up", url: "" },
                version_group: { name: "red-blue", url: "" },
              },
            ],
          },
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
            move: { name: "quick-attack", url: "" },
            version_group_details: [
              {
                level_learned_at: 10,
                move_learn_method: { name: "level-up", url: "" },
                version_group: { name: "red-blue", url: "" },
              },
            ],
          },
        ],
      };

      const mockSpecies: Partial<PokemonSpeciesAPI> = {
        flavor_text_entries: [],
        evolution_chain: {
          url: "https://pokeapi.co/api/v2/evolution-chain/10/",
        },
      };

      const mockEvolutionChain: EvolutionChainAPI = {
        id: 10,
        chain: { species: { name: "pikachu", url: "" }, evolves_to: [] },
      };

      global.fetch = vi
        .fn()
        .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockPokemon) })
        .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockSpecies) })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockEvolutionChain),
        });

      const result = await getPokemonDetails(25);

      expect(result.moves?.[0]?.name).toBe("tackle");
      expect(result.moves?.[0]?.level).toBe(1);
      expect(result.moves?.[1]?.name).toBe("quick-attack");
      expect(result.moves?.[1]?.level).toBe(10);
      expect(result.moves?.[2]?.name).toBe("thunderbolt");
      expect(result.moves?.[2]?.level).toBe(50);
    });
  });
});
