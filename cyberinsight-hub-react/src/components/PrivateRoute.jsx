import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

export function PrivateRoute({ children }) {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>; // or a proper loading spinner
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}