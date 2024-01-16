import { Typography, Grid, ButtonBase } from "@mui/material";

const style = {
  color: "black",
  //   border: "solid black",
};

const NoteItem = ({ note }) => {
  return (
    <ButtonBase
      style={{
        borderBottom: "solid #026cde 1px",
      }}
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
        <Typography
          style={{ ...style, padding: "0px 5px", textAlign: "left" }}
        >
          {note.description}
        </Typography>
      </Grid>
    </ButtonBase>
  );
};

export default NoteItem;
