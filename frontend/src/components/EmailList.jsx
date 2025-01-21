import { CheckCircle, XCircle } from "lucide-react";
import "../styles/EmailList.css";

const EmailList = ({ emailList, isFailed = false }) => {
	const getStatusIcon = () => {
		switch (isFailed) {
			case false:
				return <CheckCircle className="success-icon" />;
			case true:
				return <XCircle className="error-icon" />;
			default:
				return null;
		}
	};

	return (
		<>
			{/* <div className="flex flex-wrap gap-2">{JSON.stringify(emailList)}</div> */}
			<div className="space-y-2">
				{emailList.map((item) => (
					<div key={item.email} className="email-item">
						<span className="email-address">{item.email}</span>
						<div className="status-wrapper">
							{getStatusIcon()}
							<span className="status-text">{item.message}</span>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default EmailList;
