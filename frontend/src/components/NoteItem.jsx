import { Typography, Grid, ButtonBase } from "@mui/material";

const style = {
  color: "black",
  //   border: "solid black",
};

const NoteItem = ({ note }) => {
  return (
    <ButtonBase
      style={{
        borderBottom: "solid black",
      }}
      sx={{
        display: "block",
        width: "100%",
      }}
    >
      <Grid container alignContent="flex-start" flexDirection="column">
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
