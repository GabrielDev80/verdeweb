import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "../components/ui/Button.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";
import { buildCheckoutDTO } from "../utils/checkout/checkout.utils.js";
import { createOrder } from "../services/checkout.service.js";
import { useCart } from "../hooks/useCart.js";
import { showSuccess, showError } from "../utils/notifications/toast.js";

import "../styles/custom.scss";
import "../styles/checkout.scss";
import OrderSummary from "../components/checkout/OrderSummary.jsx";

const Checkout = () => {
  const { user } = useAuth();
  const { cart, reloadCart } = useCart();
  const navigate = useNavigate();

  const [checkout, setCheckout] = useState({
    first_name: "",
    last_name: "",
    phone: "",

    delivery_type: "pickup",

    address_alias: "",
    address: "",
    between_streets: "",
    location: "",
    additional_data: "",

    payment_method: "cash",
    cash_amount: "",

    notes: "",
  });

  useEffect(() => {
    if (!user) return;

    setCheckout((prev) => ({
      ...prev,
      first_name: user.delivery_data?.first_name || "",
      last_name: user.delivery_data?.last_name || "",
      phone: user.delivery_data?.phone || "",
      address_alias: user.delivery_data?.address_alias || "",
      address: user.delivery_data?.address || "",
      between_streets: user.delivery_data?.between_streets || "",
      location: user.delivery_data?.location || "",
      additional_data: user.delivery_data?.additional_data || "",
    }));
  }, [user]);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setCheckout((prev) => {
      const next = {
        ...prev,
        [name]: value,
      };

      if (name === "delivery_type" && value === "pickup") {
        ((next.address_alias = ""),
          (next.address = ""),
          (next.between_streets = ""),
          (next.location = ""),
          (next.additional_data = ""));
      }

      if (name === "payment_method" && value === "cash") {
        next.cash_amount = "";
      }

      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const checkoutDto = buildCheckoutDTO(checkout);
      const order = await createOrder(checkoutDto);

      await reloadCart();

      showSuccess("pedido confirmado con éxito!");

      navigate(`/orders/${order._id}`);
      console.log("Checkout.jsx - order: ", order);
      //* RUTA TEMPORAL
      // navigate("/pedido-confirmado", {
      //   state: order,
      // });
    } catch (error) {
      console.error(error);
      showError(
        error.response?.data?.message || "No se pudo realizar el pedido.",
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Finalizar Compra</title>
      </Helmet>

      <div className="container-lg checkout">
        <div className="checkout-wrapper">
          <h1 className="component-title">Finalizar Compra</h1>
          {/* Formulario */}
          <form onSubmit={handleSubmit}>
            {/* Datos presonales */}
            <section className="checkout-card customer-section">
              <h2 className="section-title">Datos personales</h2>

              <input
                type="text"
                name="first_name"
                value={checkout.first_name}
                placeholder="Nombre"
                onChange={handleChange}
                required
                // Agregar pattern
              />

              <input
                type="text"
                name="last_name"
                value={checkout.last_name}
                placeholder="Apellido"
                onChange={handleChange}
                required
                // Agregar pattern
              />

              <input
                type="tel"
                name="phone"
                value={checkout.phone}
                placeholder="Teléfono"
                onChange={handleChange}
                required
                // Agregar pattern
              />
            </section>
            {/* Forma de entrega */}
            <section className="checkout-card delivery-section">
              <h2 className="section-title">Forma de entrega</h2>

              <div className="radio-group">
                <label htmlFor="delivery_type">
                  <input
                    type="radio"
                    name="delivery_type"
                    value="pickup"
                    checked={checkout.delivery_type === "pickup"}
                    onChange={handleChange}
                  />
                  Lo voy a buscar
                </label>

                <label htmlFor="delivery_type">
                  <input
                    type="radio"
                    name="delivery_type"
                    value="delivery"
                    checked={checkout.delivery_type === "delivery"}
                    onChange={handleChange}
                  />
                  Envío a domicilio
                </label>
              </div>

              {checkout.delivery_type === "delivery" && (
                <div className="delivery-fields">
                  <input
                    type="text"
                    name="address_alias"
                    placeholder="Alias para la dirección"
                    value={checkout.address_alias}
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    name="address"
                    placeholder="Dirección"
                    value={checkout.address}
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    name="between_streets"
                    placeholder="Entrecalles"
                    value={checkout.between_streets}
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    name="location"
                    placeholder="Localidad"
                    value={checkout.location}
                    onChange={handleChange}
                  />

                  <textarea
                    name="additional_data"
                    placeholder="Datos adicionales"
                    value={checkout.additional_data}
                    onChange={handleChange}
                  />
                </div>
              )}
            </section>
            {/* Forma de pago */}
            <section className="checkout-card payment-section">
              <h2 className="section-title">Forma de pago</h2>

              <select
                name="payment_method"
                value={checkout.payment_method}
                onChange={handleChange}
              >
                <option value="cash">Efectivo</option>
                <option value="mercadopago">Mercado Pago</option>
                <option value="transfer-bank">Transferencia Bancaria</option>
              </select>

              {checkout.payment_method === "cash" && (
                <input
                  type="number"
                  name="cash_amount"
                  placeholder="¿Con cuánto abonás?"
                  value={checkout.cash_amount}
                  onChange={handleChange}
                />
              )}
            </section>
            {/* Resumen del pedido */}
            <section className="checkout-card order-summary-section">
              <h2 className="section-title">Resumen del pedido</h2>

              <OrderSummary
                cart={cart}
                delivery_type={checkout.delivery_type}
              />
            </section>
            {/* Observaciones */}
            <section className="checkout-card remarks-section">
              <h2 className="section-title">Observaciones</h2>

              <textarea
                name="notes"
                placeholder="Observaciones para el pedido..."
                value={checkout.notes}
                onChange={handleChange}
              />
            </section>
            <Button
              className="btn btn-warning btn-pill upper"
              type="submit"
              text={"Confirmar pedido"}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
