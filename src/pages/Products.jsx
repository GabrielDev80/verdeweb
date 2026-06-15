import ProductList from "../components/products/ProductList.jsx";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { getProducts } from "../services/products.services.js";
import { Helmet } from "react-helmet-async";

import "../styles/custom.scss";

const Products = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();

  console.log(auth);
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
