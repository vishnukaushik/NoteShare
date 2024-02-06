import { ButtonAppBar } from "../components/ButtonAppBar";
import { Grid, Box } from "@mui/material";
import Note from "../components/Note";
import NotesList from "../components/NotesList";
import Unauthorized from "./UnauthorizedPage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL } from "../App";

const style = {
  // border: "1px solid black",
};


let currentNote = null;

const NotesPage = () => {
  console.log("Inside notes page");
  const token = localStorage.getItem("token");
  if (token === null) return <Unauthorized />;
  const [notes, setNotes] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BACKEND_BASE_URL}/notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log("notes set to: ", data.data);
        console.log("data: ", data);
        setNotes(data.data);
      })
      .catch((err) => {
        navigate("/login");
      });
  }, []);

  const handleNoteItemClickWrapper = (id, note) => {
    return () => {
      setActiveId(id);
      currentNote = note; // check to remove this variable
    };
  };

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <ButtonAppBar
        style={{ position: "sticky", width: "100%", height: "7%" }}
      />
      <Grid container style={{ width: "100%", height: "93%" }}>
        <Grid
          item
          xs={3}
          style={{
            float: "left",
            ...style,
            height: "100%",
            border: "groove blue",
            overflowY: "auto",
          }}
        >
          <NotesList
            notes={notes}
            activeId={activeId}
            setActiveId={setActiveId}
            handleNoteItemClickWrapper={handleNoteItemClickWrapper}
          />
        </Grid>
        <Grid
          item
          xs={9}
          style={{
            float: "right",
            ...style,
            height: "100%",
            overflowY: "auto",
          }}
        >
          <Note note={currentNote} activeId={activeId} notes={ notes} setNotes={setNotes} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NotesPage;
