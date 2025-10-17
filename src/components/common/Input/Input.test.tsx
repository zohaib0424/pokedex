import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { Input } from "./Input";

describe("Input Component", () => {
  const mockOnChange = vi.fn();
  const mockOnKeyDown = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with correct value and placeholder", () => {
    render(
      <Input
        value="test value"
        onChange={mockOnChange}
        placeholder="Enter text"
      />
    );

    const input = screen.getByDisplayValue("test value");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "Enter text");
  });

  it("calls onChange when input value changes", () => {
    render(<Input value="" onChange={mockOnChange} placeholder="Enter text" />);

    const input = screen.getByPlaceholderText("Enter text");
    fireEvent.change(input, { target: { value: "new value" } });

    expect(mockOnChange).toHaveBeenCalledWith("new value");
  });

  it("calls onKeyDown when key is pressed", () => {
    render(
      <Input
        value=""
        onChange={mockOnChange}
        onKeyDown={mockOnKeyDown}
        placeholder="Enter text"
      />
    );

    const input = screen.getByPlaceholderText("Enter text");
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  it("applies custom className", () => {
    render(<Input value="" onChange={mockOnChange} className="custom-class" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-class");
  });

  it("applies data-testid attribute", () => {
    render(<Input value="" onChange={mockOnChange} data-testid="test-input" />);

    const input = screen.getByTestId("test-input");
    expect(input).toBeInTheDocument();
  });
});
