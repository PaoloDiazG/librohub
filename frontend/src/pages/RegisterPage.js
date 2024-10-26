// frontend/src/pages/RegisterPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        alert('Usuario registrado con éxito');
        navigate('/'); // Redirige a la página principal después del registro
      } else {
        alert(data.error); // Muestra el mensaje de error si ocurre
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      alert('Error al conectar con el servidor');
    }
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
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
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
