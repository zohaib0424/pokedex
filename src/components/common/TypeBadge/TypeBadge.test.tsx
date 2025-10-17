import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TypeBadge } from "./TypeBadge";
import { getPokemonTypeColor } from "@/constants";

vi.mock("@/constants", () => ({
  getPokemonTypeColor: vi.fn(),
}));

describe("TypeBadge Component", () => {
  it("renders with correct type name", () => {
    vi.mocked(getPokemonTypeColor).mockReturnValue("#EE8130");
    render(<TypeBadge type="fire" />);

    const badge = screen.getByText("fire");
    expect(badge).toBeInTheDocument();
  });

  it("applies correct background color for fire type", () => {
    vi.mocked(getPokemonTypeColor).mockReturnValue("#EE8130");
    render(<TypeBadge type="fire" />);

    const badge = screen.getByText("fire");
    expect(badge).toHaveStyle({ backgroundColor: "#EE8130" });
  });

  it("applies correct background color for water type", () => {
    vi.mocked(getPokemonTypeColor).mockReturnValue("#6390F0");
    render(<TypeBadge type="water" />);

    const badge = screen.getByText("water");
    expect(badge).toHaveStyle({ backgroundColor: "#6390F0" });
  });

  it("applies correct background color for grass type", () => {
    vi.mocked(getPokemonTypeColor).mockReturnValue("#7AC74C");
    render(<TypeBadge type="grass" />);

    const badge = screen.getByText("grass");
    expect(badge).toHaveStyle({ backgroundColor: "#7AC74C" });
  });

  it("applies correct background color for electric type", () => {
    vi.mocked(getPokemonTypeColor).mockReturnValue("#F7D02C");
    render(<TypeBadge type="electric" />);

    const badge = screen.getByText("electric");
    expect(badge).toHaveStyle({ backgroundColor: "#F7D02C" });
  });

  it("renders text in uppercase", () => {
    vi.mocked(getPokemonTypeColor).mockReturnValue("#EE8130");
    render(<TypeBadge type="fire" />);

    const badge = screen.getByText("fire");
    expect(badge).toHaveClass("uppercase");
  });

  it("renders with white text color", () => {
    vi.mocked(getPokemonTypeColor).mockReturnValue("#EE8130");
    render(<TypeBadge type="fire" />);

    const badge = screen.getByText("fire");
    expect(badge).toHaveClass("text-white");
  });

  it("calls getPokemonTypeColor with correct type", () => {
    vi.mocked(getPokemonTypeColor).mockReturnValue("#A33EA1");
    render(<TypeBadge type="poison" />);

    expect(getPokemonTypeColor).toHaveBeenCalledWith("poison");
  });

  it("renders as a span element", () => {
    vi.mocked(getPokemonTypeColor).mockReturnValue("#EE8130");
    const { container } = render(<TypeBadge type="fire" />);

    const badge = container.querySelector("span");
    expect(badge).toBeInTheDocument();
  });

  it("renders with rounded pill shape", () => {
    vi.mocked(getPokemonTypeColor).mockReturnValue("#EE8130");
    render(<TypeBadge type="fire" />);

    const badge = screen.getByText("fire");
    expect(badge).toHaveClass("rounded-full");
  });

  it("handles dragon type correctly", () => {
    vi.mocked(getPokemonTypeColor).mockReturnValue("#6F35FC");
    render(<TypeBadge type="dragon" />);

    const badge = screen.getByText("dragon");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveStyle({ backgroundColor: "#6F35FC" });
  });

  it("handles fairy type correctly", () => {
    vi.mocked(getPokemonTypeColor).mockReturnValue("#D685AD");
    render(<TypeBadge type="fairy" />);

    const badge = screen.getByText("fairy");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveStyle({ backgroundColor: "#D685AD" });
  });
});

