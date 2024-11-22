import React, { useState } from 'react';
import './AdminPage.css';

const EditBookPage = () => {
  const [bookId, setBookId] = useState('');
  const [form, setForm] = useState({
    nombre: '',
    autor: '',
    categoria: '',
    anio: '',
    precio: ''
  });
  const [bookLoaded, setBookLoaded] = useState(false);

  // Cargar los datos del libro por ID
  const loadBook = () => {
    fetch(`http://localhost:5000/books/${bookId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setForm({
            nombre: data.nombre,
            autor: data.autor,
            categoria: data.categoria,
            anio: data.anio,
            precio: data.precio
          });
          setBookLoaded(true);
        } else {
          alert('Libro no encontrado');
        }
      })
      .catch((error) => console.error('Error al cargar el libro:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Actualizar el libro en la base de datos
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/books/${bookId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Libro actualizado exitosamente');
        setBookLoaded(false);
        setBookId('');
      })
      .catch((error) => console.error('Error al actualizar el libro:', error));
  };

  return (
    <div className="admin-page">
      <h2>Modificar Libro</h2>

      {/* Buscar libro por ID */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Ingrese el ID del libro"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
        />
        <button type="submit" className="admin-button" onClick={loadBook}>Cargar Libro</button>
      </div>

      {bookLoaded && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
          <input type="text" name="autor" placeholder="Autor" value={form.autor} onChange={handleChange} required />
          <input type="text" name="categoria" placeholder="Categoría" value={form.categoria} onChange={handleChange} required />
          <input type="text" name="año" placeholder="Año" value={form.anio} onChange={handleChange} required />
          <input type="text" name="precio" placeholder="Precio" value={form.precio} onChange={handleChange} required />
            <button type="submit" className="admin-button">Guardar Cambios</button>
        </form>
      )}
    </div>
  );
};

export default EditBookPage;
