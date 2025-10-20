import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Chip } from "./Chip";
import { getPokemonTypeColor } from "@/constants";

vi.mock("@/constants", () => ({
  getPokemonTypeColor: vi.fn(),
}));

describe("Chip Component", () => {
  it("renders with correct type name", () => {
    vi.mocked(getPokemonTypeColor).mockReturnValue("#EE8130");
    render(<Chip type="fire" />);

    const chip = screen.getByText("fire");
    expect(chip).toBeInTheDocument();
  });

  it("applies correct background color for fire type", () => {
    vi.mocked(getPokemonTypeColor).mockReturnValue("#EE8130");
    render(<Chip type="fire" />);

    const chip = screen.getByText("fire");
    expect(chip).toHaveStyle({ backgroundColor: "#EE8130" });
  });

  it("applies correct background color for water type", () => {
    vi.mocked(getPokemonTypeColor).mockReturnValue("#6390F0");
    render(<Chip type="water" />);

    const chip = screen.getByText("water");
    expect(chip).toHaveStyle({ backgroundColor: "#6390F0" });
  });

  it("applies correct background color for grass type", () => {
    vi.mocked(getPokemonTypeColor).mockReturnValue("#7AC74C");
    render(<Chip type="grass" />);

    const chip = screen.getByText("grass");
    expect(chip).toHaveStyle({ backgroundColor: "#7AC74C" });
  });

  it("applies correct background color for electric type", () => {
    vi.mocked(getPokemonTypeColor).mockReturnValue("#F7D02C");
    render(<Chip type="electric" />);

    const chip = screen.getByText("electric");
    expect(chip).toHaveStyle({ backgroundColor: "#F7D02C" });
  });

  it("renders text in uppercase", () => {
    vi.mocked(getPokemonTypeColor).mockReturnValue("#EE8130");
    render(<Chip type="fire" />);

    const chip = screen.getByText("fire");
    expect(chip).toHaveClass("uppercase");
  });

  it("renders with white text color", () => {
    vi.mocked(getPokemonTypeColor).mockReturnValue("#EE8130");
    render(<Chip type="fire" />);

    const chip = screen.getByText("fire");
    expect(chip).toHaveClass("text-white");
  });

  it("calls getPokemonTypeColor with correct type", () => {
    vi.mocked(getPokemonTypeColor).mockReturnValue("#A33EA1");
    render(<Chip type="poison" />);

    expect(getPokemonTypeColor).toHaveBeenCalledWith("poison");
  });

  it("renders as a span element", () => {
    vi.mocked(getPokemonTypeColor).mockReturnValue("#EE8130");
    const { container } = render(<Chip type="fire" />);

    const chip = container.querySelector("span");
    expect(chip).toBeInTheDocument();
  });

  it("renders with rounded pill shape", () => {
    vi.mocked(getPokemonTypeColor).mockReturnValue("#EE8130");
    render(<Chip type="fire" />);

    const chip = screen.getByText("fire");
    expect(chip).toHaveClass("rounded-full");
  });

  it("handles dragon type correctly", () => {
    vi.mocked(getPokemonTypeColor).mockReturnValue("#6F35FC");
    render(<Chip type="dragon" />);

    const chip = screen.getByText("dragon");
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveStyle({ backgroundColor: "#6F35FC" });
  });

  it("handles fairy type correctly", () => {
    vi.mocked(getPokemonTypeColor).mockReturnValue("#D685AD");
    render(<Chip type="fairy" />);

    const chip = screen.getByText("fairy");
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveStyle({ backgroundColor: "#D685AD" });
  });
});

