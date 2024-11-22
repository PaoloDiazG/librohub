import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './LoginPage.css';

const LoginPage = () => {
  const { loginUser, setCurrentUser } = useContext(UserContext); // Función para establecer el usuario actual en el contexto
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar credenciales del administrador
    if (email === 'p@p.com' && password === '123') {
      const adminUser = { email, isAdmin: true }; // Crear un objeto de usuario administrador
      setCurrentUser(adminUser); // Establecer el usuario administrador como usuario actual
      alert('¡Bienvenido, Admin!');
      navigate('/'); // Redirige a la página principal después del inicio de sesión
    } else if (loginUser(email, password)) {
      navigate('/'); // Redirige a la página principal si el inicio de sesión es exitoso
    } else {
      alert('Correo o contraseña incorrectos.');
    }
  };

return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 className="login-title">¡Bienvenido de vuelta!</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
          </div>
          <div className="login-field">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
          </div>
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
        <p className="login-text">
          ¿Aún no eres usuario?
          <span className="register-link" onClick={() => navigate('/register')}> Regístrate aquí</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;