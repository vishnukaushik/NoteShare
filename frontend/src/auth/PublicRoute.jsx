import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../utils/tokenUtilities";

const PublicRoute = ({ children }) => {
	const token = localStorage.getItem("token");

	if (!isTokenExpired) {
		return <Navigate to="/notes" replace />;
	}

	return children;
};

export default PublicRoute;
