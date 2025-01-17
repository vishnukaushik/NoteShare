import NoteItem from "./NoteItem";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { IconButton } from "@mui/material";
import { getAccessToken, isTokenExpired } from "../utils/tokenUtilities";
import "../styles/NotesPage.css";

const NotesList = ({
	notes,
	activeId,
	handleNoteItemClickWrapper,
	handleAdd,
}) => {
	if (isTokenExpired()) {
		navigate("/signin");
	}

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
						activeId={activeId === note._id ? true : false}
						handleNoteItemClick={handleNoteItemClickWrapper(index + 1, note)}
					/>
				);
			})}
			<IconButton
				title="Add note"
				className="add-button-container"
				sx={{
					position: "absolute",
					bottom: "20px",
					right: "5px",
					backgroundColor: "#2563eb",
				}}
				onClick={handleAdd}
			>
				<NoteAddIcon className="add-button" />
			</IconButton>
		</div>
	);
};
export default NotesList;
