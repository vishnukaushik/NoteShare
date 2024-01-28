import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useCallback, useEffect, useRef } from "react";
import "../styles/textEditor.css";

const style = {
  color: "black",
};
const Note = ({ note }) => {
  if (!note) return <h4 style={style}>No note is selected</h4>;

  return (
    <>
      <Editor note={note} />
    </>
  );
};

const Editor = ({ note }) => {
  const wrapperRef = useCallback(
    (wrapper) => {
      if (!wrapper) return;
      wrapper.innerHTML = "";
      const editor = document.createElement("div");
      wrapper.append(editor);
      const quill = new Quill(editor, { theme: "snow" });
      quill.insertText(0, note.description, true);
    },
    [note]
  );

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexFlow: "column",
      }}
    >
      <h2
        style={{
          ...style,
          margin: "3px",
          padding: "2px",
          textAlign: "start",
          height: "auto",
        }}
      >
        {note.title}
      </h2>
      <div
        className="container"
        style={{
          flexGrow: 1,
          display: "flex",
          flexFlow: "column",
          color: "black",
          height: "100%",
        }}
        ref={wrapperRef}
      ></div>
    </div>
  );
};

export default Note;
