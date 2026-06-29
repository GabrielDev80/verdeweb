import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart.js";
import { Button } from "../components/ui/Button.jsx";
import {
  formatPrice,
  formatQuantityLabel,
} from "../utils/products/products.utils.js";

import "../styles/custom.scss";
import "../styles/cart.scss";

const Cart = () => {
  const {
    cart,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    emptyCart,
    loading,
  } = useCart();

  const handleWhatsAppOrder = () => {
    if (!cart.length) return;

    const phone = "5491130462293";

    const lines = cart.map((item) => {
      return `• ${item.name} - ${formatQuantityLabel(item.quantity, item.sales_unit)} - ${formatPrice(item.subtotal)}`;
    });

    const message = [
      "Hola! quiero hacer un pedido:",
      "",
      ...lines,
      "",
      `Total: ${formatPrice(cartTotal)}`,
    ].join("\n");

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <Helmet>
        <title>Modo Huerta Online - Carrito</title>
      </Helmet>
      {loading ? (
        <section className="container-lg">
          <div className="cart empty-cart">
            <h1>Cargando carrito...</h1>
          </div>
        </section>
      ) : !cart.length ? (
        <section className="container-lg">
          <div className="cart empty-cart">
            <h1> Tu carrito está vacío</h1>
            <p>
              agrega frutas, verduras y otros productos para comenzar tu pedido.
            </p>

            <Link to="/products">
              <Button
                className="btn btn-success btn-pill"
                text="Ver productos"
              />
            </Link>
          </div>
        </section>
      ) : (
        <section className="container-lg">
          <div className="cart">
            <div className="cart-header">
              <h1 className="header-title">Mi carrito</h1>

              <Button
                type="button"
                className="btn btn-danger btn-pill"
                onClick={emptyCart}
                text="Vaciar carrito"
              />
            </div>

            <div className="cart-layout">
              <div className="cart-items">
                {cart.map((item) => (
                  <article className="cart-item" key={item.productId}>
                    <div className="image-wrapper">
                      <img src={item.image} alt={item.name} className="image" />
                    </div>

                    <div className="info-item">
                      <h2 className="item-name">{item.name}</h2>
                      {item.description && (
                        <p className="item-description">{item.description}</p>
                      )}
                      <span className="unit">Por {item.sales_unit}</span>
                    </div>

                    <div className="quantity-wrapper">
                      <div className="item-qty-box">
                        <button
                          className="item-qty-btn"
                          type="button"
                          onClick={() => decreaseQuantity(item.productId)}
                          aria-label={`Restar cantidad de ${item.name}`}
                        >
                          -
                        </button>

                        <input
                          className="item-qty"
                          name="item-qty"
                          type="text"
                          value={formatQuantityLabel(
                            item.quantity,
                            item.sales_unit,
                          )}
                          readOnly
                        />

                        <button
                          className="item-qty-btn"
                          type="button"
                          onClick={() => increaseQuantity(item.productId)}
                          aria-label={`Sumar cantidad de ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="prices-item">
                      <p className="unit-price">
                        Unitario: {formatPrice(item.sales_price)}
                      </p>
                      <p className="subtotal">
                        Subtotal: {formatPrice(item.subtotal)}
                      </p>
                      <Button
                        className="btn btn-danger btn-pill"
                        type="button"
                        onClick={() => removeFromCart(item.productId)}
                        text="Eliminar"
                      />
                    </div>
                  </article>
                ))}
              </div>
              <aside className="cart-summary">
                <h2>Resumen del pedido</h2>
                <div className="summary-row">
                  <span>Total</span>
                  <strong>{formatPrice(cartTotal)}</strong>
                </div>

                <Button
                  className="btn btn-success btn-pill upper"
                  onClick={handleWhatsAppOrder}
                  text="Finalizar pedido por WhatsApp"
                />

                <Link to="/products" className="continue-shopping">
                  Seguir comprando
                </Link>
              </aside>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default Cart;
