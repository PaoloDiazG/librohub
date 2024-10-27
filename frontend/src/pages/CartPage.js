import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';
import { CartContext } from '../context/CartContext'; // Contexto del carrito

const CartPage = () => {
  const { cart, setCart } = useContext(CartContext); // Accede al contexto del carrito
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // Calcular el total de precios del carrito
  React.useEffect(() => {
    const totalSum = cart.reduce((sum, book) => sum + parseFloat(book.precio), 0);
    setTotal(totalSum);
  }, [cart]);

  // Vaciar el carrito
  const handleClearCart = () => {
    setCart([]); // Vaciar el estado del carrito
  };

  // Eliminar un libro individualmente del carrito
  const handleRemoveBook = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1); // Eliminar el libro en la posición indicada
    setCart(updatedCart);
  };

  // Simular el proceso de pago
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('El carrito está vacío, agrega libros para continuar.');
      return;
    }
    alert('¡Gracias por tu compra!');
    setCart([]); // Vaciar el carrito después de pagar
    navigate('/'); // Redirigir a la página principal
  };

  return (
    <div className="cart-page">
      <h1 className="cart-title">Tu Carrito</h1>
      <button className="clear-cart-button" onClick={handleClearCart}>Vaciar Carrito</button>

      <div className="cart-items">
        {cart.length > 0 ? (
          cart.map((book, index) => (
            <div key={index} className="cart-item">
              <div className="cart-item-details">
                <h3 className="cart-item-title">{book.nombre}</h3>
                <p className="cart-item-price">Precio: ${book.precio}</p>
              </div>
              <button className="remove-item-button" onClick={() => handleRemoveBook(index)}>
                Eliminar
              </button>
            </div>
          ))
        ) : (
          <p className="empty-cart-message">El carrito está vacío.</p>
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-summary">
          <p className="total-amount">Total: ${total.toFixed(2)}</p>
          <button className="checkout-button" onClick={handleCheckout}>Pagar</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
