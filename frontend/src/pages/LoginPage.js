// frontend/src/pages/LoginPage.js

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './LoginPage.css';

const LoginPage = () => {
  const { loginUser } = useContext(UserContext); // Función para establecer el usuario actual en el contexto
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

   // Intentar iniciar sesión
    const success = await loginUser(email, password);
    if (success) {
      navigate('/'); // Redirige a la página principal si el inicio de sesión es exitoso
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 className="login-title">Bienvenido de vuelta</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
        <p className="login-text">
          ¿Olvidaste tu contraseña?
          <span className="login-link" onClick={() => navigate('/recover-password')}> Haz clic aquí</span>
        </p>
        <p className="login-text">
          ¿Aún no eres usuario?
        </p>
        <button className="register-button" onClick={() => navigate('/register')}>Regístrate aquí</button>
      </div>
    </div>
  );
};

export default LoginPage;
