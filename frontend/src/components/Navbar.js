import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Navbar.css';
import { CartContext } from '../context/CartContext';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { currentUser, logoutUser } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { cart } = useContext(CartContext); // Accede al estado del carrito


  const handleLogout = () => {
    logoutUser();
    navigate('/'); // Redirige a la página principal
  };

  // Manejar el cambio en la barra de búsqueda
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Enviar búsqueda al presionar el botón de búsqueda
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery.trim()}`); // Redirigir a la SearchPage
      setSearchQuery(''); // Limpiar la barra de búsqueda
    }
  };

   // Manejar el clic en el botón del carrito
  const handleCartClick = () => {
    if (currentUser) {
      // Si el usuario está autenticado, ir al carrito
      navigate('/cart');
    } else {
      // Si no está autenticado, redirigir al login
      alert('Debes iniciar sesión para acceder al carrito.');
      navigate('/login');
    }
  };

   return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src={logo} alt="LibroHub Logo" className="logo" />
      </Link>

      <form className="navbar-search" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Buscar libros..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button type="submit" className="search-button">🔍</button>
      </form>

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
       {/* Botón para redirigir al carrito */}
         {/* Botón para redirigir al carrito */}
        <button className="cart-button" onClick={handleCartClick}>
          🛒 ({cart.length})
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

