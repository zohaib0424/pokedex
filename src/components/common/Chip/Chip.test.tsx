import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Chip } from "./Chip";

describe("Chip", () => {
  it("renders with title and default props", () => {
    render(<Chip title="GRASS" />);
    
    const chip = screen.getByText("GRASS");
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveStyle({
      backgroundColor: "#7AC74C",
      color: "#FFFFFF",
    });
  });

  it("renders with custom background color", () => {
    render(<Chip title="FIRE" backgroundColor="#EE8130" />);
    
    const chip = screen.getByText("FIRE");
    expect(chip).toHaveStyle({
      backgroundColor: "#EE8130",
    });
  });

  it("renders with custom text color", () => {
    render(<Chip title="WATER" textColor="#000000" />);
    
    const chip = screen.getByText("WATER");
    expect(chip).toHaveStyle({
      color: "#000000",
    });
  });

  it("renders with different sizes", () => {
    const { rerender } = render(<Chip title="SMALL" size="small" />);
    let chip = screen.getByText("SMALL");
    expect(chip).toHaveStyle({
      padding: "4px 8px",
      fontSize: "12px",
    });

    rerender(<Chip title="MEDIUM" size="medium" />);
    chip = screen.getByText("MEDIUM");
    expect(chip).toHaveStyle({
      padding: "6px 12px",
      fontSize: "14px",
    });

    rerender(<Chip title="LARGE" size="large" />);
    chip = screen.getByText("LARGE");
    expect(chip).toHaveStyle({
      padding: "8px 16px",
      fontSize: "16px",
    });
  });


  it("applies custom className", () => {
    render(<Chip title="CUSTOM" className="custom-chip" />);
    
    const chip = screen.getByText("CUSTOM");
    expect(chip).toHaveClass("custom-chip");
  });

  it("applies data-testid", () => {
    render(<Chip title="TEST" data-testid="test-chip" />);
    
    const chip = screen.getByTestId("test-chip");
    expect(chip).toBeInTheDocument();
  });

});
