import "../../styles/productList.scss";
import "../../styles/custom.scss";
// import { Link } from "react-router-dom";
import ProductCard from "./ProductCard.jsx";
const ProductList = ({ productsList }) => {
  // console.log("ProductsList: ", productsList);
  return (
    <div className="itemList">
      {productsList &&
        productsList.payload.map((prod, prodIndex) => (
          <div key={prodIndex}>
            {/* <Link to={`/product/${prod.id}`}> */}
            <ProductCard product={prod} />
            {/* </Link> */}
          </div>
        ))}
    </div>
  );
};

export default ProductList;
