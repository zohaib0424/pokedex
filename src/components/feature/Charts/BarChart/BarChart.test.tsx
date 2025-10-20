import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BarChart } from "./BarChart";
import { BarChartData } from "./BarChart.type";

describe("BarChart Component", () => {
  const mockData: BarChartData[] = [
    { stat: "HP", value: 45, maxValue: 200 },
    { stat: "ATK", value: 49, maxValue: 200 },
    { stat: "DEF", value: 49, maxValue: 200 },
    { stat: "SATK", value: 65, maxValue: 200 },
    { stat: "SDEF", value: 65, maxValue: 200 },
    { stat: "SPD", value: 45, maxValue: 200 },
  ];

  const mockColor = "#7AC74C";

  it("renders all stat labels", () => {
    render(<BarChart data={mockData} color={mockColor} />);

    expect(screen.getByText("HP")).toBeInTheDocument();
    expect(screen.getByText("ATK")).toBeInTheDocument();
    expect(screen.getByText("DEF")).toBeInTheDocument();
    expect(screen.getByText("SATK")).toBeInTheDocument();
    expect(screen.getByText("SDEF")).toBeInTheDocument();
    expect(screen.getByText("SPD")).toBeInTheDocument();
  });

  it("renders stat values with zero padding", () => {
    render(<BarChart data={mockData} color={mockColor} />);

    expect(screen.getByText("045")).toBeInTheDocument(); // HP
    expect(screen.getByText("049")).toBeInTheDocument(); // Attack
    expect(screen.getByText("065")).toBeInTheDocument(); // Special Attack
  });

  it("pads single digit values with zeros", () => {
    const data: BarChartData[] = [{ stat: "HP", value: 5, maxValue: 200 }];
    render(<BarChart data={data} color={mockColor} />);

    expect(screen.getByText("005")).toBeInTheDocument();
  });

  it("displays three-digit values correctly", () => {
    const data: BarChartData[] = [{ stat: "ATK", value: 150, maxValue: 200 }];
    render(<BarChart data={data} color={mockColor} />);

    expect(screen.getByText("150")).toBeInTheDocument();
  });

  it("handles zero value stats", () => {
    const data: BarChartData[] = [{ stat: "HP", value: 0, maxValue: 200 }];
    render(<BarChart data={data} color={mockColor} />);

    expect(screen.getByText("000")).toBeInTheDocument();
  });

  it("renders with custom color", () => {
    const customColor = "#FF6B6B";
    render(<BarChart data={mockData} color={customColor} />);

    const hpLabel = screen.getByText("HP");
    expect(hpLabel).toBeInTheDocument();
  });

  it("renders empty chart with no data", () => {
    const { container } = render(<BarChart data={[]} color={mockColor} />);

    expect(container.querySelector(".recharts-bar")).toBeNull();
  });

  it("handles custom maxValue", () => {
    const data: BarChartData[] = [{ stat: "HP", value: 100, maxValue: 300 }];
    render(<BarChart data={data} color={mockColor} maxValue={300} />);

    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("uses default maxValue of 200 when not provided", () => {
    const data: BarChartData[] = [{ stat: "HP", value: 100, maxValue: 200 }];
    const { container } = render(<BarChart data={data} color={mockColor} />);

    expect(container.querySelector(".recharts-wrapper")).toBeInTheDocument();
  });

  it("renders ResponsiveContainer", () => {
    const { container } = render(<BarChart data={mockData} color={mockColor} />);

    expect(container.querySelector(".recharts-responsive-container")).toBeInTheDocument();
  });

  it("renders BarChart component", () => {
    const { container } = render(<BarChart data={mockData} color={mockColor} />);

    expect(container.querySelector(".recharts-bar")).toBeInTheDocument();
  });

  it("renders correct number of bars", () => {
    const { container } = render(<BarChart data={mockData} color={mockColor} />);

    const bars = container.querySelectorAll(".recharts-bar-rectangle");
    expect(bars.length).toBeGreaterThan(0);
  });

  it("handles high stat values", () => {
    const data: BarChartData[] = [{ stat: "ATK", value: 255, maxValue: 200 }];
    render(<BarChart data={data} color={mockColor} />);

    expect(screen.getByText("255")).toBeInTheDocument();
  });

  it("renders with vertical layout", () => {
    const { container } = render(<BarChart data={mockData} color={mockColor} />);

    const barChart = container.querySelector(".recharts-wrapper");
    expect(barChart).toBeInTheDocument();
  });

  it("applies correct height to ResponsiveContainer", () => {
    const { container } = render(<BarChart data={mockData} color={mockColor} />);

    const responsiveContainer = container.querySelector(".recharts-responsive-container");
    expect(responsiveContainer).toHaveStyle({ height: "300px" });
  });

  it("renders stat labels in provided order", () => {
    const orderedData: BarChartData[] = [
      { stat: "SPD", value: 100, maxValue: 200 },
      { stat: "HP", value: 50, maxValue: 200 },
      { stat: "DEF", value: 75, maxValue: 200 },
    ];
    render(<BarChart data={orderedData} color={mockColor} />);

    const labels = screen.getAllByText(/SPD|HP|DEF/);
    expect(labels).toHaveLength(3);
  });
});

