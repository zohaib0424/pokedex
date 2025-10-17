import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Stats } from "./Stats";

describe("Stats Component", () => {
  const mockStats = [
    { name: "hp", value: 45 },
    { name: "attack", value: 49 },
    { name: "defense", value: 49 },
    { name: "special-attack", value: 65 },
    { name: "special-defense", value: 65 },
    { name: "speed", value: 45 },
  ];

  const mockColor = "#7AC74C";

  it("renders all stats", () => {
    render(<Stats stats={mockStats} color={mockColor} />);

    expect(screen.getByText("HP")).toBeInTheDocument();
    expect(screen.getByText("ATK")).toBeInTheDocument();
    expect(screen.getByText("DEF")).toBeInTheDocument();
    expect(screen.getByText("SATK")).toBeInTheDocument();
    expect(screen.getByText("SDEF")).toBeInTheDocument();
    expect(screen.getByText("SPD")).toBeInTheDocument();
  });

  it("renders stat values", () => {
    render(<Stats stats={mockStats} color={mockColor} />);

    expect(screen.getByText("045")).toBeInTheDocument(); // HP
    expect(screen.getByText("049")).toBeInTheDocument(); // Attack
  });

  it("pads stat values with zeros to 3 digits", () => {
    const stats = [{ name: "hp", value: 5 }];
    render(<Stats stats={stats} color={mockColor} />);

    expect(screen.getByText("005")).toBeInTheDocument();
  });

  it("displays three-digit values correctly", () => {
    const stats = [{ name: "attack", value: 150 }];
    render(<Stats stats={stats} color={mockColor} />);

    expect(screen.getByText("150")).toBeInTheDocument();
  });

  it("applies correct color to stat abbreviations", () => {
    const customColor = "#FF6B6B";
    render(<Stats stats={mockStats} color={customColor} />);

    const hpLabel = screen.getByText("HP");
    expect(hpLabel).toHaveStyle({ color: customColor });
  });

  it("applies correct color to stat bars", () => {
    const customColor = "#FF6B6B";
    const { container } = render(<Stats stats={mockStats} color={customColor} />);

    const statBars = container.querySelectorAll('[style*="backgroundColor"]');
    statBars.forEach((bar) => {
      expect(bar).toHaveStyle({ backgroundColor: customColor });
    });
  });

  it("calculates stat percentage correctly", () => {
    const stats = [{ name: "hp", value: 100 }];
    const { container } = render(<Stats stats={stats} color={mockColor} />);

    // 100 / 200 (MAX_STAT_VALUE) = 50%
    const statBar = container.querySelector('[style*="width"]');
    expect(statBar).toHaveStyle({ width: "50%" });
  });

  it("caps stat percentage at 100%", () => {
    const stats = [{ name: "hp", value: 300 }]; // Exceeds MAX_STAT_VALUE
    const { container } = render(<Stats stats={stats} color={mockColor} />);

    const statBar = container.querySelector('[style*="width"]');
    expect(statBar).toHaveStyle({ width: "100%" });
  });

  it("handles zero value stats", () => {
    const stats = [{ name: "hp", value: 0 }];
    const { container } = render(<Stats stats={stats} color={mockColor} />);

    expect(screen.getByText("000")).toBeInTheDocument();
    const statBar = container.querySelector('[style*="width"]');
    expect(statBar).toHaveStyle({ width: "0%" });
  });

  it("handles unknown stat names", () => {
    const stats = [{ name: "unknown-stat", value: 50 }];
    render(<Stats stats={stats} color={mockColor} />);

    expect(screen.getByText("UNKNOWN-STAT")).toBeInTheDocument();
  });

  it("renders stat bars with correct background", () => {
    const { container } = render(<Stats stats={mockStats} color={mockColor} />);

    const statBarContainers = container.querySelectorAll(".bg-gray-200");
    expect(statBarContainers.length).toBeGreaterThan(0);
  });

  it("renders stat bars with rounded corners", () => {
    const { container } = render(<Stats stats={mockStats} color={mockColor} />);

    const statBarContainers = container.querySelectorAll(".rounded-full");
    expect(statBarContainers.length).toBeGreaterThan(0);
  });

  it("renders all stats in flex layout", () => {
    const { container } = render(<Stats stats={mockStats} color={mockColor} />);

    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass("flex");
    expect(mainContainer).toHaveClass("flex-col");
  });

  it("renders correct number of stat rows", () => {
    const { container } = render(<Stats stats={mockStats} color={mockColor} />);

    const statRows = container.querySelectorAll(".flex.items-center");
    expect(statRows.length).toBe(mockStats.length);
  });

  it("handles high stat values correctly", () => {
    const stats = [{ name: "attack", value: 180 }];
    render(<Stats stats={stats} color={mockColor} />);

    expect(screen.getByText("180")).toBeInTheDocument();
  });

  it("renders stat abbreviations in uppercase", () => {
    const stats = [{ name: "hp", value: 50 }];
    render(<Stats stats={stats} color={mockColor} />);

    const hpLabel = screen.getByText("HP");
    expect(hpLabel).toHaveClass("uppercase");
  });

  it("handles empty stats array", () => {
    const { container } = render(<Stats stats={[]} color={mockColor} />);

    const statRows = container.querySelectorAll(".flex.items-center");
    expect(statRows.length).toBe(0);
  });

  it("calculates percentage for minimum stat value", () => {
    const stats = [{ name: "hp", value: 1 }];
    const { container } = render(<Stats stats={stats} color={mockColor} />);

    // 1 / 200 = 0.5%
    const statBar = container.querySelector('[style*="width"]');
    expect(statBar).toHaveStyle({ width: "0.5%" });
  });

  it("calculates percentage for mid-range stat value", () => {
    const stats = [{ name: "hp", value: 50 }];
    const { container } = render(<Stats stats={stats} color={mockColor} />);

    // 50 / 200 = 25%
    const statBar = container.querySelector('[style*="width"]');
    expect(statBar).toHaveStyle({ width: "25%" });
  });

  it("renders with transition classes", () => {
    const { container } = render(<Stats stats={mockStats} color={mockColor} />);

    const statBars = container.querySelectorAll('[style*="backgroundColor"]');
    statBars.forEach((bar) => {
      expect(bar).toHaveClass("transition-all");
      expect(bar).toHaveClass("duration-300");
    });
  });
});

