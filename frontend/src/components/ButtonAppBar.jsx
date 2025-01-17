import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "../styles/NotesPage.css";

export function ButtonAppBar() {
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/signin");
	};
	return (
		<AppBar className="app-bar">
			<Toolbar>
				<div style={{ flexGrow: 1 }}>
					<Typography variant="h6" align="left">
						Notes Application
					</Typography>
				</div>
				<div>
					<Button color="inherit" onClick={handleLogout}>
						Logout
					</Button>
				</div>
			</Toolbar>
		</AppBar>
	);
}
