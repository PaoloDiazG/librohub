import React, { createContext, useState } from 'react';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Estado para el usuario actual

  // Función para registrar un nuevo usuario
  const registerUser = async (user) => {
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      const data = await response.json();

      if (response.ok) {
        setCurrentUser(data.user); // Establece el usuario actual tras el registro
        alert('Usuario registrado exitosamente!');
      } else {
        alert(data.error); // Muestra el mensaje de error
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      alert('Error al conectar con el servidor');
    }
  };

  // Función para iniciar sesión
  const loginUser = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setCurrentUser(data.user); // Establece el usuario actual tras iniciar sesión
        alert(`¡Bienvenido, ${data.user.first_name} ${data.user.last_name}!`);
        return true;
      } else {
        alert(data.error); // Muestra el mensaje de error
        return false;
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al conectar con el servidor');
      return false;
    }
  };

  // Función para actualizar los datos del usuario actual
  const updateUser = async (updatedUser) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
      });

      if (response.ok) {
        setCurrentUser(updatedUser); // Actualiza el estado del usuario actual
        alert('Datos actualizados correctamente!');
      } else {
        const errorData = await response.json();
        alert(errorData.error); // Muestra el mensaje de error
      }
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      alert('Error al conectar con el servidor');
    }
  };

  // Función para cerrar sesión
  const logoutUser = () => {
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ currentUser, registerUser, loginUser, updateUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
