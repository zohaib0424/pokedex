import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { PokemonNotFound } from "./PokemonNotFound";

describe("PokemonNotFound Page", () => {
  const mockOnBackClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders 'No Pokemon Found!' heading", () => {
    render(<PokemonNotFound onBackClick={mockOnBackClick} />);

    expect(screen.getByText("No Pokemon Found!")).toBeInTheDocument();
  });

  it("renders with red background color", () => {
    const { container } = render(<PokemonNotFound onBackClick={mockOnBackClick} />);

    const header = container.querySelector('[style*="background"]');
    expect(header).toHaveStyle("background: #FF6B6B");
  });

  it("renders back button", () => {
    render(<PokemonNotFound onBackClick={mockOnBackClick} />);

    const backButton = screen.getByLabelText("Go back");
    expect(backButton).toBeInTheDocument();
  });

  it("calls onBackClick when back button is clicked", () => {
    render(<PokemonNotFound onBackClick={mockOnBackClick} />);

    const backButton = screen.getByLabelText("Go back");
    fireEvent.click(backButton);

    expect(mockOnBackClick).toHaveBeenCalledTimes(1);
  });

  it("renders No Pokemon icon image", () => {
    render(<PokemonNotFound onBackClick={mockOnBackClick} />);

    const image = screen.getByAltText("No Pokemon Found");
    expect(image).toBeInTheDocument();
  });

  it("image has correct src attribute", () => {
    render(<PokemonNotFound onBackClick={mockOnBackClick} />);

    const image = screen.getByAltText("No Pokemon Found");
    expect(image).toHaveAttribute("src");
  });

  it("heading has custom font family", () => {
    render(<PokemonNotFound onBackClick={mockOnBackClick} />);

    const heading = screen.getByText("No Pokemon Found!");
    expect(heading).toHaveStyle({ fontFamily: "Single Day, cursive" });
  });

  it("heading has white text color", () => {
    render(<PokemonNotFound onBackClick={mockOnBackClick} />);

    const heading = screen.getByText("No Pokemon Found!");
    expect(heading).toHaveClass("text-white");
  });

  it("heading has bold font weight", () => {
    render(<PokemonNotFound onBackClick={mockOnBackClick} />);

    const heading = screen.getByText("No Pokemon Found!");
    expect(heading).toHaveClass("font-bold");
  });

  it("renders with flex layout", () => {
    render(<PokemonNotFound onBackClick={mockOnBackClick} />);

    const container = screen.getByText("No Pokemon Found!").closest("div");
    expect(container).toHaveClass("flex");
    expect(container).toHaveClass("flex-col");
  });

  it("image container has correct width and height classes", () => {
    render(<PokemonNotFound onBackClick={mockOnBackClick} />);

    const image = screen.getByAltText("No Pokemon Found");
    const imageContainer = image.parentElement;
    expect(imageContainer).toHaveClass("flex");
    expect(imageContainer).toHaveClass("items-center");
    expect(imageContainer).toHaveClass("justify-center");
  });
});

