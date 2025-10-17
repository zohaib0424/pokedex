import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { PokedexCard } from "./PokedexCard";

describe("PokedexCard Component", () => {
  const mockOnBackClick = vi.fn();
  const mockChildren = <div data-testid="test-children">Test Content</div>;
  const mockPokemonData = {
    pokemonName: "Pikachu",
    pokemonId: 25,
    pokemonImageUrl: "https://example.com/pikachu.png",
    pokemonTypes: ["electric"] as any,
    pokemonDescription: "A cute electric mouse Pokemon",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with Pokemon data and children", () => {
    render(
      <PokedexCard {...mockPokemonData}>
        {mockChildren}
      </PokedexCard>
    );

    expect(screen.getByText("Pikachu #25")).toBeInTheDocument();
    expect(screen.getByText("A cute electric mouse Pokemon")).toBeInTheDocument();
    expect(screen.getByTestId("test-children")).toBeInTheDocument();
  });

  it("renders with default green background color", () => {
    render(
      <PokedexCard {...mockPokemonData}>
        {mockChildren}
      </PokedexCard>
    );

    const container = screen.getByText("Pikachu #25").closest("div")?.parentElement?.parentElement?.parentElement;
    expect(container).toHaveStyle("background: #7AC74C");
  });

  it("renders with custom background color", () => {
    const customColor = "#FF6B6B";
    render(
      <PokedexCard {...mockPokemonData} backgroundColor={customColor}>
        {mockChildren}
      </PokedexCard>
    );

    const container = screen.getByText("Pikachu #25").closest("div")?.parentElement?.parentElement?.parentElement;
    expect(container).toHaveStyle(`background: ${customColor}`);
  });

  it("renders back button when onBackClick is provided", () => {
    render(
      <PokedexCard {...mockPokemonData} onBackClick={mockOnBackClick}>
        {mockChildren}
      </PokedexCard>
    );

    const backButton = screen.getByLabelText("Go back");
    expect(backButton).toBeInTheDocument();
  });

  it("does not render back button when onBackClick is not provided", () => {
    render(
      <PokedexCard {...mockPokemonData}>
        {mockChildren}
      </PokedexCard>
    );

    const backButton = screen.queryByLabelText("Go back");
    expect(backButton).not.toBeInTheDocument();
  });

  it("calls onBackClick when back button is clicked", () => {
    render(
      <PokedexCard {...mockPokemonData} onBackClick={mockOnBackClick}>
        {mockChildren}
      </PokedexCard>
    );

    const backButton = screen.getByLabelText("Go back");
    fireEvent.click(backButton);

    expect(mockOnBackClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    const customClassName = "custom-pokedex-card";
    render(
      <PokedexCard {...mockPokemonData} className={customClassName}>
        {mockChildren}
      </PokedexCard>
    );

    const container = screen.getByText("Pikachu #25").closest("div")?.parentElement?.parentElement?.parentElement;
    expect(container).toHaveClass(customClassName);
  });

  it("renders Pokemon image when provided", () => {
    render(
      <PokedexCard {...mockPokemonData}>
        {mockChildren}
      </PokedexCard>
    );

    const pokemonImage = screen.getByAltText("Pikachu");
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute("src", "https://example.com/pikachu.png");
  });

  it("renders children in the content card", () => {
    render(
      <PokedexCard {...mockPokemonData}>
        {mockChildren}
      </PokedexCard>
    );

    const childrenContainer = screen.getByTestId("test-children");
    expect(childrenContainer).toBeInTheDocument();
  });
});
