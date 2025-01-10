import { Navigate } from 'react-router-dom';
import { isTokenExpired } from '../utils/tokenUtilities';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (isTokenExpired(token)) {
    return <Navigate to="/signin" replace />;
  }
  
  return children;
};

export default ProtectedRoute;