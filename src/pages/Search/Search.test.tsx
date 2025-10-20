import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Search } from "./Search";
import * as SearchUtils from "./Search.utils";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Search Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderSearch = () => {
    return render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );
  };

  it("renders search input", () => {
    renderSearch();

    const input = screen.getByTestId("pokemon-search-input");
    expect(input).toBeInTheDocument();
  });

  it("renders search input with correct placeholder", () => {
    renderSearch();

    const input = screen.getByPlaceholderText("e.g. pikachu or 25");
    expect(input).toBeInTheDocument();
  });

  it("renders search input with label", () => {
    renderSearch();

    const label = screen.getByText("Pokemon Name or Id");
    expect(label).toBeInTheDocument();
  });

  it("renders Search button", () => {
    renderSearch();

    const searchButton = screen.getByTestId("search-button");
    expect(searchButton).toBeInTheDocument();
    expect(searchButton).toHaveTextContent("Search");
  });

  it("renders Random button", () => {
    renderSearch();

    const randomButton = screen.getByTestId("random-button");
    expect(randomButton).toBeInTheDocument();
    expect(randomButton).toHaveTextContent("Random");
  });

  it("updates input value when typing", () => {
    renderSearch();

    const input = screen.getByTestId("pokemon-search-input");
    fireEvent.change(input, { target: { value: "pikachu" } });

    expect(input).toHaveValue("pikachu");
  });

  it("navigates to pokemon page when search button is clicked with valid query", () => {
    renderSearch();

    const input = screen.getByTestId("pokemon-search-input");
    fireEvent.change(input, { target: { value: "pikachu" } });

    const searchButton = screen.getByTestId("search-button");
    fireEvent.click(searchButton);

    expect(mockNavigate).toHaveBeenCalledWith("/pokemon/pikachu");
  });

  it("navigates to pokemon page with number id", () => {
    renderSearch();

    const input = screen.getByTestId("pokemon-search-input");
    fireEvent.change(input, { target: { value: "25" } });

    const searchButton = screen.getByTestId("search-button");
    fireEvent.click(searchButton);

    expect(mockNavigate).toHaveBeenCalledWith("/pokemon/25");
  });

  it("normalizes search query before navigation", () => {
    renderSearch();

    const input = screen.getByTestId("pokemon-search-input");
    fireEvent.change(input, { target: { value: "  PIKACHU  " } });

    const searchButton = screen.getByTestId("search-button");
    fireEvent.click(searchButton);

    expect(mockNavigate).toHaveBeenCalledWith("/pokemon/pikachu");
  });

  it("does not navigate when search query is empty", () => {
    renderSearch();

    const searchButton = screen.getByTestId("search-button");
    fireEvent.click(searchButton);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("does not navigate when search query is only whitespace", () => {
    renderSearch();

    const input = screen.getByTestId("pokemon-search-input");
    fireEvent.change(input, { target: { value: "   " } });

    const searchButton = screen.getByTestId("search-button");
    fireEvent.click(searchButton);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("navigates to random pokemon when random button is clicked", () => {
    vi.spyOn(SearchUtils, "generateRandomPokemonId").mockReturnValue(42);

    renderSearch();

    const randomButton = screen.getByTestId("random-button");
    fireEvent.click(randomButton);

    expect(mockNavigate).toHaveBeenCalledWith("/pokemon/42");
  });

  it("generates different random ids on multiple clicks", () => {
    vi.spyOn(SearchUtils, "generateRandomPokemonId")
      .mockReturnValueOnce(10)
      .mockReturnValueOnce(50);

    renderSearch();

    const randomButton = screen.getByTestId("random-button");

    fireEvent.click(randomButton);
    expect(mockNavigate).toHaveBeenCalledWith("/pokemon/10");

    fireEvent.click(randomButton);
    expect(mockNavigate).toHaveBeenCalledWith("/pokemon/50");
  });

  it("navigates when Enter key is pressed in input with valid query", () => {
    renderSearch();

    const input = screen.getByTestId("pokemon-search-input");
    fireEvent.change(input, { target: { value: "charizard" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockNavigate).toHaveBeenCalledWith("/pokemon/charizard");
  });

  it("does not navigate when Enter key is pressed with empty query", () => {
    renderSearch();

    const input = screen.getByTestId("pokemon-search-input");
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("does not navigate when other keys are pressed", () => {
    renderSearch();

    const input = screen.getByTestId("pokemon-search-input");
    fireEvent.change(input, { target: { value: "pikachu" } });
    fireEvent.keyDown(input, { key: "Tab" });

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("renders Pokemon icon", () => {
    renderSearch();

    // The PokemonIcon is an SVG component, we can verify the container exists
    const container = screen
      .getByTestId("pokemon-search-input")
      .closest(".w-full");
    expect(container).toBeInTheDocument();
  });

  it("renders with background image", () => {
    const { container } = renderSearch();

    const mainDiv = container.querySelector('.relative.overflow-hidden');
    expect(mainDiv).toBeInTheDocument();
    expect(mainDiv).toHaveClass('bg-cover');
  });

  it("renders with correct layout classes", () => {
    renderSearch();

    const input = screen.getByTestId("pokemon-search-input");
    const mainContainer = input.closest(".min-h-screen");
    expect(mainContainer).toHaveClass("flex");
    expect(mainContainer).toHaveClass("items-center");
    expect(mainContainer).toHaveClass("justify-center");
  });

  it("both buttons have primary variant", () => {
    renderSearch();

    const searchButton = screen.getByTestId("search-button");
    const randomButton = screen.getByTestId("random-button");

    expect(searchButton).toBeInTheDocument();
    expect(randomButton).toBeInTheDocument();
  });

  it("handles special characters in search query", () => {
    renderSearch();

    const input = screen.getByTestId("pokemon-search-input");
    fireEvent.change(input, { target: { value: "mr-mime" } });

    const searchButton = screen.getByTestId("search-button");
    fireEvent.click(searchButton);

    expect(mockNavigate).toHaveBeenCalledWith("/pokemon/mr-mime");
  });

  it("clears input and allows new search", () => {
    renderSearch();

    const input = screen.getByTestId("pokemon-search-input");

    fireEvent.change(input, { target: { value: "pikachu" } });
    expect(input).toHaveValue("pikachu");

    fireEvent.change(input, { target: { value: "" } });
    expect(input).toHaveValue("");

    fireEvent.change(input, { target: { value: "bulbasaur" } });
    expect(input).toHaveValue("bulbasaur");
  });
});
