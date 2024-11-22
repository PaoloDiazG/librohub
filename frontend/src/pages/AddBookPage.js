import React, { useState } from 'react';
import './AdminPage.css';

const AddBookPage = () => {
  const [form, setForm] = useState({
    nombre: '',
    autor: '',
    categoria: '',
    anio: '',
    precio: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
          setForm({ nombre: '', autor: '', categoria: '', anio: '', precio: '' });
        } else if (data.error) {
          alert(data.error);
        }
      })
      .catch((error) => console.error('Error al agregar el libro:', error));
  };

  return (
    <div className="admin-page">
      <h2>Agregar Libro</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required/>
        <input type="text" name="autor" placeholder="Autor" value={form.autor} onChange={handleChange} required/>
        <input type="text" name="categoria" placeholder="Categoría" value={form.categoria} onChange={handleChange} required/>
        <input type="text" name="anio" placeholder="Año" value={form.anio} onChange={handleChange} required/>
        <input type="text" name="precio" placeholder="Precio" value={form.precio} onChange={handleChange} required/>
        <button type="submit" className="admin-button">Agregar Libro</button>
      </form>
    </div>
  );
};

export default AddBookPage;

