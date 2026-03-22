import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Dashboard } from "@/components/dashboard";

describe("Dashboard", () => {
  it("renders setup cards and fetches data", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(async () => {
      return new Response(JSON.stringify({ data: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("Custom Feed Middleware")).toBeInTheDocument();
      expect(screen.getByText("Source Setup")).toBeInTheDocument();
      expect(screen.getByText("Output Setup")).toBeInTheDocument();
      expect(screen.getByText("Rule Builder")).toBeInTheDocument();
    });
  });
});
