import React from "react";
import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";

const pageVariants = {
  initial: { opacity: 0, x: -100 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 100 },
};

const pageTransition = { duration: 0.5, ease: "easeIn" };

function Thanks() {

  const location = useLocation();
  const { selectedPizzaNames } = location.state || { selectedPizzaNames: [] };

  return (
    <section className="thanks-section">
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <h1 className="para">Thank you for your order!</h1>

        {selectedPizzaNames.length > 0 && (
          <p className="subtitle">
            You have ordered: {selectedPizzaNames.join(", ")}.
          </p>
        )}

        <p className="title">Your order will be ready in next 15-20 minutes.</p>

        <div className="back-btn">
          <NavLink to="/order">
            <button>New Order</button>
          </NavLink>
          <NavLink to="/">
            <button>Home</button>
          </NavLink>
        </div>
      </motion.div>
    </section>
  );
}

export default Thanks;
