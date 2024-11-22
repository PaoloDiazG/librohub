import React, { useEffect, useState } from 'react';
import './HomePage.css';
import CategoryRow from './CategoryRow';

const Homepage = () => {
  // Estado para almacenar los libros obtenidos del backend
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de errores

  // Función para obtener los libros del backend
  useEffect(() => {
    fetch('http://localhost:5000/books')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los libros del servidor');
        }
        return response.json();
      })
      .then((data) => {
        setBooks(data); // Guardar libros en el estado
        setLoading(false); // Desactivar estado de carga
      })
      .catch((error) => {
        setError(error.message); // Guardar el mensaje de error
        setLoading(false); // Desactivar estado de carga
      });
  }, []);

  // Definir las categorías
  const categorias = [
    'No Ficción',
    'Ficción',
    'Infantil',
    'Manga',
    'Románticas',
    'Suspenso',
    'Terror',
    'Policiales',
      'Deportes',
      'Tecnologias',
      'Adultos +18',
      'Mascotas'
  ];

  // Mostrar el estado de carga
  if (loading) {
    return <div className="homepage">Cargando libros...</div>;
  }

  // Mostrar un mensaje de error si ocurre un problema al cargar los libros
  if (error) {
    return <div className="homepage">Error: {error}</div>;
  }

  return (
    <div className="homepage">
      <h1 className="homepage-title">BIENVENIDO A LIBROHUB</h1>
      <p className="homepage-description">
        ¿Qué quieres leer hoy?
      </p>

      {/* Renderizar las filas de categorías */}
      {categorias.map((categoria) => {
        // Filtrar los libros por categoría actual
        const librosCategoria = books.filter((book) => book.categoria === categoria);

        // Renderizar la fila solo si hay libros en esa categoría
        return librosCategoria.length > 0 ? (
          <CategoryRow key={categoria} categoria={categoria} books={librosCategoria} />
        ) : null;
      })}
    </div>
  );
};

export default Homepage;

