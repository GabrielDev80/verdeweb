import { Helmet } from "react-helmet-async";

import "../styles/about.scss";
const About = () => {
  return (
    <>
      <Helmet>
        <title>Modo Huerta Online - Quiénes Somos</title>
        <meta
          name="description"
          content="Esta página describe la nuestra historia y compromiso para con nuestros clientes."
        />
      </Helmet>
      <article className="container-lg about">
        <h1 className="about-title">Sobre Nosotros</h1>

        <section className="about-text-wrapper">
          <p className="about-text">
            <strong>Modo Huerta</strong> es un emprendimiento familiar que nació
            con una idea simple:{" "}
            <span>cuidar la economía del hogar sin resignar calidad.</span>
          </p>

          <p className="about-text">
            Todo comenzó recorriendo mayoristas en busca de frutas y verduras a
            mejor precio, seleccionando siempre mercadería de buena calidad y
            apostando por proveedores confiables. Con el tiempo, empezamos a
            hacer compras más grandes junto a familiares y amigos, dividiendo
            mercadería y costos. La respuesta fue siempre la misma:{" "}
            <span>
              buen precio, buena calidad y una forma más práctica de comprar.
            </span>
          </p>

          <p className="about-text">
            Fue entonces cuando nos preguntamos:
            <span>
              {" "}
              ¿por qué no convertir esto en un emprendimiento y acercar esta
              mercadería a más personas?
            </span>
          </p>

          <p className="about-text">
            Así nació <strong>Modo Huerta</strong>, con el objetivo de ofrecer
            productos frescos, de calidad y a precios accesibles, sumando además
            la comodidad de recibir el pedido sin tener que salir de casa.
          </p>

          <p className="about-text">
            Nos encargamos de todo: tomar tu pedido, realizar las compras,
            seleccionar la mercadería, prepararla y entregártela lista para su
            consumo. Así te ayudamos a ahorrar tiempo, evitar filas, no cargar
            peso y simplificar tus compras del día a día.
          </p>

          <p className="about-text">
            <span>
              Vos solo tenés que hacer tu pedido desde la web, abonar y
              recibirlo en la puerta de tu casa.
            </span>
          </p>

          <p className="about-text about-thanks">
            Muchas gracias por elegirnos
          </p>
          <p className="about-text about-thanks">
            <span>Familia Modo Huerta</span>
          </p>
        </section>
      </article>
    </>
  );
};

export default About;
