import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      {isAuthenticated ? (
        <>
          <div>
            <Link to="/home-quiz" className="mr-4">Mes quiz</Link>
            <Link to="/new-quiz" className="mr-4">Créer un Quiz</Link>
          </div>
          <button onClick={handleLogout}>Déconnexion</button>
        </>
      ) : (
        <div>
          <Link to="/login" className="mr-4">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
