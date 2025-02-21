import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

describe("App Component - UI Only", () => {
  test("renders the App component with controlled and uncontrolled editors", () => {
    render(<App />);

    expect(screen.getByText("Controlled Mode")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")[0]).toBeInTheDocument();

    expect(screen.getByText("Load Async Content")).toBeInTheDocument();

    expect(screen.getByText("Uncontrolled Mode")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")[1]).toBeInTheDocument();
  });
});
