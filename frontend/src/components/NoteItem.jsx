import { Typography, Grid, ButtonBase } from "@mui/material";

const style = {
  color: "black",
  //   border: "solid black",
};

const NoteItem = ({ note, index, activeId, handleNoteItemClick }) => {
  return (
    <ButtonBase
      className={index + 1 === activeId ? "selectedNoteItem" : "noteItem"}
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
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          whiteSpace={"nowrap"}
          style={{
            ...style,
            width: "inherit",
            fontSize: "1.3rem",
            textAlign: "left",
            padding: "0px 5px",
            fontWeight: "bold",
          }}
        >
          {note.title}
        </Typography>
        <Typography
          overflow={"hidden"}
          style={{
            ...style,
            width: "inherit",
            padding: "0px 5px",
            textAlign: "left",
            fontSize: "0.8rem",
          }}
          whiteSpace={"nowrap"}
          textOverflow={"ellipsis"}
        >
          {/* {note.description[0]["insert"]} */}
        </Typography>
      </Grid>
    </ButtonBase>
  );
};

export default NoteItem;
