import { Typography, ButtonBase } from "@mui/material";
import "../styles/NoteItem.css"; // Import the CSS file

const NoteItem = ({ note, index, activeId, handleNoteItemClick, shared }) => {
  return (
    <ButtonBase
      className={index + 1 === activeId ? "note-item selected" : "note-item"}
      onClick={() => handleNoteItemClick(note, index)}
    >
      <div className="note-container">
        <Typography className="note-title">
          {note.title}
        </Typography>
        {shared && (
          <Typography className="shared-text">
            shared
          </Typography>
        )}
      </div>
    </ButtonBase>
  );
};

export default NoteItem;
