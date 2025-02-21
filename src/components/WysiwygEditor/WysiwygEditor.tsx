import React, { useState, useEffect } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import Toolbar from "./Toolbar";
import "./styles.css";

interface WysiwygEditorProps {
  value?: EditorState;
  onChange?: (editorState: EditorState) => void;
  className?: string;
  style?: React.CSSProperties;
  renderToolbar?: (props: {
    editorState: EditorState;
    onToggleInlineStyle: (style: string) => void;
  }) => React.ReactNode;
}

const WysiwygEditor: React.FC<WysiwygEditorProps> = ({
  value,
  onChange,
  className,
  style,
  renderToolbar,
}) => {
  const [editorState, setEditorState] = useState(
    value || EditorState.createEmpty()
  );

  useEffect(() => {
    if (value) {
      setEditorState(value);
    }
  }, [value]);

  const handleChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    if (onChange) {
      onChange(newEditorState);
    }
  };

  const handleToggleInlineStyle = (inlineStyle: string) => {
    handleChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const defaultToolbar = (
    <Toolbar
      editorState={editorState}
      onToggleInlineStyle={handleToggleInlineStyle}
    />
  );

  return (
    <div
      className={`wysiwyg-editor ${className}`}
      style={style}
      data-testid="wysiwyg-editor"
    >
      {renderToolbar
        ? renderToolbar({
            editorState,
            onToggleInlineStyle: handleToggleInlineStyle,
          })
        : defaultToolbar}
      <div className="editor-container">
        <Editor editorState={editorState} onChange={handleChange} />
      </div>
    </div>
  );
};

export default WysiwygEditor;
