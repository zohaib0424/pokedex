import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Moves } from "./Moves";

describe("Moves Component", () => {
  const mockColor = "#7AC74C";

  const mockMoves = [
    { name: "tackle", level: 1 },
    { name: "thunderbolt", level: 10 },
    { name: "quick-attack", level: 5 },
    { name: "thunder", level: 50 },
  ];

  it("renders all moves", () => {
    render(<Moves moves={mockMoves} color={mockColor} />);

    expect(screen.getByText("Tackle")).toBeInTheDocument();
    expect(screen.getByText("Thunderbolt")).toBeInTheDocument();
    expect(screen.getByText("Quick Attack")).toBeInTheDocument();
    expect(screen.getByText("Thunder")).toBeInTheDocument();
  });

  it("renders move levels", () => {
    render(<Moves moves={mockMoves} color={mockColor} />);

    expect(screen.getByText("Level 1")).toBeInTheDocument();
    expect(screen.getByText("Level 10")).toBeInTheDocument();
    expect(screen.getByText("Level 5")).toBeInTheDocument();
    expect(screen.getByText("Level 50")).toBeInTheDocument();
  });

  it("displays 'No moves available' when moves array is empty", () => {
    render(<Moves moves={[]} color={mockColor} />);

    expect(screen.getByText("No moves available")).toBeInTheDocument();
  });

  it("displays 'No moves available' when moves is null", () => {
    render(<Moves moves={null as any} color={mockColor} />);

    expect(screen.getByText("No moves available")).toBeInTheDocument();
  });

  it("displays 'No moves available' when moves is undefined", () => {
    render(<Moves moves={undefined as any} color={mockColor} />);

    expect(screen.getByText("No moves available")).toBeInTheDocument();
  });

  it("renders MoveTile for each move", () => {
    render(<Moves moves={mockMoves} color={mockColor} />);

    const moveTiles = screen.getAllByText(/Level \d+/);
    expect(moveTiles).toHaveLength(mockMoves.length);
  });

  it("formats hyphenated move names correctly", () => {
    const moves = [{ name: "fire-blast", level: 25 }];
    render(<Moves moves={moves} color={mockColor} />);

    expect(screen.getByText("Fire Blast")).toBeInTheDocument();
  });

  it("renders single move", () => {
    const moves = [{ name: "splash", level: 1 }];
    render(<Moves moves={moves} color={mockColor} />);

    expect(screen.getByText("Splash")).toBeInTheDocument();
    expect(screen.getByText("Level 1")).toBeInTheDocument();
  });

  it("renders move with level 0", () => {
    const moves = [{ name: "pound", level: 0 }];
    render(<Moves moves={moves} color={mockColor} />);

    expect(screen.getByText("Level 0")).toBeInTheDocument();
  });

  it("renders move with high level", () => {
    const moves = [{ name: "hyper-beam", level: 99 }];
    render(<Moves moves={moves} color={mockColor} />);

    expect(screen.getByText("Level 99")).toBeInTheDocument();
  });

  it("renders moves in scrollable container", () => {
    const { container } = render(<Moves moves={mockMoves} color={mockColor} />);

    const movesContainer = container.querySelector(".overflow-y-auto");
    expect(movesContainer).toBeInTheDocument();
  });

  it("applies max height to container", () => {
    const { container } = render(<Moves moves={mockMoves} color={mockColor} />);

    const movesContainer = container.firstChild as HTMLElement;
    expect(movesContainer).toHaveClass("max-h-[300px]");
  });

  it("renders with flex column layout", () => {
    const { container } = render(<Moves moves={mockMoves} color={mockColor} />);

    const movesContainer = container.firstChild as HTMLElement;
    expect(movesContainer).toHaveClass("flex");
    expect(movesContainer).toHaveClass("flex-col");
  });

  it("handles move names with multiple hyphens", () => {
    const moves = [{ name: "shadow-force-max", level: 40 }];
    render(<Moves moves={moves} color={mockColor} />);

    expect(screen.getByText("Shadow Force Max")).toBeInTheDocument();
  });

  it("handles single-word move names", () => {
    const moves = [{ name: "thunderbolt", level: 15 }];
    render(<Moves moves={moves} color={mockColor} />);

    expect(screen.getByText("Thunderbolt")).toBeInTheDocument();
  });

  it("renders large number of moves", () => {
    const manyMoves = Array.from({ length: 50 }, (_, i) => ({
      name: `move-${i}`,
      level: i,
    }));

    render(<Moves moves={manyMoves} color={mockColor} />);

    expect(screen.getByText("Move 0")).toBeInTheDocument();
    expect(screen.getByText("Move 49")).toBeInTheDocument();
  });

  it("handles moves with same name but different levels", () => {
    const moves = [
      { name: "tackle", level: 1 },
      { name: "tackle", level: 5 },
    ];

    render(<Moves moves={moves} color={mockColor} />);

    const tackleMoves = screen.getAllByText("Tackle");
    expect(tackleMoves).toHaveLength(2);
    expect(screen.getByText("Level 1")).toBeInTheDocument();
    expect(screen.getByText("Level 5")).toBeInTheDocument();
  });

  it("passes color prop to component (even if not used)", () => {
    const customColor = "#FF6B6B";
    const { container } = render(<Moves moves={mockMoves} color={customColor} />);

    // Component receives the color prop even if it's not currently used in rendering
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders empty state with centered text", () => {
    render(<Moves moves={[]} color={mockColor} />);

    const emptyState = screen.getByText("No moves available").closest("div");
    expect(emptyState).toHaveClass("flex");
    expect(emptyState).toHaveClass("items-center");
    expect(emptyState).toHaveClass("justify-center");
  });

  it("renders empty state text with correct styling", () => {
    render(<Moves moves={[]} color={mockColor} />);

    const emptyStateText = screen.getByText("No moves available");
    expect(emptyStateText).toHaveClass("text-gray-600");
  });
});

