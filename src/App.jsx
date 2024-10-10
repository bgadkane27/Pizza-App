import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { AnimatePresence } from "framer-motion";

import { AppLayout } from "./Layout/Applayout";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Thanks from "./pages/Thanks";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="order" element={<Order />} />
          <Route path="thanks" element={<Thanks />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function AnimatedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AnimatedApp;
