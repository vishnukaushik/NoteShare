import { ButtonAppBar } from "../components/ButtonAppBar";
import { Stack, Grid, Box } from "@mui/material";
import Note from "../components/Note";
import NotesList from "../components/NotesList";
import Unauthorized from "./UnauthorizedPage";
import { useState } from "react";

const style = {
  // border: "1px solid black",
};

const notes = [
  {
    _id: "659a2a94208919d0c3d60416",
    userId: "65841d257a52b4e8ec2fbfda",
    title: "do web dev daily",
    description: "Make sure to code daily",
    status: "not started",
    __v: 0,
  },
  {
    _id: "659a2aa6208919d0c3d60418",
    userId: "65841d257a52b4e8ec2fbfda",
    title: "do gym daily",
    description: "Make sure to gym daily",
    status: "not started",
    __v: 0,
  },
];

const TodosPage = () => {
  console.log("Inside todos page");
  const token = localStorage.getItem("token");
  if (!token) return <Unauthorized />;

  const [activeId, setActiveId] = useState(null);
  const handleNoteItemClickWrapper = (id) => {
    return () => {
      setActiveId(id);
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
          <Note activeId={activeId} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TodosPage;
