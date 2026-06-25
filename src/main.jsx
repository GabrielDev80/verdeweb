import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import CartProvider from "./context/cart/CartProvider.jsx";

import "./styles/globals.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <App />

          <ToastContainer
            position="botton-right"
            autoClose={2000}
            hideProgressBar
            closeOnClick
            pauseOnHover
            draggable
            newestOnTop
            limit={3}
            theme="light"
          />
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
);
