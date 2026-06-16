import "../../styles/productCard.scss";
import { Button } from "../ui/Button.jsx";
const ProductCard = ({ product }) => {
  const defaultResponse = () => console.warn("Falta crear la función onClick");

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

      {/* Call to Action */}
      <Button
        className="btn btn-start btn-pill btn-success upper"
        onClick={defaultResponse}
        text="Agregar al carrito"
      />
    </div>
  );
};

export default ProductCard;
