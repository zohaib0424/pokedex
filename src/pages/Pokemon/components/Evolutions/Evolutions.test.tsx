import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { Evolutions } from "./Evolutions";
import * as pokeapi from "@/services/pokeapi";
import type { PokemonAPI } from "@/types/pokemon";

vi.mock("@/services/pokeapi", () => ({
  getPokemon: vi.fn(),
}));

describe("Evolutions Component", () => {
  const mockColor = "#7AC74C";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays loading state initially", () => {
    vi.mocked(pokeapi.getPokemon).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    render(<Evolutions evolutions={["bulbasaur"]} color={mockColor} />);

    expect(screen.getByText("Loading evolutions...")).toBeInTheDocument();
  });

  it("displays 'No evolutions available' when evolutions array is empty", async () => {
    render(<Evolutions evolutions={[]} color={mockColor} />);

    await waitFor(() => {
      expect(screen.getByText("No evolutions available")).toBeInTheDocument();
    });
  });

  it("displays 'This Pokémon does not evolve' when only one evolution exists", async () => {
    vi.mocked(pokeapi.getPokemon).mockResolvedValue({
      id: 25,
      name: "pikachu",
      sprites: {
        other: {
          "official-artwork": {
            front_default: "https://example.com/pikachu.png",
          },
        },
      },
    } as PokemonAPI);

    render(<Evolutions evolutions={["pikachu"]} color={mockColor} />);

    await waitFor(() => {
      expect(
        screen.getByText("This Pokémon does not evolve")
      ).toBeInTheDocument();
    });
  });

  it("renders evolution chain for multiple evolutions", async () => {
    vi.mocked(pokeapi.getPokemon)
      .mockResolvedValueOnce({
        id: 1,
        name: "bulbasaur",
        sprites: {
          other: {
            "official-artwork": {
              front_default: "https://example.com/bulbasaur.png",
            },
          },
        },
      } as PokemonAPI)
      .mockResolvedValueOnce({
        id: 2,
        name: "ivysaur",
        sprites: {
          other: {
            "official-artwork": {
              front_default: "https://example.com/ivysaur.png",
            },
          },
        },
      } as PokemonAPI)
      .mockResolvedValueOnce({
        id: 3,
        name: "venusaur",
        sprites: {
          other: {
            "official-artwork": {
              front_default: "https://example.com/venusaur.png",
            },
          },
        },
      } as PokemonAPI);

    render(
      <Evolutions
        evolutions={["bulbasaur", "ivysaur", "venusaur"]}
        color={mockColor}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("bulbasaur")).toBeInTheDocument();
      expect(screen.getByText("ivysaur")).toBeInTheDocument();
      expect(screen.getByText("venusaur")).toBeInTheDocument();
    });
  });

  it("renders evolution images", async () => {
    vi.mocked(pokeapi.getPokemon)
      .mockResolvedValueOnce({
        id: 1,
        name: "bulbasaur",
        sprites: {
          other: {
            "official-artwork": {
              front_default: "https://example.com/bulbasaur.png",
            },
          },
        },
      } as PokemonAPI)
      .mockResolvedValueOnce({
        id: 2,
        name: "ivysaur",
        sprites: {
          other: {
            "official-artwork": {
              front_default: "https://example.com/ivysaur.png",
            },
          },
        },
      } as PokemonAPI);

    render(
      <Evolutions evolutions={["bulbasaur", "ivysaur"]} color={mockColor} />
    );

    await waitFor(() => {
      const bulbasaurImg = screen.getByAltText("bulbasaur");
      const ivysaurImg = screen.getByAltText("ivysaur");

      expect(bulbasaurImg).toBeInTheDocument();
      expect(bulbasaurImg).toHaveAttribute(
        "src",
        "https://example.com/bulbasaur.png"
      );
      expect(ivysaurImg).toBeInTheDocument();
      expect(ivysaurImg).toHaveAttribute(
        "src",
        "https://example.com/ivysaur.png"
      );
    });
  });

  it("renders arrow between evolutions", async () => {
    vi.mocked(pokeapi.getPokemon)
      .mockResolvedValueOnce({
        id: 1,
        name: "bulbasaur",
        sprites: {
          other: {
            "official-artwork": {
              front_default: "https://example.com/bulbasaur.png",
            },
          },
        },
      } as PokemonAPI)
      .mockResolvedValueOnce({
        id: 2,
        name: "ivysaur",
        sprites: {
          other: {
            "official-artwork": {
              front_default: "https://example.com/ivysaur.png",
            },
          },
        },
      } as PokemonAPI);

    const { container } = render(
      <Evolutions evolutions={["bulbasaur", "ivysaur"]} color={mockColor} />
    );

    await waitFor(() => {
      const svgElements = container.querySelectorAll("svg");
      // At least one SVG should be rendered for the arrow
      expect(svgElements.length).toBeGreaterThan(0);
    });
  });

  it("handles missing image gracefully", async () => {
    vi.mocked(pokeapi.getPokemon).mockResolvedValueOnce({
      id: 1,
      name: "bulbasaur",
      sprites: {
        other: {
          "official-artwork": {
            front_default: null,
          },
        },
      },
    } as PokemonAPI);

    render(<Evolutions evolutions={["bulbasaur"]} color={mockColor} />);

    await waitFor(() => {
      expect(
        screen.getByText("This Pokémon does not evolve")
      ).toBeInTheDocument();
    });
  });

  it("handles API error gracefully", async () => {
    vi.mocked(pokeapi.getPokemon).mockRejectedValue(new Error("API Error"));

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <Evolutions evolutions={["bulbasaur", "ivysaur"]} color={mockColor} />
    );

    await waitFor(() => {
      expect(
        screen.queryByText("Loading evolutions...")
      ).not.toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });

  it("capitalizes pokemon names", async () => {
    vi.mocked(pokeapi.getPokemon).mockResolvedValueOnce({
      id: 25,
      name: "pikachu",
      sprites: {
        other: {
          "official-artwork": {
            front_default: "https://example.com/pikachu.png",
          },
        },
      },
    } as PokemonAPI);

    render(<Evolutions evolutions={["pikachu"]} color={mockColor} />);

    await waitFor(() => {
      const pokemonName = screen.getByText("pikachu");
      expect(pokemonName).toHaveClass("capitalize");
    });
  });

  it("renders evolution names with correct styling", async () => {
    vi.mocked(pokeapi.getPokemon).mockResolvedValueOnce({
      id: 1,
      name: "bulbasaur",
      sprites: {
        other: {
          "official-artwork": {
            front_default: "https://example.com/bulbasaur.png",
          },
        },
      },
    } as PokemonAPI);

    render(<Evolutions evolutions={["bulbasaur"]} color={mockColor} />);

    await waitFor(() => {
      const pokemonName = screen.getByText("bulbasaur");
      expect(pokemonName).toHaveClass("font-semibold");
      expect(pokemonName).toHaveClass("text-gray-800");
    });
  });

  it("fetches all evolution data on mount", async () => {
    vi.mocked(pokeapi.getPokemon)
      .mockResolvedValueOnce({
        id: 1,
        name: "bulbasaur",
        sprites: { other: { "official-artwork": { front_default: "url1" } } },
      } as PokemonAPI)
      .mockResolvedValueOnce({
        id: 2,
        name: "ivysaur",
        sprites: { other: { "official-artwork": { front_default: "url2" } } },
      } as PokemonAPI)
      .mockResolvedValueOnce({
        id: 3,
        name: "venusaur",
        sprites: { other: { "official-artwork": { front_default: "url3" } } },
      } as PokemonAPI);

    render(
      <Evolutions
        evolutions={["bulbasaur", "ivysaur", "venusaur"]}
        color={mockColor}
      />
    );

    await waitFor(() => {
      expect(pokeapi.getPokemon).toHaveBeenCalledTimes(3);
      expect(pokeapi.getPokemon).toHaveBeenCalledWith("bulbasaur");
      expect(pokeapi.getPokemon).toHaveBeenCalledWith("ivysaur");
      expect(pokeapi.getPokemon).toHaveBeenCalledWith("venusaur");
    });
  });

  it("re-fetches when evolutions prop changes", async () => {
    vi.mocked(pokeapi.getPokemon).mockResolvedValue({
      id: 1,
      name: "bulbasaur",
      sprites: { other: { "official-artwork": { front_default: "url" } } },
    } as PokemonAPI);

    const { rerender } = render(
      <Evolutions evolutions={["bulbasaur"]} color={mockColor} />
    );

    await waitFor(() => {
      expect(pokeapi.getPokemon).toHaveBeenCalledWith("bulbasaur");
    });

    vi.clearAllMocks();

    vi.mocked(pokeapi.getPokemon).mockResolvedValue({
      id: 25,
      name: "pikachu",
      sprites: { other: { "official-artwork": { front_default: "url" } } },
    } as PokemonAPI);

    rerender(<Evolutions evolutions={["pikachu"]} color={mockColor} />);

    await waitFor(() => {
      expect(pokeapi.getPokemon).toHaveBeenCalledWith("pikachu");
    });
  });

  it("shows 'No Image' placeholder when image URL is null", async () => {
    vi.mocked(pokeapi.getPokemon)
      .mockResolvedValueOnce({
        id: 1,
        name: "bulbasaur",
        sprites: {
          other: {
            "official-artwork": {
              front_default: null,
            },
          },
        },
      } as PokemonAPI)
      .mockResolvedValueOnce({
        id: 2,
        name: "ivysaur",
        sprites: {
          other: {
            "official-artwork": {
              front_default: null,
            },
          },
        },
      } as PokemonAPI);

    render(
      <Evolutions evolutions={["bulbasaur", "ivysaur"]} color={mockColor} />
    );

    await waitFor(() => {
      const noImageTexts = screen.getAllByText("No Image");
      expect(noImageTexts.length).toBe(2);
    });
  });
});
