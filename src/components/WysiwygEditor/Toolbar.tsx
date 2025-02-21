import React from "react";
import { EditorState } from "draft-js";

interface ToolbarProps {
  editorState: EditorState;
  onToggleInlineStyle: (style: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  editorState,
  onToggleInlineStyle,
}) => {
  const inlineStyles = [
    { label: "Bold", style: "BOLD" },
    { label: "Italic", style: "ITALIC" },
    { label: "Underline", style: "UNDERLINE" },
  ];

  return (
    <div className="toolbar">
      {inlineStyles.map((type) => (
        <button
          key={type.style}
          onMouseDown={(e) => {
            e.preventDefault();
            onToggleInlineStyle(type.style);
          }}
          style={{
            fontWeight: editorState.getCurrentInlineStyle().has(type.style)
              ? "bold"
              : "normal",
          }}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
};

export default Toolbar;
