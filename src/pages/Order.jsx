import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import pizzainfo from "../api/pizzadata.json";
import { FaSquareCaretUp, FaWhiskeyGlass } from "react-icons/fa6";

const pageVariants = {
  initial: { opacity: 0, x: -100 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 100 },
};

const pageTransition = { duration: 0.5 };

function Order() {
  const [cart, setCart] = useState([]); // Track items in the cart
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Function to add pizza to the cart
  const addToCart = (pizza) => {
    setErrorMessage(""); // Clear any error messages
    const existingItem = cart.find((item) => item.id === pizza.id);

    if (existingItem) {
      // If the pizza is already in the cart, increase its quantity
      setCart(
        cart.map((item) =>
          item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      // If the pizza is not in the cart, add it with a quantity of 1
      setCart([...cart, { ...pizza, quantity: 1 }]);
    }
  };

  // Function to view the cart
  const viewCart = () => {
    if (cart.length === 0) {
      setErrorMessage("No item added to the cart.");
    } else {
      navigate("/cart", { state: { cart } }); // Pass the cart state when navigating
    }
  };

  return (
    <section className="order-section grid">
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <h2 className="para">Select Your Pizza</h2>
        <div className="container">
          <div className="grid grid-four--cols">
            {pizzainfo.map((pizza) => {
              const { id, name, price, image, category } = pizza;
              const cartItem = cart.find((item) => item.id === id); // Check if pizza is in the cart

              return (
                <div className="pizza-card" key={id}>
                  <div className="main-image">
                    <img src={image} alt="Pizza Image" />
                  </div>
                  <h2 className="title">{name}</h2>
                  <div className="pizza-category">
                    <p className="pizza-info">
                      <FaSquareCaretUp
                        style={{
                          color: category === "Non Veg" ? "#ff0000" : "#00ff00",
                          marginRight: ".8rem",
                          fontSize: "1.5rem",
                        }}
                      />
                      {category}
                    </p>
                  </div>
                  <p className="pizza-info">
                    <span className="pizza-info">Price: </span>
                    {price}
                  </p>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  <div className="cart-bttn">
                    <button className="cart-btn" onClick={() => addToCart(pizza)}>
                      {cartItem ? `Quantity: ${cartItem.quantity}` : "Add to Cart"}
                      <FaWhiskeyGlass style={{ marginLeft: ".8rem" }} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {errorMessage && <p className="error">{errorMessage}</p>}

        <button className="btn main-btn" onClick={viewCart}>
          Visit Cart
        </button>
      </motion.div>
    </section>
  );
}

export default Order;
