import "../../styles/custom.scss";
import "../../styles/banner.scss";

export const Banner = () => {
  const legend = "Aqui irá una leyenda informativa";
  return (
    <div className="banner">
      <p className="legend font-primary medium upper text-on-dark">{legend}</p>
    </div>
  );
};
