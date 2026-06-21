import { useEffect, useMemo, useState } from "react";
import CartContext from "./CartContext.js";

const CART_STORAGE_KEY = "modoHuerta_cart";

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];

      return Array.isArray(parsedCart) ? parsedCart : [];
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
    const parsed = Number(quantity);

    if (Number.isNaN(parsed) || parsed <= 0) {
      return salesUnit === "Kg" ? 0.25 : 1;
    }

    if (salesUnit === "Kg") {
      // redondear a múltiplos de 0.25
      const normalized = Math.round(parsed / 0.25) * 0.25;
      return Number(normalized.toFixed(2));
    }

    // productos por unidad
    return Math.max(1, Math.round(parsed));
  };

  const buildCartItem = (product) => {
    const quantity = normalizeQuantity(product.quantity, product.sales_unit);
    const salesPrice = Number(product.sales_price) || 0;

    return {
      productId: product.productId || product._id || product.id,
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
      const safeCart = Array.isArray(prevCart) ? prevCart : [];

      const existingProduct = safeCart.find(
        (item) => item.productId === itemToAdd.productId,
      );

      if (existingProduct) {
        return safeCart.map((item) => {
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

  const increaseQuantity = (productId) => {
    setCart((prevCart) => {
      const safeCart = Array.isArray(prevCart) ? prevCart : [];

      return safeCart.map((item) => {
        if (item.productId !== productId) return item;

        const step = item.sales_unit === "Kg" ? 0.25 : 1;
        const newQuantity = normalizeQuantity(
          item.quantity + step,
          item.sales_unit,
        );

        return {
          ...item,
          quantity: newQuantity,
          subtotal: Number((newQuantity * item.sales_price).toFixed(2)),
        };
      });
    });
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      const safeCart = Array.isArray(prevCart) ? prevCart : [];

      return safeCart
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

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const safeCart = Array.isArray(prevCart) ? prevCart : [];

      return safeCart.filter((item) => item.productId !== productId);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = useMemo(() => {
    const safeCart = Array.isArray(cart) ? cart : [];
    return Number(
      safeCart.reduce((acc, item) => acc + item.subtotal, 0).toFixed(2),
    );
  }, [cart]);

  const cartCount = useMemo(() => {
    const safeCart = Array.isArray(cart) ? cart : [];
    return safeCart.length;
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
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
