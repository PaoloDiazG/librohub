import React from 'react';
import './CategoryRow.css';
import BookCard from './BookCard';

const CategoryRow = ({ categoria, books }) => {
  return (
    <div className="category-row">
      <h2 className="category-title">{categoria}</h2>
      <div className="category-books">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default CategoryRow;

