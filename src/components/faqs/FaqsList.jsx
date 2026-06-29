import "../../styles/faqs.scss";
import FaqsCard from "./FaqsCard.jsx";

const faqs = [
  {
    ask: "¿Con qué medios de pago puedo abonar mi compra?",
    answer:
      "Por ahora podes abonar tu compra en efectivo, transferencia de mercado pago o transferencia bancaria, pronto habilitaremos nuevos medios de pago.",
  },
  {
    ask: "¿Cómo retiro mi compra?",
    answer:
      "Luego de confirmada la compra el sistema te va a pedir que realices el pago parcial o total de la misma, una vez realizado el pago te llegará un mail con el resumen de compra y domicilio de retiro de mercadería.",
  },
  {
    ask: "¿Hacen envíos a domicilio?",
    answer:
      "Sí, hacemos envíos a domicilio, pero consultanos si llegamos a tu zona.",
  },
  {
    ask: "¿?",
    answer: "",
  },
];
const FaqsList = () => {
  return (
    <div className="faqscard-wrapper">
      {faqs.map((faq, faqIdx) => (
        <div key={faqIdx}>
          <FaqsCard faq={faq} />
        </div>
      ))}
    </div>
  );
};

export default FaqsList;
