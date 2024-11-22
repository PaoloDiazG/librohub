import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AddBookPage from './pages/AddBookPage';
import SearchPage from "./pages/SearchPage";
import CartPage from './pages/CartPage'; // Importar la CartPage
import { CartProvider } from './context/CartContext';
import EditBookPage from "./pages/EditBookPage";
import DeleteBookPage from "./pages/DeleteBookPage"; // Importar el CartProvider

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
        <Route path="/admin/add" element={<AddBookPage />} />
            <Route path="/admin/edit" element={<EditBookPage />} />
            <Route path="/admin/delete" element={<DeleteBookPage />} />
      </Routes>
    </Router>
  </CartProvider>
  );
};

export default App;
