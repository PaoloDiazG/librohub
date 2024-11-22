import React, { useState } from 'react';
import './AdminPage.css';

const DeleteBookPage = () => {
  const [bookId, setBookId] = useState('');

  // Eliminar el libro de la base de datos
  const handleDelete = () => {
    fetch(`http://localhost:5000/books/${bookId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          alert('Libro eliminado exitosamente');
          setBookId('');
        } else {
          alert('Error al eliminar el libro');
        }
      })
      .catch((error) => console.error('Error al eliminar el libro:', error));
  };

  return (
    <div className="admin-page">
      <h2>Eliminar Libro</h2>
      <input
        type="text"
        placeholder="Ingrese el ID del libro"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
      />
        <button type="submit" className="admin-button" onClick={handleDelete}>Eliminar Libro</button>
    </div>
);
};

export default DeleteBookPage;
