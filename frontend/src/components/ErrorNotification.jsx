import { Error } from "@mui/icons-material";
import { Typography } from "@mui/material";

const ErrorNotification = ({ error }) => {
	if (error)
		return (
			<>
				<Error
					style={{
						color: "red",
					}}
				/>
				<Typography
					style={{
						color: "red",
					}}
				>
					{error}
				</Typography>
			</>
		);
	return null;
};

export default ErrorNotification;
