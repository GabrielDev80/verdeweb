import { useEffect, useMemo, useState } from "react";
import CartContext from "./CartContext.js";
import {
  getCart,
  addProduct,
  updateProductQuantity,
  removeProduct,
  clearCart,
} from "../../services/cart.service.js";
import { useAuth } from "../../hooks/useAuth.js";
import { normalizeQuantity } from "../../utils/products/products.utils.js";

const CartProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCart = async () => {
    try {
      setLoading(true);

      const data = await getCart();

      setCart(data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.role === "customer") {
      loadCart();
    } else {
      setCart([]);
    }
  }, [isAuthenticated, user]);

  const addToCart = async (product, quantity) => {
    try {
      const normalizedQuantity = normalizeQuantity(
        Number(quantity),
        product.sales_unit,
      );

      const data = await addProduct(product.id, normalizedQuantity);

      setCart(data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const increaseQuantity = async (productId) => {
    try {
      const item = cart.find((prod) => prod.productId === productId);

      if (!item) return;

      const step = item.sales_unit === "kg" ? 0.25 : 1;

      const quantity = normalizeQuantity(item.quantity + step, item.sales_unit);

      const data = await updateProductQuantity(productId, quantity);

      setCart(data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const decreaseQuantity = async (productId) => {
    try {
      const item = cart.find((prod) => prod.productId === productId);

      if (!item) return;

      const step = item.sales_unit === "kg" ? 0.25 : 1;

      const newQuantity = item.quantity - step;

      if (newQuantity <= 0) {
        const data = await removeProduct(productId);
        setCart(data.products);
        return;
      }

      const quantity = normalizeQuantity(newQuantity, item.sales_unit);

      const data = await updateProductQuantity(productId, quantity);

      setCart(data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const data = await removeProduct(productId);

      setCart(data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const emptyCart = async () => {
    try {
      await clearCart();

      setCart([]);
    } catch (error) {
      console.error(error);
    }
  };

  const cartTotal = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.quantity * item.sales_price,
      0,
    );
  }, [cart]);

  const cartCount = useMemo(() => cart.length, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        emptyCart,
        cartTotal,
        cartCount,
        reloadCart: loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
