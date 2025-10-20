import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { PokedexCard } from "./PokedexCard";
import { TabType } from "./PokedexCard.type";
import type { PokemonTypeName } from "@/types/pokemon";

describe("PokedexCard Component", () => {
  const mockOnBackClick = vi.fn();
  const mockOnTabChange = vi.fn();
  const mockChildren = <div data-testid="test-children">Test Content</div>;
  const mockPokemonData = {
    pokemonName: "Pikachu",
    pokemonId: 25,
    pokemonImageUrl: "https://example.com/pikachu.png",
    pokemonTypes: ["electric"] as PokemonTypeName[],
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

    expect(screen.getByText("Pikachu")).toBeInTheDocument();
    expect(screen.getByText("A cute electric mouse Pokemon")).toBeInTheDocument();
    expect(screen.getByTestId("test-children")).toBeInTheDocument();
  });

  it("renders with default green background color", () => {
    const { container } = render(
      <PokedexCard {...mockPokemonData}>
        {mockChildren}
      </PokedexCard>
    );

    const header = container.querySelector('[style*="background"]');
    expect(header).toHaveStyle("background: #7AC74C");
  });

  it("renders with custom background color", () => {
    const customColor = "#FF6B6B";
    const { container } = render(
      <PokedexCard {...mockPokemonData} backgroundColor={customColor}>
        {mockChildren}
      </PokedexCard>
    );

    const header = container.querySelector('[style*="background"]');
    expect(header).toHaveStyle(`background: ${customColor}`);
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
    const { container } = render(
      <PokedexCard {...mockPokemonData} className={customClassName}>
        {mockChildren}
      </PokedexCard>
    );

    const header = container.firstChild;
    expect(header).toHaveClass(customClassName);
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

  it("renders all tabs (STATS, EVOLUTIONS, MOVES)", () => {
    render(
      <PokedexCard {...mockPokemonData}>
        {mockChildren}
      </PokedexCard>
    );

    expect(screen.getByText("STATS")).toBeInTheDocument();
    expect(screen.getByText("EVOLUTIONS")).toBeInTheDocument();
    expect(screen.getByText("MOVES")).toBeInTheDocument();
  });

  it("renders with default active tab STATS", () => {
    render(
      <PokedexCard {...mockPokemonData}>
        {mockChildren}
      </PokedexCard>
    );

    const statsTab = screen.getByText("STATS");
    expect(statsTab).toBeInTheDocument();
  });

  it("calls onTabChange when tab is clicked", () => {
    render(
      <PokedexCard {...mockPokemonData} onTabChange={mockOnTabChange}>
        {mockChildren}
      </PokedexCard>
    );

    const evolutionsTab = screen.getByText("EVOLUTIONS");
    fireEvent.click(evolutionsTab);

    expect(mockOnTabChange).toHaveBeenCalledWith("EVOLUTIONS");
  });

  it("renders Pokemon name capitalized", () => {
    render(
      <PokedexCard {...mockPokemonData}>
        {mockChildren}
      </PokedexCard>
    );

    const pokemonName = screen.getByText("Pikachu");
    expect(pokemonName).toHaveClass("capitalize");
  });

  it("renders Chip for each type", () => {
    const multiTypePokemon = {
      ...mockPokemonData,
      pokemonTypes: ["water", "flying"] as PokemonTypeName[],
    };

    render(
      <PokedexCard {...multiTypePokemon}>
        {mockChildren}
      </PokedexCard>
    );

    expect(screen.getByText("water")).toBeInTheDocument();
    expect(screen.getByText("flying")).toBeInTheDocument();
  });

  it("renders fallback message when no children provided", () => {
    render(<PokedexCard {...mockPokemonData} />);

    expect(screen.getByText("No content available")).toBeInTheDocument();
  });

  it("does not render image when pokemonImageUrl is not provided", () => {
    const dataWithoutImage = { ...mockPokemonData, pokemonImageUrl: undefined };
    render(
      <PokedexCard {...dataWithoutImage}>
        {mockChildren}
      </PokedexCard>
    );

    const pokemonImage = screen.queryByAltText("Pikachu");
    expect(pokemonImage).not.toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    const dataWithoutDescription = { ...mockPokemonData, pokemonDescription: undefined };
    render(
      <PokedexCard {...dataWithoutDescription}>
        {mockChildren}
      </PokedexCard>
    );

    expect(screen.queryByText("A cute electric mouse Pokemon")).not.toBeInTheDocument();
  });

  it("applies correct active tab from props", () => {
    render(
      <PokedexCard {...mockPokemonData} activeTab={TabType.MOVES} onTabChange={mockOnTabChange}>
        {mockChildren}
      </PokedexCard>
    );

    // The Tabs component should receive activeTab="MOVES"
    expect(screen.getByText("MOVES")).toBeInTheDocument();
  });
});
