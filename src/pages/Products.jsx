import "../styles/custom.scss";
import { useEffect, useState } from "react";
import ProductList from "../components/products/ProductList.jsx";
import { getProducts } from "../services/products.services.js";
import { Helmet } from "react-helmet-async";

const Products = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProductList(products);
      } catch (error) {
        console.error("Error al obtener los productos", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <h2>Cargando productos...</h2>;
  }

  return (
    <>
      <Helmet>
        <title>Verde Web Online - Productos</title>
      </Helmet>
      <div className="container-lg">
        <section>
          <h1>Frutas y Verduras</h1>
          <ProductList productsList={productList} />
        </section>
      </div>
    </>
  );
};

export default Products;
