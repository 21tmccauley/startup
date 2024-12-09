import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useEffect } from 'react';

export function PrivateRoute({ children }) {
  const { user, loading } = useUser();

  useEffect(() => {
    console.log('PrivateRoute - User state:', user);
    console.log('PrivateRoute - Loading state:', loading);
  }, [user, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log('No user found, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  return children;
}