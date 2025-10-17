import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { PokedexCard } from "./PokedexCard";

describe("PokedexCard Component", () => {
  const mockOnBackClick = vi.fn();
  const mockIcon = <div data-testid="test-icon">Test Icon</div>;
  const mockChildren = <div data-testid="test-children">Test Content</div>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with icon and children", () => {
    render(
      <PokedexCard icon={mockIcon}>
        {mockChildren}
      </PokedexCard>
    );

    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    expect(screen.getByTestId("test-children")).toBeInTheDocument();
  });

  it("renders with default green background color", () => {
    render(
      <PokedexCard icon={mockIcon}>
        {mockChildren}
      </PokedexCard>
    );

    const container = screen.getByTestId("test-icon").closest("div")?.parentElement?.parentElement;
    expect(container).toHaveStyle("background: #7AC74C");
  });

  it("renders with custom background color", () => {
    const customColor = "#FF6B6B";
    render(
      <PokedexCard icon={mockIcon} backgroundColor={customColor}>
        {mockChildren}
      </PokedexCard>
    );

    const container = screen.getByTestId("test-icon").closest("div")?.parentElement?.parentElement;
    expect(container).toHaveStyle(`background: ${customColor}`);
  });

  it("renders back button when onBackClick is provided", () => {
    render(
      <PokedexCard icon={mockIcon} onBackClick={mockOnBackClick}>
        {mockChildren}
      </PokedexCard>
    );

    const backButton = screen.getByLabelText("Go back");
    expect(backButton).toBeInTheDocument();
  });

  it("does not render back button when onBackClick is not provided", () => {
    render(
      <PokedexCard icon={mockIcon}>
        {mockChildren}
      </PokedexCard>
    );

    const backButton = screen.queryByLabelText("Go back");
    expect(backButton).not.toBeInTheDocument();
  });

  it("calls onBackClick when back button is clicked", () => {
    render(
      <PokedexCard icon={mockIcon} onBackClick={mockOnBackClick}>
        {mockChildren}
      </PokedexCard>
    );

    const backButton = screen.getByLabelText("Go back");
    fireEvent.click(backButton);

    expect(mockOnBackClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    const customClassName = "custom-pokedex-card";
    render(
      <PokedexCard icon={mockIcon} className={customClassName}>
        {mockChildren}
      </PokedexCard>
    );

    const container = screen.getByTestId("test-icon").closest("div")?.parentElement?.parentElement;
    expect(container).toHaveClass(customClassName);
  });

  it("renders icon in the correct container", () => {
    render(
      <PokedexCard icon={mockIcon}>
        {mockChildren}
      </PokedexCard>
    );

    const iconContainer = screen.getByTestId("test-icon").parentElement;
    expect(iconContainer).toBeInTheDocument();
  });

  it("renders children in the content card", () => {
    render(
      <PokedexCard icon={mockIcon}>
        {mockChildren}
      </PokedexCard>
    );

    const childrenContainer = screen.getByTestId("test-children");
    expect(childrenContainer).toBeInTheDocument();
  });
});
