import { formatPrice } from "../../utils/products/products.utils.js";
import { useMemo } from "react";

import "../../styles/orderSummary.scss";

const OrderSummary = ({ cart, delivery_type }) => {
  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.subtotal, 0),
    [cart],
  );
  const deliveryCost = 0;
  const total = subtotal + deliveryCost;

  const formatSalesUnit = (unit) => {
    const unitDict = {
      kg: "kg",
      unidad: "un",
      atado: "un",
      bandeja: "un",
    };

    return unitDict[unit] ?? unit;
  };

  return (
    <>
      <div className="summary-products">
        {cart.map((item) => (
          <div key={item.productId} className="summary-product">
            <img
              className="summary-product-image"
              src={item.image}
              alt={item.name}
            />
            <div className="summary-product-info">
              <strong>{item.name}</strong>
              <p>
                {`${item.quantity} ${formatSalesUnit(item.sales_unit)} x ${formatPrice(item.sales_price)}`}
              </p>
            </div>

            <strong className="summary-product-subtotal">
              {formatPrice(item.subtotal)}
            </strong>
          </div>
        ))}
      </div>
      <div className="summary">
        <div className="summary-item">
          <span>Subtotal</span>
          <strong>{formatPrice(subtotal)}</strong>
        </div>

        <div className="summary-item">
          <span>Envío</span>
          <strong>
            {delivery_type === "pickup"
              ? "A coordinar"
              : formatPrice(deliveryCost)}
          </strong>
        </div>

        <div className="summary-item total">
          <span>Total</span>
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    </>
  );
};
export default OrderSummary;
