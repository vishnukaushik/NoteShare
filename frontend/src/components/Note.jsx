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
import SharePopUp from "./SharePopUp";
import DeletePopup from "./DeletePopup";
import { getAccessToken } from "../utils/tokenUtilities";
import { useNavigate } from "react-router-dom";

const style = {
  color: "black",
};

var quill;
const Note = ({ currentNote, setCurrentNote, activeId, setActiveId, notes, setNotes }) => {
  if (!activeId) return <h4 style={style}>No note is selected</h4>;

  const navigate = useNavigate();
  const token = getAccessToken();
  if(token === null)
      navigate('/signin');

  return (
    <>
      <Editor
        currentNote={currentNote}
        setCurrentNote={setCurrentNote}
        activeId={activeId}
        setActiveId={setActiveId}
        notes={notes}
        setNotes={setNotes}
      />
    </>
  );
};

const Editor = ({ currentNote, setCurrentNote, activeId, setActiveId, notes, setNotes }) => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  if(accessToken === null)
      navigate('/signin');
  const [editable, setEditable] = useState(false);
  // const [currentNote, setCurrentNote] = useState(currentNote);

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
      quill.setContents(currentNote.description);
      if (!editable) quill.enable(false);
      quill.on("text-change", () => {
        setCurrentNote((thisNote) => {
          return { ...thisNote, description: quill.getContents().ops };
        });
      });
    },
    [currentNote]
  );
  const handleSave = () => {
    setEditable(false);
    if (quill) {
      quill.enable(false);

      console.log("currentNote: ", currentNote);
      console.log("Note: ", currentNote)
      
      axios
      .put(`${BACKEND_BASE_URL}/notes/${currentNote._id}`, currentNote, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((result) => {
        const savedNote = result.data;
        console.log("saved request successful: ", savedNote);
        setNotes(
          notes.map((note) => {
            if (note._id === savedNote._id) return savedNote;
            return note;
          })
        );
      });

    }
  };
  const handleEdit = () => {
    setEditable(true);
    if (quill) quill.enable(true);
  };

  const handleShare = () => {
    // TODO implement share function
    setShowSharePopup(true);
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
        notes={notes}
        setNotes={setNotes}
        note={currentNote}
        activeId={activeId}
        setActiveId={setActiveId}
        editable={editable}
        setEditable={setEditable}
        handleEdit={handleEdit}
        handleSave={handleSave}
        currentNote={currentNote}
        setCurrentNote={setCurrentNote}
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
  notes,
  setNotes,
  note,
  activeId,
  setActiveId,
  editable,
  handleEdit,
  handleSave,
  currentNote,
  setCurrentNote
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
        <DeletePopup
          notes={notes}
          setNotes={setNotes}
          currentNote={currentNote}
          setActiveId={setActiveId}
        />
        <SharePopUp />
      </div>
    </div>
  );
};

export default Note;
