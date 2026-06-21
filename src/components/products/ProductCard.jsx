import { useState } from "react";
import { Button } from "../ui/Button.jsx";
import { useCart } from "../../hooks/useCart.js";
import {
  formatPrice,
  formatQuantityLabel,
} from "../../utils/products/products.utils.js";

import "../../styles/productCard.scss";
const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const isKg = product.sales_unit === "Kg";
  const step = isKg ? 0.25 : 1;

  const [quantity, setQuantity] = useState(step);

  const handleMinusBtn = () => {
    setQuantity((prev) => Math.max(step, prev - step));
  };

  const handlePlusBtn = () => {
    setQuantity((prev) => prev + step);
  };

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      sales_price: product.sales_price,
      sales_unit: product.sales_unit,
      quantity,
    });

    // console.log("Producto enviado al carrito: ", {
    //   productId: product.id,
    //   name: product.id,
    //   quantity,
    // });

    // resetear cantidad al valor iinicial después de agregar
    setQuantity(step);
  };

  return (
    <article className="item">
      <div className="image-wrapper">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="text-primary ">
        <h2>{product.name}</h2>
        <h3>{product.description}</h3>
        <h3>{formatPrice(product.sales_price)}</h3>
        <p>Por {product.sales_unit} </p>
      </div>
      <div className="quantity-wrapper">
        <div className="item-qty-box">
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
      </div>

      {/* Call to Action */}
      <Button
        className="btn btn-start btn-pill btn-success upper"
        onClick={handleAddToCart}
        text="Añadir al carrito"
      />
    </article>
  );
};

export default ProductCard;
