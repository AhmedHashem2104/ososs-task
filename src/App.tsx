import React, { useState } from "react";
import WysiwygEditor from "./components/WysiwygEditor/WysiwygEditor";
import { ContentState, EditorState } from "draft-js";

const App: React.FC = () => {
  const [controlledEditorState, setControlledEditorState] =
    useState<EditorState | null>(null);

  const handleControlledChange = (editorState: EditorState) => {
    setControlledEditorState(editorState);
  };

  const fetchContent = async () => {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve("This is async content loaded into the editor.");
      }, 1000);
    });
  };

  const handleLoadAsyncContent = async () => {
    const content = await fetchContent();
    const editorState = EditorState.createWithContent(
      ContentState.createFromText(content)
    );
    setControlledEditorState(editorState);
  };

  return (
    <div>
      <h1>Controlled Mode</h1>
      <WysiwygEditor
        value={controlledEditorState || undefined}
        onChange={handleControlledChange}
      />
      <button onClick={handleLoadAsyncContent}>Load Async Content</button>

      <h1>Uncontrolled Mode</h1>
      <WysiwygEditor />
    </div>
  );
};

export default App;
