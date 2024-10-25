// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage'; // Importar la página de inicio de sesión
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Bienvenido a Librohub</div>} />
        <Route path="/login" element={<LoginPage />} />
        {/* Rutas futuras para registro y recuperación */}
        <Route path="/register" element={<div>Registro</div>} />
        <Route path="/recover-password" element={<div>Recuperar Contraseña</div>} />
      </Routes>
    </Router>
  );
}

export default App;
