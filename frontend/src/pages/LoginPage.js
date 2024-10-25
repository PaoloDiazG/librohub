// frontend/src/pages/LoginPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    navigate('/recover-password');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 className="login-title">¡BIENVENIDO DE VUELTA!</h2>
        <form className="login-form">
          <input type="email" placeholder="Correo" className="login-input" required />
          <input type="password" placeholder="Contraseña" className="login-input" required />
          <button type="submit" className="login-button">Ingresar</button>
        </form>
        <p className="login-text">
          ¿Olvidaste tu contraseña?
          <span className="login-link" onClick={handleForgotPassword}> Haz clic aquí</span>
        </p>
        <p className="login-text">
          ¿Aún no eres usuario?
        </p>
        <button className="register-button" onClick={handleRegister}>Regístrate aquí</button>
      </div>
    </div>
  );
};

export default LoginPage;
