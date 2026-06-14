import { Helmet } from "react-helmet-async";
import FaqsList from "../components/faqs/FaqsList.jsx";
import "../styles/custom.scss";

const Faqs = () => {
  return (
    <>
      <Helmet>
        {" "}
        <title>Verde Web Online - Preguntas Frecuentes</title>
      </Helmet>
      <div className="container-md">
        <h1 className="">Preguntas Frecuentes</h1>
        <FaqsList />
      </div>
    </>
  );
};

export default Faqs;
