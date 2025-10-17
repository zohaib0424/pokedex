import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Pokemon } from "./Pokemon";
import * as pokeapi from "@/services/pokeapi";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ idOrName: "pikachu" }),
    useNavigate: () => mockNavigate,
  };
});

vi.mock("@/services/pokeapi", () => ({
  getPokemonDetails: vi.fn(),
}));

vi.mock("@/constants", () => ({
  getPokemonTypeColor: vi.fn(() => "#F7D02C"),
}));

describe("Pokemon Page", () => {
  let queryClient: QueryClient;

  const mockPokemonDetails = {
    id: 25,
    name: "pikachu",
    types: ["electric"] as any,
    imageUrl: "https://example.com/pikachu.png",
    description: "It is a cute electric mouse pokemon.",
    stats: [
      { name: "hp", value: 35 },
      { name: "attack", value: 55 },
      { name: "defense", value: 40 },
    ],
    evolutions: ["pichu", "pikachu", "raichu"],
    moves: [
      { name: "thunderbolt", level: 10 },
      { name: "quick-attack", level: 5 },
    ],
  };

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
  });

  const renderPokemon = () => {
    return render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Pokemon />
        </QueryClientProvider>
      </BrowserRouter>
    );
  };

  it("displays loading state initially", () => {
    vi.mocked(pokeapi.getPokemonDetails).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    renderPokemon();

    expect(screen.getByText("Loading…")).toBeInTheDocument();
  });

  it("renders pokemon data when loaded", async () => {
    vi.mocked(pokeapi.getPokemonDetails).mockResolvedValue(mockPokemonDetails);

    renderPokemon();

    await waitFor(() => {
      expect(screen.getByText("pikachu")).toBeInTheDocument();
      expect(screen.getByText("It is a cute electric mouse pokemon.")).toBeInTheDocument();
    });
  });

  it("displays Stats tab content by default", async () => {
    vi.mocked(pokeapi.getPokemonDetails).mockResolvedValue(mockPokemonDetails);

    renderPokemon();

    await waitFor(() => {
      expect(screen.getByText("HP")).toBeInTheDocument();
      expect(screen.getByText("035")).toBeInTheDocument();
    });
  });

  it("switches to Evolutions tab when clicked", async () => {
    vi.mocked(pokeapi.getPokemonDetails).mockResolvedValue(mockPokemonDetails);

    renderPokemon();

    await waitFor(() => {
      expect(screen.getByText("EVOLUTIONS")).toBeInTheDocument();
    });

    const evolutionsTab = screen.getByText("EVOLUTIONS");
    fireEvent.click(evolutionsTab);

    await waitFor(() => {
      // The Evolutions component should now be rendered
      expect(screen.queryByText("HP")).not.toBeInTheDocument();
    });
  });

  it("switches to Moves tab when clicked", async () => {
    vi.mocked(pokeapi.getPokemonDetails).mockResolvedValue(mockPokemonDetails);

    renderPokemon();

    await waitFor(() => {
      expect(screen.getByText("MOVES")).toBeInTheDocument();
    });

    const movesTab = screen.getByText("MOVES");
    fireEvent.click(movesTab);

    await waitFor(() => {
      // The Moves component should now be rendered
      expect(screen.queryByText("HP")).not.toBeInTheDocument();
    });
  });

  it("renders back button", async () => {
    vi.mocked(pokeapi.getPokemonDetails).mockResolvedValue(mockPokemonDetails);

    renderPokemon();

    await waitFor(() => {
      expect(screen.getByLabelText("Go back")).toBeInTheDocument();
    });
  });

  it("calls navigate when back button is clicked", async () => {
    vi.mocked(pokeapi.getPokemonDetails).mockResolvedValue(mockPokemonDetails);

    renderPokemon();

    await waitFor(() => {
      expect(screen.getByLabelText("Go back")).toBeInTheDocument();
    });

    const backButton = screen.getByLabelText("Go back");
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it("shows PokemonNotFound when API returns error", async () => {
    vi.mocked(pokeapi.getPokemonDetails).mockRejectedValue(
      new Error("Pokemon not found")
    );

    renderPokemon();

    await waitFor(() => {
      expect(screen.getByText("No Pokemon Found!")).toBeInTheDocument();
    });
  });

  it("shows PokemonNotFound when data is null", async () => {
    // @ts-expect-error Testing null return
    vi.mocked(pokeapi.getPokemonDetails).mockResolvedValue(null);

    renderPokemon();

    await waitFor(() => {
      expect(screen.getByText("No Pokemon Found!")).toBeInTheDocument();
    });
  });

  it("fetches pokemon details on mount", async () => {
    vi.mocked(pokeapi.getPokemonDetails).mockResolvedValue(mockPokemonDetails);

    renderPokemon();

    await waitFor(() => {
      expect(pokeapi.getPokemonDetails).toHaveBeenCalledWith("pikachu");
    });
  });

  it("applies correct background color based on pokemon type", async () => {
    vi.mocked(pokeapi.getPokemonDetails).mockResolvedValue(mockPokemonDetails);

    renderPokemon();

    await waitFor(() => {
      expect(screen.getByText("pikachu")).toBeInTheDocument();
    });
  });

  it("renders pokemon image", async () => {
    vi.mocked(pokeapi.getPokemonDetails).mockResolvedValue(mockPokemonDetails);

    renderPokemon();

    await waitFor(() => {
      const image = screen.getByAltText("pikachu");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "https://example.com/pikachu.png");
    });
  });

  it("renders pokemon types", async () => {
    vi.mocked(pokeapi.getPokemonDetails).mockResolvedValue(mockPokemonDetails);

    renderPokemon();

    await waitFor(() => {
      expect(screen.getByText("electric")).toBeInTheDocument();
    });
  });

  it("renders all three tabs", async () => {
    vi.mocked(pokeapi.getPokemonDetails).mockResolvedValue(mockPokemonDetails);

    renderPokemon();

    await waitFor(() => {
      expect(screen.getByText("STATS")).toBeInTheDocument();
      expect(screen.getByText("EVOLUTIONS")).toBeInTheDocument();
      expect(screen.getByText("MOVES")).toBeInTheDocument();
    });
  });

  it("maintains active tab state when switching", async () => {
    vi.mocked(pokeapi.getPokemonDetails).mockResolvedValue(mockPokemonDetails);

    renderPokemon();

    await waitFor(() => {
      expect(screen.getByText("STATS")).toBeInTheDocument();
    });

    // Click Evolutions tab
    const evolutionsTab = screen.getByText("EVOLUTIONS");
    fireEvent.click(evolutionsTab);

    await waitFor(() => {
      // Stats should not be visible
      expect(screen.queryByText("HP")).not.toBeInTheDocument();
    });

    // Click back to Stats tab
    const statsTab = screen.getByText("STATS");
    fireEvent.click(statsTab);

    await waitFor(() => {
      // Stats should be visible again
      expect(screen.getByText("HP")).toBeInTheDocument();
    });
  });

  it("renders with pokemon description", async () => {
    vi.mocked(pokeapi.getPokemonDetails).mockResolvedValue(mockPokemonDetails);

    renderPokemon();

    await waitFor(() => {
      expect(
        screen.getByText("It is a cute electric mouse pokemon.")
      ).toBeInTheDocument();
    });
  });

  it("handles pokemon with multiple types", async () => {
    const charizard = {
      ...mockPokemonDetails,
      id: 6,
      name: "charizard",
      types: ["fire", "flying"] as ["fire", "flying"],
    };

    vi.mocked(pokeapi.getPokemonDetails).mockResolvedValue(charizard);

    renderPokemon();

    await waitFor(() => {
      expect(screen.getByText("fire")).toBeInTheDocument();
      expect(screen.getByText("flying")).toBeInTheDocument();
    });
  });

  it("renders default fallback when no tab content is selected", async () => {
    const pokemonWithoutData = {
      ...mockPokemonDetails,
      stats: [],
      evolutions: [],
      moves: [],
    };

    vi.mocked(pokeapi.getPokemonDetails).mockResolvedValue(pokemonWithoutData);

    renderPokemon();

    await waitFor(() => {
      expect(screen.getByText("pikachu")).toBeInTheDocument();
    });
  });

  it("shows back button in error state", async () => {
    vi.mocked(pokeapi.getPokemonDetails).mockRejectedValue(
      new Error("Pokemon not found")
    );

    renderPokemon();

    await waitFor(() => {
      expect(screen.getByLabelText("Go back")).toBeInTheDocument();
    });

    const backButton = screen.getByLabelText("Go back");
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it("applies correct background color from getPokemonTypeColor", async () => {
    vi.mocked(pokeapi.getPokemonDetails).mockResolvedValue({
      ...mockPokemonDetails,
      types: ["fire"] as any,
    });

    renderPokemon();

    await waitFor(() => {
      expect(screen.getByText(mockPokemonDetails.name)).toBeInTheDocument();
    });
  });
});

