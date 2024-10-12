import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import pizzainfo from "../api/pizzadata.json"

const pageVariants = {
  initial: { opacity: 0, x: -100 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 100 },
};

const pageTransition = { duration: 0.5 };

function Order() {
  const [selectedPizzas, setSelectedPizzas] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handlePizzaSelect = (id) => {
    setErrorMessage("");


    setSelectedPizzas((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((pizzaId) => pizzaId !== id)
        : [...prevSelected, id]
    );
  };

  const handleCompleteOrder = () => {
    if (selectedPizzas.length === 0) {
      setErrorMessage("Please select at least one pizza to place your order.");
    } else {

      const selectedPizzaNames = pizzainfo
        .filter((pizza) => selectedPizzas.includes(pizza.id))
        .map((pizza) => pizza.name);

        navigate("/thanks", { state: { selectedPizzaNames } });
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
              const { id, name, price, image } = pizza;
              const isSelected = selectedPizzas.includes(id);
              return (
                <div className="pizza-card" key={id} onClick={() => handlePizzaSelect(id)}
                  style={{
                    borderColor: isSelected ? "#00ff00" : "#fff",
                    cursor: "pointer",
                  }}
                >
                  <div className="main-image">
                    <img src={image} alt="Pizza Image" />
                  </div>
                  <h2 className="title">{name}</h2>
                  <p className="pizza-info">
                    <span className="pizza-info">Price : </span>
                    {price}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button className="btn" onClick={handleCompleteOrder}>
          Place Order
        </button>

      </motion.div>
    </section>
  );
}

export default Order;