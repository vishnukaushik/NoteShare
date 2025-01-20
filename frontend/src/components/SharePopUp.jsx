import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	IconButton,
	TextField,
	Chip,
	Box,
	Divider,
} from "@mui/material";
import { Share, Close } from "@mui/icons-material";
import "../styles/SharePopup.css";
import axios from "axios";
import { BACKEND_BASE_URL } from "../App";
import { getAccessToken } from "../utils/tokenUtilities";

const SharePopup = ({ currentNote }) => {
	const [open, setOpen] = useState(false);
	const [email, setEmail] = useState("");
	const [emailList, setEmailList] = useState([]);

	const containerRef = useRef(null); // Reference to the container
	const lastItemRef = useRef(null); // Reference to the last item

	const navigate = useNavigate();
	const token = getAccessToken();
	if (token === null) navigate("/signin");

	// Scroll to the last item when the items array changes
	useEffect(() => {
		if (lastItemRef.current) {
			lastItemRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [emailList]); // Dependency array to trigger when items change

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setEmail("");
		setEmailList([]);
	};

	const handleShare = () => {
		const accessLevel = "view";
		const payload = {
			accessLevel,
			emailsList: emailList,
		};
		axios
			.put(`${BACKEND_BASE_URL}/notes/share/${currentNote._id}`, payload, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((result) => {
				console.log("successful emails: ", result.data.successEmails);
				console.log("failed emails: ", result.data.failedEmails);
			})
			.catch((err) => {
				console.log("Error occured: ", err);
			});
	};

	const handleAddEmail = () => {
		if (email && email.includes("@")) {
			setEmailList([...emailList, email]);
			setEmail("");
		}
	};

	const handleRemoveEmail = (index) => {
		setEmailList((prevEmails) => {
			const newEmails = [...prevEmails];
			newEmails.splice(index, 1);
			return newEmails;
		});
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleAddEmail();
		}
	};

	return (
		<div className="relative">
			<IconButton
				title="Share"
				onClick={handleClickOpen}
				sx={{
					marginRight: "5px",
				}}
			>
				<Share
					sx={{
						color: "black",
						fontSize: 30,
					}}
				/>
			</IconButton>

			<Dialog
				open={open}
				onClose={handleClose}
				maxWidth="md"
				fullWidth
				className="rounded-lg"
			>
				<DialogTitle className="flex justify-between items-center border-b">
					<span className="text-xl font-semibold">Share with</span>
				</DialogTitle>

				<DialogContent className="p-6">
					<div className="flex gap-8 justify-evenly">
						<div className="flex-1">
							<div className="flex justify-col gap-2">
								<TextField
									autoFocus
									label="Email address"
									type="email"
									variant="outlined"
									fullWidth
									size="small"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									onKeyPress={handleKeyPress}
									className="flex-1 item"
								/>
								<div className="item button-container">
									<Button
										variant="contained"
										onClick={handleAddEmail}
										className="bg-blue-500 hover:bg-blue-600"
									>
										Add
									</Button>
								</div>
							</div>
						</div>

						<Divider orientation="vertical" flexItem />

						<div className="flex-1">
							<h3 className="text-sm font-medium mb-3 text-gray-700">
								Recipients
							</h3>
							<div className="space-y-2">
								{emailList.length === 0 ? (
									<p className="text-sm text-gray-500">No recipients added</p>
								) : (
									<div className="flex flex-wrap gap-2" ref={containerRef}>
										{emailList.map((email, index) => (
											<Chip
												key={index}
												ref={
													index === emailList.length - 1 ? lastItemRef : null
												}
												label={email}
												onDelete={() => handleRemoveEmail(index)}
												className="bg-gray-100 hover:bg-gray-200"
											/>
										))}
									</div>
								)}
							</div>
						</div>
					</div>
				</DialogContent>
				<Box className="flex justify-around gap-2 mt-8">
					<Button
						variant="outlined"
						onClick={handleClose}
						className="text-gray-600"
					>
						Cancel
					</Button>
					<Button
						variant="contained"
						className="bg-blue-500 hover:bg-blue-600"
						onClick={handleShare}
					>
						Share
					</Button>
				</Box>
			</Dialog>
		</div>
	);
};

export default SharePopup;
