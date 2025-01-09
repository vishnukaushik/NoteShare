import { Grid, Box } from "@mui/material";
import Note from "../components/Note";
import { ButtonAppBar } from "../components/ButtonAppBar";
import NotesList from "../components/NotesList";
import Unauthorized from "./UnauthorizedPage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL } from "../App";
import '../styles/NotesPage.css'; // Import the CSS file

const NotesPage = ({ setSignIn }) => {
  const token = localStorage.getItem("token");
  if (token === null) return <Unauthorized setSignIn={setSignIn} />;
  
  const [notes, setNotes] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [currentNote, setCurrentNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BACKEND_BASE_URL}/notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setNotes(data.data);
      })
      .catch((err) => {
        navigate("/signin");
      });
  }, [token, navigate]);

  const handleNoteItemClickWrapper = (index, note) => {
    return () => {
      setActiveId(index);
      setCurrentNote(note);
    };
  };

  const handleAdd = () => {
    const newNote = {
      _id: Date.now(),
      userId: "temp_userId",
      title: "New note",
      description: [],
    };
    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes, newNote];
      setCurrentNote(newNote); // Set current note to the newly added one
      return updatedNotes;
    });
  };

  return (
    <Box className="notes-page-container">
      <ButtonAppBar className="app-bar-container" />
      <Grid container className="grid-container">
        {/* Notes List (left) */}
        <Grid
          item
          xs={12} sm={3}
          className="notes-list-container"
        >
          <NotesList
            notes={notes}
            activeId={activeId}
            handleAdd={handleAdd}
            handleNoteItemClickWrapper={handleNoteItemClickWrapper}
          />
        </Grid>
        
        {/* Note Detail (right) */}
        <Grid
          item
          xs={12} sm={9}
          className="note-detail-container"
        >
          <Note
            note={currentNote}
            activeId={activeId}
            setActiveId={setActiveId}
            notes={notes}
            setNotes={setNotes}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NotesPage;
