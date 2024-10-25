// frontend/src/pages/RegisterPage.js

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './RegisterPage.css';

const RegisterPage = () => {
  const { registerUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    dni: '',
    email: '',
    password: '',
    lastName: '',
    firstName: '',
    gender: '',
    birthDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(form.email)) {
      alert('Por favor, ingresa un correo válido.');
      return;
    }
    if (!form.dni || !form.email || !form.password || !form.lastName || !form.firstName || !form.gender || !form.birthDate) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    registerUser(form); // Registrar el usuario y establecerlo como actual
    navigate('/'); // Redirige a la página principal después del registro
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <h2 className="register-title">Registro de Usuario</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          {/* Campos del formulario */}
          <input type="text" name="dni" placeholder="DNI" value={form.dni} onChange={handleChange} className="register-input" required />
          <input type="email" name="email" placeholder="Correo" value={form.email} onChange={handleChange} className="register-input" required />
          <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} className="register-input" required />
          <input type="text" name="lastName" placeholder="Apellidos" value={form.lastName} onChange={handleChange} className="register-input" required />
          <input type="text" name="firstName" placeholder="Nombres" value={form.firstName} onChange={handleChange} className="register-input" required />
          <select name="gender" value={form.gender} onChange={handleChange} className="register-input" required>
            <option value="">Selecciona tu sexo</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>
          <input type="date" name="birthDate" value={form.birthDate} onChange={handleChange} className="register-input" required />
          <button type="submit" className="register-button">Registrarse</button>
        </form>
        <p className="login-text">
          ¿Ya tienes una cuenta?
          <span className="login-link" onClick={() => navigate('/login')}> Inicia sesión aquí</span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
