import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useCallback, useEffect, useState, useRef } from "react";
import {
	EditNote as EditNoteIcon,
	Share as ShareIcon,
	Delete as DeleteIcon,
	Save as SaveIcon,
	Cancel as CancelIcon,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import axios from "axios";
import { BACKEND_BASE_URL } from "../App";
import SharePopUp from "./SharePopUp";
import DeletePopup from "./DeletePopup";
import { getAccessToken } from "../utils/tokenUtilities";
import { useNavigate } from "react-router-dom";
import "../styles/textEditor.css";
import ReactQuill from "react-quill";
import _ from "lodash";

const style = {
	color: "black",
};

const Note = ({
	currentNote,
	setCurrentNote,
	activeId,
	setActiveId,
	notes,
	setNotes,
}) => {
	if (!activeId) return <h4 style={style}>No note is selected</h4>;

	const navigate = useNavigate();
	const token = getAccessToken();
	if (token === null) navigate("/signin");

	return (
		<>
			<Editor
				currentNote={currentNote}
				setCurrentNote={setCurrentNote}
				activeId={activeId}
				setActiveId={setActiveId}
				notes={notes}
				setNotes={setNotes}
			/>
		</>
	);
};

const Editor = ({
	currentNote,
	setCurrentNote,
	activeId,
	setActiveId,
	notes,
	setNotes,
}) => {
	const navigate = useNavigate();
	const accessToken = getAccessToken();
	if (accessToken === null) navigate("/signin");
	const [editable, setEditable] = useState(false);
	const quillRef = useRef(null);

	var toolbarOptions = [
		["bold", "italic", "underline", "strike"],
		["blockquote", "code-block"],

		[{ list: "ordered" }, { list: "bullet" }],
		[{ indent: "-1" }, { indent: "+1" }],

		[{ size: ["small", false, "large", "huge"] }],

		["clean"],
	];

	const modules = {
		toolbar: editable ? toolbarOptions : false,
	};

	const handleSave = () => {
		setEditable(false);
		axios
			.put(`${BACKEND_BASE_URL}/notes/${currentNote._id}`, currentNote, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then((result) => {
				const savedNote = result.data;
				console.log("saved request successful: ", savedNote);
				setNotes(
					notes.map((note) => {
						if (note._id === savedNote._id) return savedNote;
						return note;
					})
				);
			});
	};
	const toggleEdit = () => {
		setEditable((prev) => !prev);
	};

	const handleShare = () => {
		// TODO implement share function
		setShowSharePopup(true);
		console.log("Implement Share function");
	};

	const handleDescriptionChange = (content) => {
		if (editable) {
			setCurrentNote((prevNote) => {
				return { ...prevNote, description: content };
			});
		}
	};

	const handleCancel = () => {
		toggleEdit();
		if (activeId) setCurrentNote(notes.find((item) => item._id === activeId));
	};

	return (
		<div
			style={{
				height: "100%",
				display: "flex",
				flexFlow: "column",
			}}
		>
			<EditorToolbar
				notes={notes}
				setNotes={setNotes}
				note={currentNote}
				activeId={activeId}
				setActiveId={setActiveId}
				editable={editable}
				toggleEdit={toggleEdit}
				handleSave={handleSave}
				handleCancel={handleCancel}
				currentNote={currentNote}
				setCurrentNote={setCurrentNote}
				handleShare={handleShare}
			/>
			<ReactQuill
				className="container"
				ref={quillRef}
				value={currentNote.description}
				readOnly={!editable}
				onChange={handleDescriptionChange}
				style={{
					flexGrow: 1,
					display: "flex",
					flexFlow: "column",
					color: "black",
					height: "100%",
				}}
			/>
		</div>
	);
};

const EditorToolbar = ({
	notes,
	setNotes,
	note,
	activeId,
	setActiveId,
	editable,
	toggleEdit,
	handleSave,
	handleCancel,
	currentNote,
	setCurrentNote,
}) => {
	useEffect(() => {
		setCurrentNote(note);
	}, [activeId]);
	const handleChange = (event) => {
		setCurrentNote(() => {
			return {
				...currentNote,
				title: event.target.value,
			};
		});
	};
	if (editable) {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<input
					style={{
						...style,
						fontSize: "1.5em",
						fontWeight: "bold",
						textAlign: "start",
						background: "white",
						margin: "3px",
						padding: "2px",
						height: "auto",
						display: "inline-block",
						border: "white",
					}}
					autoFocus
					type="text"
					value={currentNote.title}
					onChange={handleChange}
				/>
				<div>
					<IconButton
						title="Save"
						sx={{
							marginRight: "10px",
						}}
						onClick={handleSave}
					>
						<SaveIcon
							sx={{
								color: "black",
								fontSize: 30,
							}}
						/>
					</IconButton>
					<IconButton
						title="Cancel"
						sx={{
							marginRight: "10px",
						}}
						onClick={handleCancel}
					>
						<CancelIcon
							sx={{
								color: "black",
								fontSize: 30,
							}}
						/>
					</IconButton>
				</div>
			</div>
		);
	}
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
			}}
		>
			<h2
				style={{
					...style,
					margin: "3px",
					padding: "2px",
					textAlign: "start",
					height: "auto",
					display: "inline-block",
					whiteSpace: "nowrap",
					overflow: "auto",
				}}
			>
				{currentNote.title}
			</h2>
			<div
				style={{
					display: "flex",
				}}
			>
				<IconButton
					title="Edit"
					sx={{
						marginRight: "5px",
					}}
					onClick={toggleEdit}
				>
					<EditNoteIcon
						sx={{
							color: "black",
							fontSize: 30,
						}}
					/>
				</IconButton>
				<DeletePopup
					notes={notes}
					setNotes={setNotes}
					currentNote={currentNote}
					setActiveId={setActiveId}
				/>
				<SharePopUp />
			</div>
		</div>
	);
};

export default Note;
