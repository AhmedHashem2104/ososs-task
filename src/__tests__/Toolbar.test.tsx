import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Toolbar from "../components/WysiwygEditor/Toolbar";
import { EditorState } from "draft-js";

describe("Toolbar Component", () => {
  const mockEditorState = EditorState.createEmpty();
  const mockOnToggleInlineStyle = jest.fn();

  it("renders the toolbar buttons", () => {
    const { getByText } = render(
      <Toolbar
        editorState={mockEditorState}
        onToggleInlineStyle={mockOnToggleInlineStyle}
      />
    );

    expect(getByText("Bold")).toBeInTheDocument();
    expect(getByText("Italic")).toBeInTheDocument();
    expect(getByText("Underline")).toBeInTheDocument();
  });

  it("calls onToggleInlineStyle with the correct style when a button is clicked", () => {
    const { getByText } = render(
      <Toolbar
        editorState={mockEditorState}
        onToggleInlineStyle={mockOnToggleInlineStyle}
      />
    );

    const boldButton = getByText("Bold");
    fireEvent.mouseDown(boldButton);

    expect(mockOnToggleInlineStyle).toHaveBeenCalledWith("BOLD");
  });

  it("applies bold font weight to the button if the style is active", () => {
    const currentInlineStyle = new Set(["BOLD"]);
    const mockEditorStateWithStyle = {
      ...mockEditorState,
      getCurrentInlineStyle: () => currentInlineStyle,
      getCurrentContent: jest.fn(),
      getSelection: jest.fn(),
      toJS: jest.fn(),
      getAllowUndo: jest.fn(),
      getUndoStack: jest.fn(),
    } as unknown as EditorState;

    const { getByText } = render(
      <Toolbar
        editorState={mockEditorStateWithStyle}
        onToggleInlineStyle={mockOnToggleInlineStyle}
      />
    );

    const boldButton = getByText("Bold");
    expect(boldButton).toHaveStyle("font-weight: bold");
  });
});
