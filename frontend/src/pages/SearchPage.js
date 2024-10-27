import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchPage.css';
import BookCard from './BookCard';

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(new URLSearchParams(location.search).get('q') || '');
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Obtener libros de la base de datos según la búsqueda
  useEffect(() => {
    if (searchQuery) {
      fetch(`http://localhost:5000/books?search=${searchQuery}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error al obtener los libros del servidor');
          }
          return response.json();
        })
        .then((data) => {
          setBooks(data);
          setFilteredBooks(data);
        })
        .catch((error) => console.error('Error al obtener los libros:', error));
    }
  }, [searchQuery]);

  // Filtrar libros por nombre
  const handleFilter = (e) => {
    const filterQuery = e.target.value.toLowerCase();
    const filtered = books.filter((book) =>
      book.nombre.toLowerCase().includes(filterQuery)
    );
    setFilteredBooks(filtered);
  };

  return (
    <div className="search-page">
      <h1 className="search-title">Resultados de la búsqueda</h1>

      {/* Filtro en los resultados */}
      <input
        type="text"
        placeholder="Filtrar resultados..."
        onChange={handleFilter}
        className="filter-input"
      />

      {/* Resultados de la búsqueda */}
      <div className="search-results">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => <BookCard key={book.id} book={book} />)
        ) : (
          <p>No se encontraron resultados para "{searchQuery}".</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;


