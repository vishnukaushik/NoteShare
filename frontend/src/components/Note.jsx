import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useCallback, useEffect, useState } from "react";
import "../styles/textEditor.css";
import {
  EditNote as EditNoteIcon,
  Share as ShareIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import axios from "axios";
import { BACKEND_BASE_URL } from "../App";

const style = {
  color: "black",
};

var quill;
const Note = ({ note, activeId, setActiveId, notes, setNotes }) => {
  if (!activeId) return <h4 style={style}>No note is selected</h4>;
  return (
    <>
      <Editor
        note={note}
        activeId={activeId}
        setActiveId={setActiveId}
        notes={notes}
        setNotes={setNotes}
      />
    </>
  );
};

const Editor = ({ note, activeId, setActiveId, notes, setNotes }) => {
  const [editable, setEditable] = useState(false);
  const [currentNote, setCurrentNote] = useState(note);

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
      quill = new Quill(editor, {
        theme: "snow",
        modules: {
          toolbar: toolbarOptions,
        },
      });
      quill.setContents(note.description);
      if (!editable) quill.enable(false);
      quill.on("text-change", () => {
        setCurrentNote((thisNote) => {
          return { ...thisNote, description: quill.getContents().ops };
        });
      });
    },
    [note]
  );
  const handleSave = () => {
    setEditable(false);
    if (quill) {
      quill.enable(false);

      if (currentNote._id === "newnote") {
        axios
          .post(
            `${BACKEND_BASE_URL}/notes/`,
            {
              title: currentNote.title,
              description: currentNote.description,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((savedNote) => {
            currentNote._id = savedNote.data._id;
            setNotes(
              notes.map((note) => {
                if (note._id === "newnote") return savedNote.data;
                return note;
              })
            );
          });
      } else {
        axios
          .put(`${BACKEND_BASE_URL}/notes/${currentNote._id}`, currentNote, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((savedNote) => {
            console.log("saved request successful: ", savedNote);
            setNotes(
              notes.map((note) => {
                if (note._id === currentNote._id) return savedNote.data;
                return note;
              })
            );
          });
      }
    }
  };
  const handleEdit = () => {
    setEditable(true);
    if (quill) quill.enable(true);
  };

  const handleDelete = () => {
    // TODO implement delete function

    setNotes(notes.filter((note) => note._id !== currentNote._id));
    setActiveId(null);

    axios
      .delete(`${BACKEND_BASE_URL}/notes/${currentNote._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        console.log("note deleted successfully: ", result);
      })
      .catch((err) => {
        console.error("error deleting the note: ", err);
      });
    console.log("Implement Delete function");
  };

  const handleShare = () => {
    // TODO implement share function
    console.log("Implement Share function");
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexFlow: "column",
      }}
    >
      <EditorToolbar
        note={note}
        activeId={activeId}
        editable={editable}
        setEditable={setEditable}
        handleEdit={handleEdit}
        handleSave={handleSave}
        currentNote={currentNote}
        setCurrentNote={setCurrentNote}
        handleDelete={handleDelete}
        handleShare={handleShare}
      />
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

const EditorToolbar = ({
  note,
  activeId,
  editable,
  setEditable,
  handleEdit,
  handleSave,
  currentNote,
  setCurrentNote,
  handleShare,
  handleDelete,
}) => {
  useEffect(() => {
    setCurrentNote(note);
  }, [activeId]);

  const handleChange = (event) => {
    setCurrentNote(() => {
      return {
        ...currentNote,
        title: event.target.value,
      };
    });
  };
  if (editable) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <input
          style={{
            ...style,
            height: "40px",
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
          value={currentNote.title}
          onChange={handleChange}
        />
        <IconButton
          sx={{
            marginRight: "10px",
          }}
          onClick={handleSave}
        >
          <SaveIcon
            sx={{
              color: "black",
              fontSize: 30,
            }}
          />
        </IconButton>
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h2
        style={{
          ...style,
          margin: "3px",
          padding: "2px",
          textAlign: "start",
          height: "auto",
          border: "1px solid green",
          display: "inline-block",
        }}
      >
        {currentNote.title}
      </h2>
      <div>
        <IconButton
          sx={{
            marginRight: "5px",
          }}
          onClick={handleEdit}
        >
          <EditNoteIcon
            sx={{
              color: "black",
              fontSize: 30,
            }}
          />
        </IconButton>
        <IconButton
          sx={{
            marginRight: "10px",
          }}
          onClick={handleDelete}
        >
          <DeleteIcon
            sx={{
              color: "black",
              fontSize: 30,
            }}
          />
        </IconButton>
        <IconButton
          sx={{
            marginRight: "10px",
          }}
          onClick={handleShare}
        >
          <ShareIcon
            sx={{
              color: "black",
              fontSize: 30,
            }}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default Note;
