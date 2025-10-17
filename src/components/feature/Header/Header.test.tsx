import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { Header } from "./Header";

describe("Header Component", () => {
  const mockOnBackClick = vi.fn();
  const mockChildren = <div data-testid="test-children">Test Content</div>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders children correctly", () => {
    render(<Header>{mockChildren}</Header>);

    expect(screen.getByTestId("test-children")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders with default background color", () => {
    const { container } = render(<Header>{mockChildren}</Header>);

    const header = container.firstChild as HTMLElement;
    expect(header).toHaveStyle({ background: "#7AC74C" });
  });

  it("renders with custom background color", () => {
    const customColor = "#FF6B6B";
    const { container } = render(
      <Header backgroundColor={customColor}>{mockChildren}</Header>
    );

    const header = container.firstChild as HTMLElement;
    expect(header).toHaveStyle({ background: customColor });
  });

  it("renders back button when onBackClick is provided", () => {
    render(<Header onBackClick={mockOnBackClick}>{mockChildren}</Header>);

    const backButton = screen.getByLabelText("Go back");
    expect(backButton).toBeInTheDocument();
  });

  it("does not render back button when onBackClick is not provided", () => {
    render(<Header>{mockChildren}</Header>);

    const backButton = screen.queryByLabelText("Go back");
    expect(backButton).not.toBeInTheDocument();
  });

  it("calls onBackClick when back button is clicked", () => {
    render(<Header onBackClick={mockOnBackClick}>{mockChildren}</Header>);

    const backButton = screen.getByLabelText("Go back");
    fireEvent.click(backButton);

    expect(mockOnBackClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    const customClassName = "custom-header-class";
    const { container } = render(
      <Header className={customClassName}>{mockChildren}</Header>
    );

    const header = container.firstChild as HTMLElement;
    expect(header).toHaveClass(customClassName);
  });

  it("applies min-h-screen class", () => {
    const { container } = render(<Header>{mockChildren}</Header>);

    const header = container.firstChild as HTMLElement;
    expect(header).toHaveClass("min-h-screen");
  });

  it("applies flex flex-col classes", () => {
    const { container } = render(<Header>{mockChildren}</Header>);

    const header = container.firstChild as HTMLElement;
    expect(header).toHaveClass("flex");
    expect(header).toHaveClass("flex-col");
  });

  it("back button has correct positioning classes", () => {
    render(<Header onBackClick={mockOnBackClick}>{mockChildren}</Header>);

    const backButton = screen.getByLabelText("Go back");
    expect(backButton).toHaveClass("absolute");
  });

  it("renders with multiple children", () => {
    render(
      <Header>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <div data-testid="child-3">Child 3</div>
      </Header>
    );

    expect(screen.getByTestId("child-1")).toBeInTheDocument();
    expect(screen.getByTestId("child-2")).toBeInTheDocument();
    expect(screen.getByTestId("child-3")).toBeInTheDocument();
  });

  it("renders with custom background and back button together", () => {
    const customColor = "#FF6B6B";
    const { container } = render(
      <Header backgroundColor={customColor} onBackClick={mockOnBackClick}>
        {mockChildren}
      </Header>
    );

    const header = container.firstChild as HTMLElement;
    expect(header).toHaveStyle({ background: customColor });
    expect(screen.getByLabelText("Go back")).toBeInTheDocument();
  });
});

