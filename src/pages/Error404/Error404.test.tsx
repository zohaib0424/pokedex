import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { Error404 } from "./Error404";

// Mock react-router-dom's Link component
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Link: ({ children, to, ...props }: any) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
  };
});

describe("Error404 Page", () => {
  const renderError404 = () => {
    return render(
      <BrowserRouter>
        <Error404 />
      </BrowserRouter>
    );
  };

  it("renders 404 heading", () => {
    renderError404();

    const heading = screen.getByText("404");
    expect(heading).toBeInTheDocument();
  });

  it("renders 'Page Not Found' message", () => {
    renderError404();

    const message = screen.getByText("Page Not Found");
    expect(message).toBeInTheDocument();
  });

  it("renders descriptive text", () => {
    renderError404();

    const description = screen.getByText("We could not find the page you are looking for.");
    expect(description).toBeInTheDocument();
  });

  it("renders 'Go Back Home' link", () => {
    renderError404();

    const link = screen.getByText("Go Back Home");
    expect(link).toBeInTheDocument();
  });

  it("link has correct href to home page", () => {
    renderError404();

    const link = screen.getByText("Go Back Home");
    expect(link).toHaveAttribute("href", "/");
  });

  it("404 heading has correct styling classes", () => {
    renderError404();

    const heading = screen.getByText("404");
    expect(heading).toHaveClass("font-bold");
    expect(heading).toHaveClass("text-red-500");
  });

  it("renders with gradient background", () => {
    renderError404();

    const container = screen.getByText("404").closest("div")?.parentElement;
    expect(container).toHaveClass("from-red-50");
    expect(container).toHaveClass("to-red-100");
  });

  it("renders with min-h-screen class", () => {
    renderError404();

    const container = screen.getByText("404").closest("div")?.parentElement;
    expect(container).toHaveClass("min-h-screen");
  });

  it("Go Back Home button has correct styling", () => {
    renderError404();

    const link = screen.getByText("Go Back Home");
    expect(link).toHaveClass("bg-red-500");
    expect(link).toHaveClass("text-white");
    expect(link).toHaveClass("rounded-lg");
    expect(link).toHaveClass("font-semibold");
  });

  it("all required elements are present", () => {
    renderError404();

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    expect(screen.getByText("We could not find the page you are looking for.")).toBeInTheDocument();
    expect(screen.getByText("Go Back Home")).toBeInTheDocument();
  });
});

