import React, { createContext, useState } from 'react';
import UserLinkedList from '../structures/LinkedList';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userList] = useState(new UserLinkedList());
  const [currentUser, setCurrentUser] = useState(null);

  // Función para agregar un nuevo usuario
  const registerUser = (user) => {
    const { id, email, password, lastName, firstName, gender, birthDate } = user;
    userList.addUser(id, email, password, lastName, firstName, gender, birthDate);
    setCurrentUser(user); // Establecer el usuario registrado como actual
    alert('Usuario registrado exitosamente!');
  };

  // Función para verificar el inicio de sesión
  const loginUser = (email, password) => {
    const user = userList.verifyLogin(email, password);
    if (user) {
      setCurrentUser(user); // Establece el usuario actual
      alert(`¡Bienvenido, ${user.firstName} ${user.lastName}!`);
      return true;
    } else {
      alert('Correo o contraseña incorrectos.');
      return false;
    }
  };

  // Función para actualizar los datos del usuario actual
  const updateUser = (updatedUser) => {
    let current = userList.head;
    while (current) {
      if (current.id === updatedUser.id) {
        // Actualizar los datos en la lista enlazada
        current.lastName = updatedUser.lastName;
        current.firstName = updatedUser.firstName;
        current.gender = updatedUser.gender;
        current.birthDate = updatedUser.birthDate;
        break;
      }
      current = current.next;
    }
    // Actualizar el estado del usuario actual
    setCurrentUser({ ...updatedUser });
    alert('Datos actualizados correctamente!');
  };

  // Función para cerrar sesión
  const logoutUser = () => {
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ userList, registerUser, loginUser, currentUser, logoutUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
