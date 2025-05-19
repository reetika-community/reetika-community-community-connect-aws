import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { auth } = useContext(AuthContext);

  if (!auth) return <Navigate to="/login" />;
  if (role && auth.user.role !== role) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
