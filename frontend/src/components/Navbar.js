// frontend/src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom'; // Importar Link de React Router
import './Navbar.css';
import logo from '../assets/logo.png'; // Asegúrate de que el logo esté bien importado

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo y título */}
      <div className="navbar-logo">
        <img src={logo} alt="LibroHub Logo" className="logo" />
        <h1 className="navbar-title">Librohub</h1>
      </div>

      {/* Barra de búsqueda */}
      <div className="navbar-search">
        <input type="text" placeholder="Buscar..." className="search-input" />
        <button className="search-button">🔍</button>
      </div>

      {/* Iniciar sesión y carrito */}
      <div className="navbar-icons">
        <Link to="/login" className="login-link">
          <button className="login-button">Iniciar sesión</button>
        </Link>
        <button className="cart-button">🛒</button>
      </div>
    </nav>
  );
};

export default Navbar;
