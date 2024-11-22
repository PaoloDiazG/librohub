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
        <h1 className="navbar-title">LibroHub</h1>
      </Link>

      <form className="navbar-search" onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Buscar libros..." className="search-input" />
        <button type="submit" className="search-button">🔍</button>
      </form>

      <div className="navbar-icons">
        {currentUser ? (
          <>
            {/* Mostrar opciones de admin si el usuario es admin */}
            {currentUser.isAdmin && (
              <div className="admin-section">
                <Link to="/admin/add" className="admin-link">
                  <button className="admin-button">Agregar Libro</button>
                </Link>
                <Link to="/admin/edit" className="admin-link">
                  <button className="admin-button">Modificar Libro</button>
                </Link>
                <Link to="/admin/delete" className="admin-link">
                  <button className="admin-button">Eliminar Libro</button>
                </Link>
              </div>
            )}

            <button className="logout-button" onClick={handleLogout}>
              Cerrar Sesión
            </button>
            <button className="cart-button" onClick={handleCartClick}>
              🛒 ({cart.length})
            </button>
          </>
        ) : (
          <Link to="/login" className="login-link">
            <button className="login-button">Iniciar Sesión</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;