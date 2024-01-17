import { Typography, Grid, ButtonBase } from "@mui/material";

const style = {
  color: "black",
  //   border: "solid black",
};

const NoteItem = ({ note, index, activeId, handleNoteItemClick }) => {
  // if (activeId === index) {
  //   console.log("selected index: ", index, note);
  // }
  return (
    <ButtonBase
      className={index === activeId ? "selectedNoteItem" : "noteItem"}
      style={{
        borderBottom: "solid #026cde 1px",
      }}
      onClick={handleNoteItemClick}
      sx={{
        display: "block",
        width: "100%",
        borderRadius: "20px",
        boxShadow: "0",
      }}
    >
      <Grid
        container
        alignContent="flex-start"
        flexDirection="column"
        sx={{
          boxShadow: "0",
          padding: "2px",
        }}
      >
        <Typography
          style={{
            ...style,
            fontSize: "1.3rem",
            textAlign: "left",
            padding: "0px 5px",
            fontWeight: "bold",
          }}
        >
          {note.title}
        </Typography>
        <Typography style={{ ...style, padding: "0px 5px", textAlign: "left" }}>
          {note.description}
        </Typography>
      </Grid>
    </ButtonBase>
  );
};

export default NoteItem;
