import { Grid, Box } from "@mui/material";
import Note from "../components/Note";
import { ButtonAppBar } from "../components/ButtonAppBar";
import NotesList from "../components/NotesList";
import Unauthorized from "./UnauthorizedPage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL } from "../App";
import { getAccessToken, isTokenExpired } from "../utils/tokenUtilities";
import "../styles/NotesPage.css"; // Import the CSS file

const NotesPage = ({ setSignIn }) => {
	const accessToken = getAccessToken();
	const [notes, setNotes] = useState([]);
	const [activeId, setActiveId] = useState(null);
	const [currentNote, setCurrentNote] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (isTokenExpired()) {
			navigate("/signin");
		}

		axios
			.get(`${BACKEND_BASE_URL}/notes`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then((data) => {
				setNotes(data.data);
			})
			.catch((err) => {
				navigate("/signin");
			});
	}, [accessToken]);

	const handleNoteItemClickWrapper = (index, note) => {
		return () => {
			setActiveId(note._id);
			setCurrentNote(note);
		};
	};

	const handleAdd = () => {
		const body = {
			title: "New note",
			description: "",
		};
		const headers = {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		};
		axios.post(`${BACKEND_BASE_URL}/notes/`, body, headers).then((result) => {
			const newNote = result.data;
			console.log("new note: ", newNote);
			setNotes((prevNotes) => {
				const updatedNotes = [...prevNotes, newNote];
				return updatedNotes;
			});
			setCurrentNote(newNote);
			setActiveId(newNote._id);
		});
	};

	return (
		<Box className="notes-page-container">
			<ButtonAppBar className="app-bar-container" />
			<Grid container className="grid-container">
				{/* Notes List (left) */}
				<Grid item xs={12} sm={3} className="notes-list-container">
					<NotesList
						notes={notes}
						activeId={activeId}
						handleAdd={handleAdd}
						handleNoteItemClickWrapper={handleNoteItemClickWrapper}
					/>
				</Grid>

				{/* Note Detail (right) */}
				<Grid item xs={12} sm={9} className="note-detail-container">
					<Note
						currentNote={currentNote}
						setCurrentNote={setCurrentNote}
						activeId={activeId}
						setActiveId={setActiveId}
						notes={notes}
						setNotes={setNotes}
					/>
				</Grid>
			</Grid>
		</Box>
	);
};

export default NotesPage;
