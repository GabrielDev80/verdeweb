import { useState } from "react";
import { Button } from "../ui/Button.jsx";

import "../../styles/productCard.scss";
const ProductCard = ({ product }) => {
  // console.log("Product: ", product);
  const isKg = product.sales_unit === "Kg";
  const step = isKg ? 0.25 : 1;

  const [quantity, setQuantity] = useState(step);

  const formatQuantityLabel = (qty, unit) => {
    if (unit === "Kg") {
      const formatted = Number.isInteger(qty)
        ? qty.toString()
        : qty.toFixed(2).replace(".", ",");

      return `${formatted} Kg`;
    }
    return `${qty} un.`;
  };

  const handleMinusBtn = () => {
    setQuantity((prev) => Math.max(step, prev - step));
  };

  const handlePlusBtn = () => {
    setQuantity((prev) => prev + step);
  };

  const handleAddToCart = () => {
    const cartItem = {
      productId: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      sales_price: product.sales_price,
      sales_unit: product.sales_unit,
      quantity,
      subtotal: Number((quantity * product.sales_price).toFixed(2)),
    };
    console.log("Producto enviado al carrito: ", cartItem);
  };

  // console.log("Product: ", product);
  return (
    <div className="item">
      <div className="image-wrapper">
        <img src={product.image} alt="imágen del producto" />
      </div>

      <div className="text-primary ">
        <h2>{product.name}</h2>
        <h3>{product.description}</h3>
        <h3>{`$ ${new Intl.NumberFormat("es-AR").format(product.sales_price)}`}</h3>
        <p>Por {product.sales_unit} </p>
      </div>
      <div className="quantity-wrapper">
        <button
          className="qty-minus"
          onClick={handleMinusBtn}
          type="button"
          aria-label="Restar cantidad"
        >
          -
        </button>
        <input
          className="qty"
          id={`qty-${product.id}`}
          name="qty"
          type="text"
          step={step}
          min={step}
          value={formatQuantityLabel(quantity, product.sales_unit)}
          readOnly
        />
        <button
          className="qty-plus"
          onClick={handlePlusBtn}
          type="button"
          aria-label="Sumar cantidad"
        >
          +
        </button>
      </div>

      {/* Call to Action */}
      <Button
        className="btn btn-start btn-pill btn-success upper"
        onClick={handleAddToCart}
        text="Añadir al carrito"
      />
    </div>
  );
};

export default ProductCard;
