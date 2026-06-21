import { useEffect, useMemo, useState } from "react";
import CartContext from "./CartContext.js";

const CART_STORAGE_KEY = "modoHuerta_cart";

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);

      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error al traer el carrito desde localStorage: ", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Error al guardar el carrito en localStorage: ", error);
    }
  }, [cart]);

  const normalizeQuantity = (quantity, salesUnit) => {
    if (salesUnit === "Kg") {
      const parsed = Number(quantity);
      if (Number.isNaN(parsed) || parsed < 1) return 1;
      return Math.floor(parsed);
    }
  };

  const buildCartItem = (product) => {
    const quantity = normalizeQuantity(product.quantity, product.sales_unit);
    const salesPrice = Number(product.sales_price) || 0;

    return {
      productId: product.productId || product._id,
      name: product.name,
      description: product.description,
      image: product.image,
      sales_price: salesPrice,
      sales_unit: product.sales_unit,
      quantity,
      subtotal: Number((quantity * salesPrice).toFixed(2)),
    };
  };

  const addToCart = (product) => {
    const itemToAdd = buildCartItem(product);

    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.productId === itemToAdd.productId,
      );

      if (existingProduct) {
        return prevCart.map((item) => {
          if (item.productId !== itemToAdd.productId) return item;

          const newQuantity = normalizeQuantity(
            item.quantity + itemToAdd.quantity,
            item.sales_unit,
          );

          return {
            ...item,
            quantity: newQuantity,
            subtotal: Number((newQuantity * item.sales_price).toFixed(2)),
          };
        });
      }

      return [...prevCart, itemToAdd];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.productId !== productId),
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      prevCart
        .map((item) => {
          if (item.productId !== productId) return item;

          const step = item.sales_unit === "Kg" ? 0.25 : 1;
          const min = step;
          const newQuantity = Number((item.quantity - step).toFixed(2));

          if (newQuantity < min) return null;

          return {
            ...item,
            quantity: newQuantity,
            subtotal: Number((newQuantity * item.sales_price).toFixed(2)),
          };
        })
        .filter(Boolean);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = useMemo(() => {
    return Number(
      cart.reduce((acc, item) => acc + item.subtotal, 0).toFixed(2),
    );
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
