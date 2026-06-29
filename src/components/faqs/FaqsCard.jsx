import "../../styles/faqs.scss";

const FaqsCard = ({ faq }) => {
  return (
    <div className="faqscard">
      <h2 className="ask">{faq.ask}</h2>
      <p className="answer">{faq.answer}</p>
    </div>
  );
};

export default FaqsCard;
