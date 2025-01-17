import { Button, IconButton, TextField, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import ErrorNotification from "./ErrorNotification";

const PasswordVisibility = ({ showPassword, handlePasswordVisibility }) => {
	return (
		<IconButton onClick={handlePasswordVisibility}>
			{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
		</IconButton>
	);
};

export default function UserSigninForm({
	signIn,
	toggleSignIn,
	handleSubmit,
	username,
	setUsername,
	password,
	setPassword,
	error,
	setError,
}) {
	const [showPassword, setShowPassword] = useState(false);

	const handlePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div
			style={{
				padding: "5%",
				width: "50%",
				height: "auto",
				alignItems: "center",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
			}}
		>
			<Typography variant="h5">
				{signIn ? "User sign in" : "User sign up"}
			</Typography>
			{error && <ErrorNotification error={error} setError={setError} />}
			<form onSubmit={handleSubmit}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						padding: "5%",
						margin: "5%",
						width: "9 0%",
					}}
				>
					<TextField
						required
						value={username}
						label="username"
						size="small"
						sx={{
							margin: 1,
						}}
						onChange={(e) => setUsername(e.target.value)}
						InputProps={{
							startAdornment: (
								<AccountCircle
									style={{
										marginRight: 10,
									}}
								/>
							),
						}}
					/>
					<TextField
						required
						value={password}
						type={showPassword ? "text" : "password"}
						label="Password"
						onChange={(e) => setPassword(e.target.value)}
						size="small"
						sx={{
							margin: 1,
						}}
						InputProps={{
							startAdornment: (
								<PasswordIcon
									style={{
										marginRight: 10,
									}}
								/>
							),
							endAdornment: (
								<PasswordVisibility
									showPassword={showPassword}
									handlePasswordVisibility={handlePasswordVisibility}
								/>
							),
						}}
					/>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<Button
							variant="text"
							size="small"
							onClick={toggleSignIn}
							style={{
								fontSize: "10px",
							}}
						>
							{signIn ? "create account" : "already user?"}
						</Button>
						<Button
							variant="contained"
							type="submit"
							sx={{
								alignSelf: "flex-end",
								width: "auto",
								fontSize: "12px",
							}}
						>
							{signIn ? "Sign in" : "Sign up"}
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}
