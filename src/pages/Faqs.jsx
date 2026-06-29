import { Helmet } from "react-helmet-async";
import FaqsList from "../components/faqs/FaqsList.jsx";
import "../styles/custom.scss";

const Faqs = () => {
  return (
    <>
      <Helmet>
        <title>Modo Huerta Online - Preguntas Frecuentes</title>
        <meta
          name="description"
          content="Esta página contiene preguntas frecuentes con sus respectivas respuestas."
        />
      </Helmet>
      <div className="container-lg faqs">
        <h1 className="faqs-title">Preguntas Frecuentes</h1>
        <FaqsList />
      </div>
    </>
  );
};

export default Faqs;
