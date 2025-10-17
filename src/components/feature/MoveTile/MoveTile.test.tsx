import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MoveTile } from "./MoveTile";

describe("MoveTile Component", () => {
  it("renders move name correctly", () => {
    render(<MoveTile name="thunderbolt" level={10} />);

    expect(screen.getByText("Thunderbolt")).toBeInTheDocument();
  });

  it("renders level correctly", () => {
    render(<MoveTile name="tackle" level={5} />);

    expect(screen.getByText("Level 5")).toBeInTheDocument();
  });

  it("formats hyphenated move names correctly", () => {
    render(<MoveTile name="fire-blast" level={50} />);

    expect(screen.getByText("Fire Blast")).toBeInTheDocument();
  });

  it("formats move names with multiple hyphens", () => {
    render(<MoveTile name="mega-drain-special" level={20} />);

    expect(screen.getByText("Mega Drain Special")).toBeInTheDocument();
  });

  it("capitalizes first letter of each word", () => {
    render(<MoveTile name="solar-beam" level={45} />);

    expect(screen.getByText("Solar Beam")).toBeInTheDocument();
  });

  it("handles single-word move names", () => {
    render(<MoveTile name="splash" level={1} />);

    expect(screen.getByText("Splash")).toBeInTheDocument();
  });

  it("displays level 0", () => {
    render(<MoveTile name="pound" level={0} />);

    expect(screen.getByText("Level 0")).toBeInTheDocument();
  });

  it("displays high level numbers", () => {
    render(<MoveTile name="hyper-beam" level={99} />);

    expect(screen.getByText("Level 99")).toBeInTheDocument();
  });

  it("applies correct styling classes to move name", () => {
    render(<MoveTile name="quick-attack" level={15} />);

    const moveName = screen.getByText("Quick Attack");
    expect(moveName).toHaveClass("text-[#4F4F4F]");
  });

  it("applies correct styling classes to level", () => {
    render(<MoveTile name="tackle" level={10} />);

    const level = screen.getByText("Level 10");
    expect(level).toHaveClass("text-[#A4A4A4]");
  });

  it("renders with border-b class except last child", () => {
    const { container } = render(<MoveTile name="tackle" level={5} />);

    const tile = container.firstChild as HTMLElement;
    expect(tile).toHaveClass("border-b");
    expect(tile).toHaveClass("last:border-b-0");
  });

  it("renders as a flex container", () => {
    const { container } = render(<MoveTile name="tackle" level={5} />);

    const tile = container.firstChild as HTMLElement;
    expect(tile).toHaveClass("flex");
    expect(tile).toHaveClass("flex-col");
  });

  it("handles move names with numbers", () => {
    render(<MoveTile name="double-edge-2" level={35} />);

    expect(screen.getByText("Double Edge 2")).toBeInTheDocument();
  });

  it("renders both name and level in the same component", () => {
    render(<MoveTile name="flamethrower" level={25} />);

    expect(screen.getByText("Flamethrower")).toBeInTheDocument();
    expect(screen.getByText("Level 25")).toBeInTheDocument();
  });

  it("handles empty string move name gracefully", () => {
    render(<MoveTile name="" level={10} />);

    // Should still render the level
    expect(screen.getByText("Level 10")).toBeInTheDocument();
  });
});

