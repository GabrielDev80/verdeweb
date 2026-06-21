import { useContext } from "react";
import CartContext from "../context/cart/CartContext.js";

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentrode CartProvider");
  }

  return context;
};
