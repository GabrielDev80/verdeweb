import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button.jsx";
import { Card } from "../components/ui/Card.jsx";
import { purchaseProcessCardData } from "../assets/data/data.js";

import "../styles/custom.scss";
import "../styles/home.scss";

const Home = () => {
  const navigate = useNavigate();
  const navToProducts = () => navigate("/products");

  return (
    <>
      <Helmet>
        <title>Modo Huerta Online - Inicio</title>
        <meta
          name="description"
          content="Esta es la página de inicio del sitio web de Modo Huerta Online. Aquí podés encontrar la descripción del proceso de compra a través de nuestra plataforma, las novedades, promociones, y toda la información necesaria para tu mejor experiencia de compra."
        />
      </Helmet>

      {/* HERO */}
      <section className="container-lg main-view-container">
        <picture className="hero-media" aria-hidden="true">
          <source
            media="(max-width: 768px)"
            srcSet="images/bg-verduras-mobile.webp"
          />
          <img
            src="images/bg-verduras-desktop.webp"
            alt="Frutas y verduras frescas"
            className="hero-image"
            fetchPriority="high"
          />
        </picture>

        <div className="hero-overlay" />

        <div className="text-wrapper">
          <div className="tw-container text-on-dark">
            <h3 className="main-view-title font-primary medium upper shadow-4">
              Modo Huerta - Tu Verdulería Online
            </h3>

            <h1 className="main-view-slogan font-primary extra-bold shadow-4">
              La forma más simple de comprar frutas y verduras
              <span>Hacé tu pedido online y recibí lo mejor de la huerta</span>
            </h1>

            <h2 className="main-view-paragraph font-primary extra-bold shadow-4">
              Comprar frutas y verduras frescas ahora es mucho más cómodo.
              <span>Es tan simple como hacer unos pocos clics.</span>
            </h2>
          </div>

          <div className="hero-cta">
            <Button
              className="btn btn-start btn-pill btn-success upper"
              onClick={navToProducts}
              text="Empezá a comprar"
            />
          </div>
        </div>
      </section>

      {/* PROCESO DE COMPRA */}
      <section className="container-lg purchase-process-wrapper section-spacing">
        <div className="section-heading">
          <h2 className="font-primary extra-bold text-center">
            Mirá qué fácil es comprar en Modo Huerta Online
          </h2>
          <p className="section-subtitle text-center">
            Elegí tus productos, armá tu pedido y recibilo sin complicarte.
          </p>
        </div>

        <div className="purchase-cards-wrapper centred">
          {purchaseProcessCardData.map((data, dataIdx) => (
            <Card className="card-group" key={dataIdx} data={data} />
          ))}
        </div>
      </section>

      {/* ENVÍOS */}
      <section className="container-lg delivery-wrapper section-spacing">
        <div className="section-heading">
          <h2 className="font-primary extra-bold text-center">
            Envíos a domicilio
          </h2>
        </div>

        <div className="delivery-card">
          <p>
            <strong>Atención:</strong> antes de realizar un{" "}
            <span>pedido a domicilio</span>, consultanos si tenemos reparto en
            tu zona.
          </p>

          <p>
            Si no contamos con reparto para tu ubicación, igualmente podés
            acercarte a nuestro domicilio para retirar tu pedido.
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;
