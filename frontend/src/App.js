import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from "./pages/SearchPage";
import CartPage from './pages/CartPage'; // Importar la CartPage
import { CartProvider } from './context/CartContext'; // Importar el CartProvider

const App = () => {
  return (
  <CartProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />  {/* Ruta predeterminada */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/search" element={<SearchPage />} />  {/* Agregar la ruta de búsqueda */}
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  </CartProvider>
  );
};

export default App;
