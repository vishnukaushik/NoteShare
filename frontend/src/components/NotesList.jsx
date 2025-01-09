import NoteItem from "./NoteItem";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { IconButton } from "@mui/material";
import "../styles/NotesPage.css";


const NotesList = ({
  notes,
  activeId,
  handleNoteItemClickWrapper,
  handleAdd,
}) => {
  return (
    <div
      style={{
        position: "relative",
        height: "inherit",
      }}
    >
      {notes.map((note, index) => {
        return (
          <NoteItem
            key={index}
            index={index}
            note={note}
            activeId={activeId}
            handleNoteItemClick={handleNoteItemClickWrapper(index + 1, note)}
          />
        );
      })}
      <IconButton
        sx={{
          marginRight: "10px",
          position: "absolute",
          bottom: "20px",
          right: "5px",
        }}
        onClick={handleAdd}
      >
        <NoteAddIcon
          sx={{
            color: "#2563eb",
            fontSize: 30,
          }}
        />
      </IconButton>
    </div>
  );
};
export default NotesList;
