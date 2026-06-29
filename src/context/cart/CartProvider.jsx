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
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadCart() {
    try {
      setLoading(true);

      const data = await getCart();

      setCart(data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    }
  }, [isAuthenticated]);

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
    const item = cart.find((prod) => prod.productId === productId);

    if (!item) return;

    const step = item.sales_unit === "Kg" ? 0.25 : 1;

    const raw = item.quantity + step;
    const quantity = normalizeQuantity(raw, item.sales_unit);

    const data = await updateProductQuantity(productId, quantity);

    console.log("TO BACKEND:", quantity);
    console.log("FROM BACKEND:", data.products);

    setCart(data.products);
  };

  const decreaseQuantity = async (productId) => {
    const item = cart.find((prod) => prod.productId === productId);

    if (!item) return;

    const step = item.sales_unit === "Kg" ? 0.25 : 1;

    const raw = item.quantity - step;

    if (raw <= 0) {
      const data = await removeProduct(productId);
      setCart(data.products);
      return;
    }

    const quantity = normalizeQuantity(raw, item.sales_unit);

    const data = await updateProductQuantity(productId, quantity);

    console.log("TO BACKEND:", quantity);
    console.log("FROM BACKEND:", data.products);

    setCart(data.products);
  };

  const removeFromCart = async (productId) => {
    const data = await removeProduct(productId);
    setCart(data.products);
  };

  const emptyCart = async () => {
    await clearCart();

    setCart([]);
  };

  const cartTotal = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.quantity * item.sales_price,
      0,
    );
  }, [cart]);

  const cartCount = useMemo(
    () =>
      // const safeCart = Array.isArray(cart) ? cart : [];
      cart.length,
    [cart],
  );

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
