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
import EmailList from "./EmailList";

const ShowToast = ({ open, setOpen, toastContent }) => {
	const handleClose = () => {
		setOpen((prev) => !prev);
	};
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			maxWidth="md"
			fullWidth
			className="rounded-lg"
		>
			<DialogTitle className="flex justify-between items-center border-b">
				<span className="text-xl font-semibold">Shared with</span>
			</DialogTitle>

			<DialogContent className="p-6">
				<div className="flex-1">
					{toastContent.length === 0 ? (
						<p className="text-sm text-gray-500">Not shared with anyone</p>
					) : (
						<>
							<EmailList
								emailList={toastContent.failedEmails}
								isFailed={true}
							/>
							<EmailList emailList={toastContent.successEmails} />
						</>
					)}
				</div>
			</DialogContent>

			<Box className="flex justify-around gap-2 mt-8">
				<Button
					variant="outlined"
					onClick={handleClose}
					className="text-gray-600"
				>
					Close
				</Button>
			</Box>
		</Dialog>
	);
};

export default ShowToast;
