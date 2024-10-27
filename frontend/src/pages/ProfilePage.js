import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './ProfilePage.css';

const ProfilePage = () => {
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    lastName: '',
    firstName: '',
    gender: '',
    birthDate: ''
  });

  // Función para formatear la fecha al formato YYYY-MM-DD para el input de fecha
  const formatDateForInput = (isoDate) => {
    if (!isoDate) return '';
    return new Date(isoDate).toISOString().split('T')[0];
  };

  // Cargar los datos del usuario al hacer clic en "Editar Datos"
  const loadUserData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/${currentUser.id}`);
      if (response.ok) {
        const userData = await response.json();

        setForm({
          lastName: userData.last_name,
          firstName: userData.first_name,
          gender: userData.gender,
          birthDate: formatDateForInput(userData.birth_date)
        });

        setIsEditing(true); // Activar el modo de edición
      } else {
        alert('Error al cargar los datos del usuario.');
      }
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
      alert('Error al conectar con el servidor');
    }
  };

  // Guardar los cambios y actualizar los datos en la base de datos
  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/${currentUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lastName: form.last_name,
          firstName: form.first_name,
          gender: form.gender,
          birthDate: form.birth_date
        }),
        mode: 'cors'
      });

      if (response.ok) {
        // Actualizar el usuario actual en el contexto
        setCurrentUser({
          ...currentUser,
          last_name: form.last_name,
          first_name: form.first_name,
          gender: form.gender,
          birth_date: form.birth_date
        });
        setIsEditing(false); // Salir del modo de edición
        alert('Datos actualizados correctamente!');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Error al actualizar los datos del usuario.');
      }
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
      alert('Error al conectar con el servidor');
    }
  };

  // Manejar los cambios en el formulario
  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Cancelar la edición y restaurar el perfil original
  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <h2 className="profile-title">MI CUENTA</h2>

        {isEditing ? (
          <form className="profile-form">
            <div className="profile-field">
              <label>Apellidos:</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="profile-input"
              />
            </div>
            <div className="profile-field">
              <label>Nombres:</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="profile-input"
              />
            </div>
            <div className="profile-field">
              <label>Sexo:</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="profile-input"
              >
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div className="profile-field">
              <label>Fecha de Nacimiento:</label>
              <input
                type="date"
                name="birthDate"
                value={form.birthDate}
                onChange={handleChange}
                className="profile-input"
              />
            </div>

            <div className="profile-buttons">
              <button type="button" className="save-button" onClick={handleSave}>
                Guardar Datos
              </button>
              <button type="button" className="cancel-button" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-summary">
            <p><strong>DNI:</strong> {currentUser.dni}</p>
            <p><strong>Correo:</strong> {currentUser.email}</p>
            <p><strong>Apellidos:</strong> {currentUser.last_name}</p>
            <p><strong>Nombres:</strong> {currentUser.first_name}</p>
            <p><strong>Sexo:</strong> {currentUser.gender}</p>
            <p><strong>Fecha de Nacimiento:</strong> {formatDateForInput(currentUser.birth_date)}</p>
          </div>
        )}

        <button className="back-button" onClick={() => navigate('/')}>
          Volver a la Página Principal
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
