import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";

function Cart() {
  const location = useLocation();
  const [cart, setCart] = useState(location.state?.cart || []); // Cart items from state
  const [errorMessage, setErrorMessage] = useState(""); // Error message if no items in the cart

  // Function to update the quantity of an item in the cart
  const updateQuantity = (id, action) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        if (action === "increase") {
          return { ...item, quantity: item.quantity + 1 };
        }
        if (action === "decrease" && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    });

    setCart(updatedCart);
  };

  // Function to remove an item from the cart
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    if (updatedCart.length === 0) {
      setErrorMessage("No items in the cart.");
    }
  };

  // Function to remove all items from the cart
  const removeAllItems = () => {
    setCart([]);
    setErrorMessage("No items in the cart.");
  };

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // GST calculation (5%)
  const gst = (subtotal * 0.05).toFixed(2);

  // Total amount (subtotal + GST)
  const total = (subtotal + parseFloat(gst)).toFixed(2);

  return (
    <section className="cart-container">
      <div className="cart-left">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>{errorMessage}</p>
        ) : (
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <div className="cart-item-controls">
                    <button onClick={() => updateQuantity(item.id, "decrease")}>
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, "increase")}>
                      <FaPlus />
                    </button>
                  </div>
                  <p className="cart-item-price">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button className="remove-item" onClick={() => removeItem(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {cart.length > 0 && (
          <button className="remove-all" onClick={removeAllItems}>
            Remove All
          </button>
        )}
      </div>

      <div className="cart-right">
        <h2>Order Summary</h2>
        <div className="summary-item">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span>GST (5%)</span>
          <span>₹{gst}</span>
        </div>
        <div className="summary-item total">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
        <button className="checkout-btn">
          Checkout ₹{total}
        </button>
      </div>
    </section>
  );
}

export default Cart;
