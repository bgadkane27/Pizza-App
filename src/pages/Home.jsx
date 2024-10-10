import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const pageVariants = {
  initial: { opacity: 0, x: -100 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 100 },
};

const pageTransition = { duration: 0.5 };

function Home() {
  return (
    <main className="main-section">
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <h1 className="hero-heahing">Welcome to PizzaCut</h1>
        <p className="para">What would you like to have?</p>
        <Link to="/order">
        <button className="main-btn">Start Order</button></Link>
      </motion.div>
    </main>
  );
}

export default Home;
