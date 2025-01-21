import { Typography, ButtonBase } from "@mui/material";
import "../styles/NoteItem.css"; // Import the CSS file

const NoteItem = ({ note, index, isActive, handleNoteItemClick }) => {
	const shared = note.shared ? "visible" : "hidden";
	console.log("note: ", note);
	console.log("shared: ", shared);
	return (
		<ButtonBase
			className={isActive ? "note-item selected" : "note-item"}
			onClick={() => handleNoteItemClick(note, index)}
		>
			<div className="note-container">
				<Typography className="note-title">{note.title}</Typography>
				<Typography className="shared-text" visibility={shared}>
					shared
				</Typography>
			</div>
		</ButtonBase>
	);
};

export default NoteItem;
