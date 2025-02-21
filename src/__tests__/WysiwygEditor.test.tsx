import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import WysiwygEditor from "../components/WysiwygEditor/WysiwygEditor";
import { EditorState } from "draft-js";

describe("WysiwygEditor Component - UI Only", () => {
  test("renders the WysiwygEditor with default toolbar", () => {
    render(<WysiwygEditor />);

    // Check if the default toolbar buttons are rendered
    expect(screen.getByText("Bold")).toBeInTheDocument();
    expect(screen.getByText("Italic")).toBeInTheDocument();
    expect(screen.getByText("Underline")).toBeInTheDocument();

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("renders the WysiwygEditor with a custom toolbar", () => {
    const customToolbar = () => (
      <div data-testid="custom-toolbar">Custom Toolbar</div>
    );
    render(<WysiwygEditor renderToolbar={customToolbar} />);

    expect(screen.getByTestId("custom-toolbar")).toBeInTheDocument();

    expect(screen.queryByText("Bold")).not.toBeInTheDocument();
    expect(screen.queryByText("Italic")).not.toBeInTheDocument();
    expect(screen.queryByText("Underline")).not.toBeInTheDocument();
  });

  test("renders the WysiwygEditor with custom className and style", () => {
    const className = "custom-class";
    const style = { backgroundColor: "red" };
    render(<WysiwygEditor className={className} style={style} />);

    const editorContainer = screen.getByTestId("wysiwyg-editor");
    expect(editorContainer).toHaveClass("wysiwyg-editor custom-class");
    expect(editorContainer).toHaveStyle("background-color: red");
  });

  test("renders the WysiwygEditor with a controlled value", () => {
    const editorState = EditorState.createEmpty();
    render(<WysiwygEditor value={editorState} />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});
