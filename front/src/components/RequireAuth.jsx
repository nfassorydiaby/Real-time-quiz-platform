import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [navigate, token]);

  return token ? children : null;
};

export default RequireAuth;
