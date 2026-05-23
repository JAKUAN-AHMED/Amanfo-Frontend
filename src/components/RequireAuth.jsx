import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RequireAuth({ role, children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    const loginPath = role === 'admin' ? '/admin/login' : '/login';
    return <Navigate to={loginPath} state={{ from: location.pathname }} replace />;
  }

  if (role && user.role !== role) {
    const correctHome = user.role === 'admin' ? '/admin/dashboard' : '/senior/dashboard';
    return <Navigate to={correctHome} replace />;
  }

  return children;
}
