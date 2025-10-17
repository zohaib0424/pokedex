import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { Tabs } from "./Tabs";

describe("Tabs Component", () => {
  const mockTabs = ["STATS", "EVOLUTIONS", "MOVES"] as const;
  const mockOnTabChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all tabs", () => {
    render(<Tabs tabs={mockTabs} />);

    mockTabs.forEach((tab) => {
      expect(screen.getByText(tab)).toBeInTheDocument();
    });
  });

  it("renders with first tab as default active tab", () => {
    render(<Tabs tabs={mockTabs} backgroundColor="#7AC74C" />);

    const statsTab = screen.getByText("STATS");
    expect(statsTab).toHaveStyle({ backgroundColor: "#7AC74C", color: "white" });
  });

  it("renders with specified default tab", () => {
    render(
      <Tabs tabs={mockTabs} defaultTab="EVOLUTIONS" backgroundColor="#FF5733" />
    );

    const evolutionsTab = screen.getByText("EVOLUTIONS");
    expect(evolutionsTab).toHaveStyle({
      backgroundColor: "#FF5733",
      color: "white",
    });
  });

  it("calls onTabChange when tab is clicked (uncontrolled)", () => {
    render(<Tabs tabs={mockTabs} onTabChange={mockOnTabChange} />);

    const movesTab = screen.getByText("MOVES");
    fireEvent.click(movesTab);

    expect(mockOnTabChange).toHaveBeenCalledWith("MOVES");
    expect(mockOnTabChange).toHaveBeenCalledTimes(1);
  });

  it("changes active tab when clicked (uncontrolled)", () => {
    render(<Tabs tabs={mockTabs} backgroundColor="#7AC74C" />);

    const movesTab = screen.getByText("MOVES");
    fireEvent.click(movesTab);

    expect(movesTab).toHaveStyle({ backgroundColor: "#7AC74C", color: "white" });
  });

  it("works as controlled component with activeTab prop", () => {
    const { rerender } = render(
      <Tabs
        tabs={mockTabs}
        activeTab="STATS"
        onTabChange={mockOnTabChange}
        backgroundColor="#7AC74C"
      />
    );

    const statsTab = screen.getByText("STATS");
    expect(statsTab).toHaveStyle({ backgroundColor: "#7AC74C", color: "white" });

    // Click on another tab
    const evolutionsTab = screen.getByText("EVOLUTIONS");
    fireEvent.click(evolutionsTab);

    // Should call onChange but not change internally
    expect(mockOnTabChange).toHaveBeenCalledWith("EVOLUTIONS");

    // Re-render with new activeTab (parent controls the state)
    rerender(
      <Tabs
        tabs={mockTabs}
        activeTab="EVOLUTIONS"
        onTabChange={mockOnTabChange}
        backgroundColor="#7AC74C"
      />
    );

    expect(evolutionsTab).toHaveStyle({
      backgroundColor: "#7AC74C",
      color: "white",
    });
  });

  it("applies custom className", () => {
    render(<Tabs tabs={mockTabs} className="custom-tabs-class" />);

    const tabsContainer = screen.getByText("STATS").parentElement;
    expect(tabsContainer).toHaveClass("custom-tabs-class");
  });

  it("applies data-testid attribute", () => {
    render(<Tabs tabs={mockTabs} data-testid="pokemon-tabs" />);

    const tabsContainer = screen.getByTestId("pokemon-tabs");
    expect(tabsContainer).toBeInTheDocument();
  });

  it("inactive tabs have transparent background", () => {
    render(<Tabs tabs={mockTabs} backgroundColor="#7AC74C" />);

    const evolutionsTab = screen.getByText("EVOLUTIONS");
    const movesTab = screen.getByText("MOVES");

    expect(evolutionsTab).toHaveStyle({
      backgroundColor: "transparent",
      color: "#7AC74C",
    });
    expect(movesTab).toHaveStyle({
      backgroundColor: "transparent",
      color: "#7AC74C",
    });
  });

  it("uses custom backgroundColor for active tab", () => {
    const customColor = "#FF5733";
    render(<Tabs tabs={mockTabs} backgroundColor={customColor} />);

    const statsTab = screen.getByText("STATS");
    expect(statsTab).toHaveStyle({
      backgroundColor: customColor,
      color: "white",
    });
  });
});

