import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';

const CartPage = () => {
  const { cart, setCart } = useContext(CartContext);
  const { currentUser } = useContext(UserContext);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    const totalSum = cart.reduce((sum, book) => sum + parseFloat(book.precio), 0);
    setTotal(totalSum);
  }, [cart]);

  const handleCheckout = async () => {
    if (!currentUser) {
      alert('Debes iniciar sesión para realizar una compra.');
      navigate('/login');
      return;
    }

    if (cart.length === 0) {
      alert('El carrito está vacío, agrega libros para continuar.');
      return;
    }

    // Datos para la transacción
    const transactionData = {
      userId: currentUser.id, // Id del usuario (debe estar en el contexto del usuario)
      dni: currentUser.dni,
      nombre: `${currentUser.firstName} ${currentUser.lastName}`,
      librosComprados: cart.map((book) => book.nombre),
      precioTotal: total,
    };

    try {
      const response = await fetch('http://localhost:5000/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });

      if (response.ok) {
        alert('¡Compra realizada exitosamente!');
        setCart([]); // Vaciar el carrito después de la compra
        navigate('/'); // Redirigir a la página principal
      } else {
        alert('Error al registrar la compra.');
      }
    } catch (error) {
      console.error('Error al registrar la compra:', error);
      alert('Error al conectar con el servidor.');
    }
  };

  return (
    <div className="cart-page">
      <h1 className="cart-title">Tu Carrito</h1>
      <button className="clear-cart-button" onClick={() => setCart([])}>Vaciar Carrito</button>

      <div className="cart-items">
        {cart.length > 0 ? (
          cart.map((book, index) => (
            <div key={index} className="cart-item">
              <div className="cart-item-details">
                <h3 className="cart-item-title">{book.nombre}</h3>
                <p className="cart-item-price">Precio: ${book.precio}</p>
              </div>
              <button
                className="remove-item-button"
                onClick={() => {
                  const updatedCart = [...cart];
                  updatedCart.splice(index, 1);
                  setCart(updatedCart);
                }}
              >
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
