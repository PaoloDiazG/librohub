import React, { useContext } from 'react';
import './BookCard.css';
import { CartContext } from '../context/CartContext'; // Importar el contexto del carrito

const BookCard = ({ book }) => {
  const { cart, setCart } = useContext(CartContext); // Accede al estado del carrito

  // Función para manejar el clic en "Agregar al carrito"
  const handleAddToCart = () => {
    // Agregar el libro al carrito actual
    setCart([...cart, book]);
    alert(`"${book.nombre}" ha sido agregado al carrito.`);
  };

  return (
    <div className="book-card">
      <h3 className="book-title">{book.nombre}</h3>
      <p className="book-author">Autor: {book.autor}</p>
      <p className="book-price">Precio: ${book.precio}</p>
      <button className="add-to-cart-button" onClick={handleAddToCart}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default BookCard;
