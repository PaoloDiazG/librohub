// frontend/src/pages/ProfilePage.js
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './ProfilePage.css';

const ProfilePage = () => {
  const { currentUser, updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ ...currentUser });


  //Converitr la fecha
  const formatDate = (isoDate) => {
    if(!isoDate) return '';
    return new Date(isoDate).toISOString().split('T')[0];
  }
   // Cargar los datos del usuario al montar el componente
  useEffect(() => {
    setForm({ ...currentUser });
  }, [currentUser]);

  // Manejar los cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Guardar los cambios y actualizar los datos en la base de datos
  const handleSave = async () => {
    try {
      await updateUser(form); // Actualiza los datos en el backend y el contexto
      setIsEditing(false); // Salir del modo de edición
      alert('Datos actualizados correctamente!');
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
      alert('Error al actualizar los datos');
    }
  };

  // Salir del modo de edición sin guardar cambios
  const handleCancel = () => {
    setForm({ ...currentUser }); // Restaurar los datos originales del usuario
    setIsEditing(false);
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <h2 className="profile-title">Mi Cuenta</h2>

        {isEditing ? (
          <form className="profile-form">
            <div className="profile-field">
              <label>DNI:</label>
              <input type="text" value={form.id} readOnly className="profile-input" />
            </div>
            <div className="profile-field">
              <label>Correo:</label>
              <input type="email" value={form.email} readOnly className="profile-input" />
            </div>
            <div className="profile-field">
              <label>Apellidos:</label>
              <input type="text" name="lastName" value={form.lastName} onChange={handleChange} className="profile-input" />
            </div>
            <div className="profile-field">
              <label>Nombres:</label>
              <input type="text" name="firstName" value={form.firstName} onChange={handleChange} className="profile-input" />
            </div>
            <div className="profile-field">
              <label>Sexo:</label>
              <select name="gender" value={form.gender} onChange={handleChange} className="profile-input">
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div className="profile-field">
              <label>Fecha de Nacimiento:</label>
              <input type="date" name="birthDate" value={form.birthDate} onChange={handleChange} className="profile-input" />
            </div>

            <div className="profile-buttons">
              <button type="button" className="save-button" onClick={handleSave}>
                Guardar Datos
              </button>
              <button type="button" className="cancel-button" onClick={handleCancel}>
                Regresar
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
            <p><strong>Fecha de Nacimiento:</strong> {formatDate(currentUser.birth_date)}</p>
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Editar Datos
            </button>
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
