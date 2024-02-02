import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useCallback, useEffect, useRef, useState } from "react";
import "../styles/textEditor.css";

const style = {
  color: "black",
};
const Note = ({ note, setNote }) => {
  if (!note) return <h4 style={style}>No note is selected</h4>;

  return (
    <>
      <Editor note={note} setNote={setNote} />
    </>
  );
};

const Editor = ({ note }) => {
  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],

    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],

    [{ size: ["small", false, "large", "huge"] }],

    ["clean"],
  ];
  const wrapperRef = useCallback(
    (wrapper) => {
      if (!wrapper) return;
      wrapper.innerHTML = "";
      const editor = document.createElement("div");
      wrapper.append(editor);
      const quill = new Quill(editor, {
        theme: "snow",
        modules: {
          toolbar: toolbarOptions,
        },
      });
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
      <EditorToolbar note={note} />
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

const EditorToolbar = ({ note }) => {
  // const [currentNote, setCurrentNote] = useState(
  //   JSON.parse(JSON.stringify(note))
  // );
  const currentNote = note;
  const [tempNote, setTempNote] = useState(currentNote);
  console.log("temo note: ", tempNote);
  const [editable, setEditable] = useState(false);
  console.log("editor toolbar rendered with editable ", editable, currentNote);
  const inputRef = useCallback((element) => {
    console.log("element inserted into DOM!");
  });
  const handleDoubleClick = () => {
    setEditable(true);
    console.log("handle clicks");
    // async () => {
    //   await
    // }
    // inputRef.current.focus();
  };
  const handleBlur = () => {
    setEditable(false);
    console.log("inside blur: ", currentNote);
    // inputRef.current.blur();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    handleBlur();
  };
  const handleChange = (event) => {
    // setCurrentNote({
    //   ...note,
    //   title: event.target.value,
    // });
    console.log("event changed: ", event.target.value);
    // currentNote.title = event.target.value;
    setTempNote(() => {
      return {
        ...currentNote,
        title: event.target.value,
      };
    });
  };
  if (editable) {
    return (
      <form
        onSubmit={handleSubmit}
        style={{
          width: "fit-content",
          border: "1px solid red",
          height: "fit-content",
          padding: "0px",
        }}
      >
        <input
          // ref={inputRef}
          style={{
            ...style,
            height: "40px",
            display: "block",
            fontSize: "1.5em",
            marginBlockStart: "0.83em",
            marginBlockEnd: "0.83em",
            fontWeight: "bold",
            textAlign: "start",
            marginInlineStart: "0px",
            marginInlineEnd: "0px",
            background: "white",
            border: "1px solid green",
          }}
          autoFocus
          type="text"
          value={tempNote.title}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </form>
    );
  }
  return (
    <>
      <h2
        onDoubleClick={handleDoubleClick}
        style={{
          ...style,
          margin: "3px",
          padding: "2px",
          textAlign: "start",
          height: "auto",
          border: "1px solid green",
        }}
      >
        {tempNote.title}
      </h2>
    </>
  );
};

export default Note;
