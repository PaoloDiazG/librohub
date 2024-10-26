// frontend/src/components/Navbar.js

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { currentUser, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/'); // Redirige a la página principal
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="LibroHub Logo" className="logo" />
        <h1 className="navbar-title">Librohub</h1>
      </div>

      <div className="navbar-search">
        <input type="text" placeholder="Buscar..." className="search-input" />
        <button className="search-button">🔍</button>
      </div>

      <div className="navbar-icons">
        {currentUser ? (
          <div className="account-section">
            <Link to="/profile" className="login-link">
              <button className="account-button">Mi Cuenta</button>
            </Link>
            <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        ) : (
          <Link to="/login" className="login-link">
            <button className="login-button">Iniciar Sesión</button>
          </Link>
        )}
        <button className="cart-button">🛒</button>
      </div>
    </nav>
  );
};

export default Navbar;


