import "../../styles/card.scss";

export const Card = ({ className, data }) => {
  return (
    /* card-group card-sm */
    <div className={className}>
      <div className="card-image-container">
        <img src={data.src} alt={data.alt} srcSet={data.srcset} />
      </div>
      <div className="card-text-container">
        <h3 className="title">{data.title}</h3>
        <p className="text" dangerouslySetInnerHTML={{ __html: data.text }}></p>
      </div>
    </div>
  );
};
