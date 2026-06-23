import "../styles/custom.scss";
import "../styles/home.scss";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth.js";
import { Button } from "../components/ui/Button.jsx";
import { Card } from "../components/ui/Card.jsx";
import { purchaseProcessCardData } from "../assets/data/data.js";

const Home = () => {
  const navigate = useNavigate();
  // const { user, isAuthenticated } = useAuth(); //! No se está usando!!!
  const navToProducts = () => navigate("/products");

  // console.log("useAuth: ", user);
  // console.log("useAuth: ", isAuthenticated);
  // const defaultResponse = () => console.warn("Falta crear la función onClick");
  return (
    <>
      <Helmet>
        <title>Modo Huerta Online - Inicio</title>
        <meta
          name="description"
          content="Esta es la página de inicio del sitio web de Modo Huerta Online. Aquí podés encontrar la descripción del proceso de compra a través de nuestra plataforma, las novedades, promociones, y toda la información necesaria para tu mejor experiencia de compra."
        />
      </Helmet>
      {/* main-view-container */}
      <section className="container-lg main-view-container">
        <div className="text-wrapper">
          <div className="tw-container text-on-dark">
            <h3 className="main-view-title font-primary medium upper shadow-4">
              Modo Huerta - Tu Verduleria Online
            </h3>
            <h1 className="main-view-slogan font-primary extra-bold shadow-4">
              La forma más simple de comprar frutas y verduras
              <br />
              Hacé tu pedido online y recibí lo mejor de la huerta
            </h1>
            <h2 className="main-view-paragraph font-primary extra-bold shadow-4">
              Comprar frutas y verduras frescas, ahora es mucho mas cómodo.
              <br />
              Es tan simple como hacer unos pocos clics.
            </h2>
          </div>
          {/* Call to Action */}
          <Button
            className="btn btn-start btn-pill btn-success upper"
            onClick={navToProducts}
            text="Empezá a comprar"
          />
        </div>
      </section>
      {/* purchase-process-wrapper */}
      <section className="container-lg purchase-process-wrapper py-3">
        <h2 className="font-primary extra-bold text-center pb-2">
          Mirá que fácil es comprar en Modo Huerta Online
        </h2>
        <div className="purchase-cards-wrapper centred p-1">
          {purchaseProcessCardData.map((data, dataIdx) => (
            <Card className="card-group" key={dataIdx} data={data} />
          ))}
        </div>
      </section>
      <section className="container-lg delivery-wrapper py-3">
        <h2 className="font-primary extra-bold text-center pb-2">
          Envíos a domicilio
        </h2>
        <p className="px-3">
          <strong>Atención: </strong>Antes de realizar un{" "}
          <span>pedido a domicilio</span> consultanos si tenemos reparto en tu
          zona. En caso de no contar con reparto en tu zona igualmete pedés
          acercarte a nuestro domicilio a retirar tu pedido.
        </p>
      </section>
    </>
  );
};

export default Home;
