// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Bienvenido a Librohub</div>} />
        <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/recover-password" element={<div>Recuperar Contraseña</div>} />
      </Routes>
    </Router>
  );
}

export default App;
