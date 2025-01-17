import { Card, CardContent, toggleButtonClasses } from "@mui/material";
import UserSignInForm from "../components/UserSigninForm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL } from "../App";

export default function SigninPage({ signIn, setSignIn }) {
	const navigate = useNavigate();
	useEffect(() => {
		signIn ? setSignIn(true) : setSignIn(false);
	}, [signIn]);
	const toggleSignIn = () => {
		signIn ? navigate("/signup") : navigate("/signin");
		setSignIn((val) => !val);
	};
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const handleSignIn = (event) => {
		event.preventDefault();
		axios
			.post(`${BACKEND_BASE_URL}/auth/signin`, { username, password })
			.then((result) => {
				const token = result.data.token;
				localStorage.setItem("token", token);
				navigate("/notes");
			})
			.catch((err) => {
				console.error(`request sent but FAILED: ${err}`);
				localStorage.setItem("token", null);
				setError("Invalid username or password!");
				setTimeout(() => {
					setError(null);
				}, 5000);
			});
		setUsername("");
		setPassword("");
	};

	const handleSignUp = () => {
		event.preventDefault();
		axios
			.post(`${BACKEND_BASE_URL}/auth/signup`, { username, password })
			.then((result) => {
				const token = result.data.token;
				localStorage.setItem("token", token);
				navigate("/notes");
			})
			.catch((err) => {
				console.error(`request sent but FAILED: ${err}`);
				localStorage.setItem("token", null);
				setError("Unable to signup!");
				setTimeout(() => {
					setError(null);
				}, 5000);
			});
		setUsername("");
		setPassword("");
	};

	return (
		<Card
			sx={{
				width: "100%",
				height: "50%",
				padding: "5%",
				margin: "5%",
			}}
		>
			<CardContent
				style={{
					display: "flex",
				}}
			>
				<div
					style={{
						margin: "auto",
						width: "50%",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						// border: "solid black",
					}}
				>
					<img
						src="../assets/notesLogo.png"
						width="50%"
						height="auto"
						style={{
							// border: "solid black",
							margin: "2%",
						}}
					/>
					<h4
						style={{
							margin: "auto",
							fontSize: "200%",
							// border: "solid black",
						}}
					>
						Notes App
					</h4>
				</div>
				<UserSignInForm
					signIn={signIn}
					toggleSignIn={toggleSignIn}
					handleSubmit={signIn ? handleSignIn : handleSignUp}
					username={username}
					setUsername={setUsername}
					password={password}
					setPassword={setPassword}
					error={error}
					setError={setError}
				/>
			</CardContent>
		</Card>
	);
}
