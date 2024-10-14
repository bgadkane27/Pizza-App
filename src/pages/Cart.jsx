import React, { useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";
import { motion } from "framer-motion";
import { RiDeleteBinFill } from "react-icons/ri";


const pageVariants = {
  initial: { opacity: 0, x: -100 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 100 },
};

const pageTransition = { duration: 0.5 };

function Cart() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState(location.state?.cart || []);
  const [errorMessage, setErrorMessage] = useState("");

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

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    if (updatedCart.length === 0) {
      setErrorMessage(<span style={{ fontSize: '1.4rem', color: '#fff' }}>
        No item present in the cart.
      </span>);
    }
  };

  const removeAllItems = () => {
    setCart([]);
    setErrorMessage(<span style={{ fontSize: '1.4rem', color: '#fff' }}>
      No item present in the cart.
    </span>);
  };

  const handleRedirectToOrders = () => {
    navigate("/order"); 
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const gst = (subtotal * 0.05).toFixed(2);

  const total = (subtotal + parseFloat(gst)).toFixed(2);

  return (
    <section className="cart-section container">
      <motion.div 
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      >
        <div className="cart-left">
          <h2 className="cart-head">View Cart</h2>
          {cart.length === 0 ? (
            <div className="start">
            <p>{errorMessage}</p>
            <button className="cart-btn" onClick={handleRedirectToOrders}>
              Start Order
            </button>
          </div>
          ) : (
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <p className="name-cart">{item.name}</p>
                    <div className="cart-item-controls">
                      <button
                        onClick={() => updateQuantity(item.id, "decrease")}
                      >
                        <FaMinus style={{color: "#df4a1c"}} />
                      </button>
                      <span className="item-quantity">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, "increase")}
                      >
                        <FaPlus style={{color: "#df4a1c"}}/>
                      </button>
                    </div>
                    <p className="cart-item-price">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      className="remove-item name-cart" 
                      onClick={() => removeItem(item.id)}
                    >
                      <RiDeleteBinFill style={{marginRight: ".5rem", fontSize: "2rem", paddingTop: ".2rem"}} />
                      {/* Remove */}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {cart.length > 0 && (
            <button className="cart-btn" onClick={removeAllItems}>
             <RiDeleteBinFill style={{marginRight: ".5rem"}} /> Remove All 
            </button>
          )}
        </div>
        </motion.div>

        <motion.div className="cart-right"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
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
          <button className="checkout-btn">Checkout ₹{total}</button>
        </motion.div>
    </section>
  );
}

export default Cart;
