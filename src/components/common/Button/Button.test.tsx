import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { Button } from "./Button";

describe("Button Component", () => {
  const mockOnClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with correct text", () => {
    render(<Button onClick={mockOnClick}>Click me</Button>);

    const button = screen.getByText("Click me");
    expect(button).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    render(<Button onClick={mockOnClick}>Click me</Button>);

    const button = screen.getByText("Click me");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("renders with primary variant by default", () => {
    render(<Button onClick={mockOnClick}>Primary Button</Button>);

    const button = screen.getByText("Primary Button");
    expect(button).toHaveClass("bg-[#fe5858]");
    expect(button).toHaveClass("text-white");
  });

  it("renders with secondary variant", () => {
    render(
      <Button onClick={mockOnClick} variant="secondary">
        Secondary Button
      </Button>
    );

    const button = screen.getByText("Secondary Button");
    expect(button).toHaveClass("bg-[#ffd2d2]");
    expect(button).toHaveClass("text-[#8a3a3a]");
  });

  it("applies custom className", () => {
    render(
      <Button onClick={mockOnClick} className="custom-class">
        Custom Button
      </Button>
    );

    const button = screen.getByText("Custom Button");
    expect(button).toHaveClass("custom-class");
  });

  it("applies data-testid attribute", () => {
    render(
      <Button onClick={mockOnClick} data-testid="test-button">
        Test Button
      </Button>
    );

    const button = screen.getByTestId("test-button");
    expect(button).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    render(
      <Button onClick={mockOnClick} disabled>
        Disabled Button
      </Button>
    );

    const button = screen.getByText("Disabled Button");
    expect(button).toBeDisabled();
  });

  it("does not call onClick when disabled", () => {
    render(
      <Button onClick={mockOnClick} disabled>
        Disabled Button
      </Button>
    );

    const button = screen.getByText("Disabled Button");
    fireEvent.click(button);

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it("renders with icon variant", () => {
    render(
      <Button onClick={mockOnClick} variant="icon" aria-label="Icon button">
        <svg data-testid="icon-svg" />
      </Button>
    );

    const button = screen.getByLabelText("Icon button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-transparent");
  });

  it("renders icon variant with aria-label", () => {
    render(
      <Button onClick={mockOnClick} variant="icon" aria-label="Go back">
        <span>Icon</span>
      </Button>
    );

    const button = screen.getByLabelText("Go back");
    expect(button).toBeInTheDocument();
  });

  it("icon variant calls onClick when clicked", () => {
    render(
      <Button onClick={mockOnClick} variant="icon" aria-label="Icon button">
        <span>Icon</span>
      </Button>
    );

    const button = screen.getByLabelText("Icon button");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
