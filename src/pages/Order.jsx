import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const pageVariants = {
  initial: { opacity: 0, x: -100 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 100 },
};

const pageTransition = { duration: 0.5 };

function Order() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <h1>Select Your Pizza</h1>
      <button>Pepperoni</button>
      <button>Margherita</button>
      <button>BBQ Chicken</button>
      <Link to="/thanks">Complete Order</Link>
    </motion.div>
  );
}

export default Order;
