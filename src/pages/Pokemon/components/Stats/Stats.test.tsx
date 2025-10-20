import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Stats } from "./Stats";
import * as chartUtils from "../../../../components/feature/Charts/BarChart/BarChart.utils";
import { BarChartProps } from "../../../../components/feature/Charts/BarChart/BarChart.type";

// Mock the BarChart component
vi.mock("../../../../components/feature/Charts/BarChart", () => ({
  BarChart: ({ data, color, maxValue }: BarChartProps) => (
    <div data-testid="bar-chart" data-color={color} data-max-value={maxValue}>
      {data.map((item, index: number) => (
        <div key={index} data-testid="chart-item">
          <span>{item.stat}</span>
          <span>{item.value.toString().padStart(3, "0")}</span>
        </div>
      ))}
    </div>
  ),
}));

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

  it("renders BarChart component", () => {
    render(<Stats stats={mockStats} color={mockColor} />);

    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
  });

  it("passes correct color to BarChart", () => {
    render(<Stats stats={mockStats} color={mockColor} />);

    const barChart = screen.getByTestId("bar-chart");
    expect(barChart).toHaveAttribute("data-color", mockColor);
  });

  it("passes MAX_STAT_VALUE to BarChart", () => {
    render(<Stats stats={mockStats} color={mockColor} />);

    const barChart = screen.getByTestId("bar-chart");
    expect(barChart).toHaveAttribute("data-max-value", "200");
  });

  it("calls parseStatsForChart with stats", () => {
    const parseStatsSpy = vi.spyOn(chartUtils, "parseStatsForChart");
    
    render(<Stats stats={mockStats} color={mockColor} />);

    expect(parseStatsSpy).toHaveBeenCalledWith(mockStats);
  });

  it("renders all stat abbreviations", () => {
    render(<Stats stats={mockStats} color={mockColor} />);

    expect(screen.getByText("HP")).toBeInTheDocument();
    expect(screen.getByText("ATK")).toBeInTheDocument();
    expect(screen.getByText("DEF")).toBeInTheDocument();
    expect(screen.getByText("SATK")).toBeInTheDocument();
    expect(screen.getByText("SDEF")).toBeInTheDocument();
    expect(screen.getByText("SPD")).toBeInTheDocument();
  });

  it("renders stat values with zero padding", () => {
    render(<Stats stats={mockStats} color={mockColor} />);

    const values045 = screen.getAllByText("045"); // HP and Speed both have 45
    expect(values045.length).toBeGreaterThanOrEqual(2);
    const values049 = screen.getAllByText("049"); // Attack and Defense both have 49
    expect(values049.length).toBeGreaterThanOrEqual(2);
    const values065 = screen.getAllByText("065"); // Special Attack and Special Defense both have 65
    expect(values065.length).toBeGreaterThanOrEqual(2);
  });

  it("handles single stat", () => {
    const stats = [{ name: "hp", value: 5 }];
    render(<Stats stats={stats} color={mockColor} />);

    expect(screen.getByText("HP")).toBeInTheDocument();
    expect(screen.getByText("005")).toBeInTheDocument();
  });

  it("handles empty stats array", () => {
    render(<Stats stats={[]} color={mockColor} />);

    const chartItems = screen.queryAllByTestId("chart-item");
    expect(chartItems).toHaveLength(0);
  });

  it("handles high stat values", () => {
    const stats = [{ name: "attack", value: 180 }];
    render(<Stats stats={stats} color={mockColor} />);

    expect(screen.getByText("180")).toBeInTheDocument();
  });

  it("handles zero value stats", () => {
    const stats = [{ name: "hp", value: 0 }];
    render(<Stats stats={stats} color={mockColor} />);

    expect(screen.getByText("000")).toBeInTheDocument();
  });

  it("handles unknown stat names", () => {
    const stats = [{ name: "unknown-stat", value: 50 }];
    render(<Stats stats={stats} color={mockColor} />);

    expect(screen.getByText("UNKNOWN-STAT")).toBeInTheDocument();
  });

  it("passes custom color correctly", () => {
    const customColor = "#FF6B6B";
    render(<Stats stats={mockStats} color={customColor} />);

    const barChart = screen.getByTestId("bar-chart");
    expect(barChart).toHaveAttribute("data-color", customColor);
  });

  it("renders correct number of chart items", () => {
    render(<Stats stats={mockStats} color={mockColor} />);

    const chartItems = screen.getAllByTestId("chart-item");
    expect(chartItems).toHaveLength(mockStats.length);
  });

  it("passes parsed data to BarChart", () => {
    const stats = [
      { name: "hp", value: 100 },
      { name: "attack", value: 150 },
    ];
    render(<Stats stats={stats} color={mockColor} />);

    expect(screen.getByText("HP")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("ATK")).toBeInTheDocument();
    expect(screen.getByText("150")).toBeInTheDocument();
  });
});

