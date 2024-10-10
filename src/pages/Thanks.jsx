import React from "react";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, x: -100 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 100 },
};

const pageTransition = { duration: 0.5, ease: "easeIn" };

function Thanks() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <h1>Thank you for your order!</h1>
    </motion.div>
  );
}

export default Thanks;
